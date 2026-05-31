"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OrbCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear canvas reference contents and append renderer
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Generate 3D Particles
    const particleCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const initialPositions: Array<{x: number; y: number; z: number}> = [];

    // Colors mapping to Indigo, Cyan, and Amber Gold
    const colorOptions = [
      new THREE.Color("#4f46e5"), // Indigo
      new THREE.Color("#0ea5e9"), // Cyan
      new THREE.Color("#d97706"), // Gold
    ];

    for (let i = 0; i < particleCount; i++) {
      // Sphere coordinate distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const r = 12 + Math.random() * 3; // Radius with slight depth range
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      initialPositions.push({ x, y, z });

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Assign random color
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Size
      sizes[i] = Math.random() * 0.4 + 0.1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom round point texture
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      map: createCircleTexture(),
      depthWrite: false,
      blending: THREE.NormalBlending, // Clean blend for light backgrounds
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 3. Resize Handler
    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 4. Mouse Move Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Normalize coords from -1 to 1
      mouseRef.current.targetX = (e.clientX / w) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / h) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 5. Scroll Parallax Tracking
    const handleScroll = () => {
      scrollRef.current.y = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 6. Animation Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse coordinates interpolation (lerping)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Base rotations
      particleSystem.rotation.y = elapsedTime * 0.04;
      particleSystem.rotation.x = elapsedTime * 0.02;

      // Parallax scroll deformation & positioning
      const targetZPosition = -scrollRef.current.y * 0.015;
      particleSystem.position.z += (targetZPosition - particleSystem.position.z) * 0.1;
      particleSystem.rotation.y += scrollRef.current.y * 0.0005;

      // Deform particles near mouse pointer
      const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const posArray = positionAttr.array as Float32Array;

      // Map 2D mouse coordinates to a target 3D zone
      const target3DMouseX = mouseRef.current.x * 12;
      const target3DMouseY = mouseRef.current.y * 8;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Original positions
        const orig = initialPositions[i];
        
        // Current position values
        let cx = posArray[i3];
        let cy = posArray[i3 + 1];
        let cz = posArray[i3 + 2];

        // Rotation matrix calculations to calculate correct dynamic deformation in space
        const rotY = particleSystem.rotation.y;
        const rotX = particleSystem.rotation.x;
        
        // Approximate rotated world coords for mouse interaction distance checks
        const rx = orig.x * Math.cos(rotY) - orig.z * Math.sin(rotY);
        const rz = orig.x * Math.sin(rotY) + orig.z * Math.cos(rotY);
        const ry = orig.y; // Simplified

        const dx = target3DMouseX - rx;
        const dy = target3DMouseY - ry;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 6) {
          // Push particles slightly away from cursor zone
          const force = (6 - dist) / 6 * 1.5;
          posArray[i3] = orig.x - (dx / dist) * force;
          posArray[i3 + 1] = orig.y - (dy / dist) * force;
        } else {
          // Return to original spherical form
          posArray[i3] += (orig.x - cx) * 0.08;
          posArray[i3 + 1] += (orig.y - cy) * 0.08;
        }
      }
      
      positionAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    />
  );
}
