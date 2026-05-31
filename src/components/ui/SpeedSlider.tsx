"use client";

import React, { useState, useRef, useEffect } from "react";
import { Zap, Flame, ShieldAlert, Cpu } from "lucide-react";

export default function SpeedSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, width } = container.getBoundingClientRect();
    const position = ((clientX - left) / width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "420px",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid var(--card-border)",
        background: "rgba(10, 10, 12, 0.9)",
        userSelect: "none",
      }}
      className="interactive-hover"
    >
      {/* 1. RIGHT SIDE: FN DEVSTUDIO - HIGH PERFORMANCE BUILD (DEFAULT BG) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #09090b 0%, #16122c 100%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#10b981",
                background: "rgba(16, 185, 129, 0.1)",
                padding: "4px 10px",
                borderRadius: "20px",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Zap size={12} /> OPTIMIZED BY FN DEVSTUDIO
            </span>
            <h3 style={{ marginTop: "1rem", fontSize: "2rem" }} className="text-gradient">
              100/100 Speed Score
            </h3>
            <p style={{ color: "#94a3b8", marginTop: "0.5rem", fontSize: "0.9rem", maxWidth: "400px" }}>
              React Compiler, Server Components, and optimized assets load instantly. Under 100ms Total Blocking Time.
            </p>
          </div>

          {/* Lighthouse circle indicator */}
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              border: "8px solid #10b981",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(16, 185, 129, 0.05)",
              boxShadow: "0 0 30px rgba(16, 185, 129, 0.2)",
            }}
          >
            <span style={{ fontSize: "2rem", fontWeight: 800, color: "#10b981", fontFamily: "var(--font-heading)" }}>100</span>
            <span style={{ fontSize: "0.6rem", color: "#10b981", letterSpacing: "1px", fontWeight: "bold" }}>PERFORMANCE</span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            width: "100%",
            zIndex: 5,
          }}
        >
          {[
            { label: "Page Load Time", value: "0.2s", color: "#10b981", sub: "Instant Interaction" },
            { label: "Bundle Weight", value: "85 KB", color: "#10b981", sub: "Code-split & minified" },
            { label: "SEO & Best Practices", value: "100%", color: "#10b981", sub: "Semantic HTML Structure" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
                padding: "1rem",
                borderRadius: "12px",
                backdropFilter: "blur(5px)",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{item.label}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: item.color, marginTop: "4px", fontFamily: "var(--font-heading)" }}>
                {item.value}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "2px" }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. LEFT SIDE: TYPICAL LEGACY TEMPLATE (OVERLAID & CLIPPED) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: `${sliderPosition}%`,
          overflow: "hidden",
          background: "linear-gradient(135deg, #180d0d 0%, #0d0d0f 100%)",
          zIndex: 2,
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid rgba(239, 68, 68, 0.4)",
        }}
      >
        {/* Constrain width of inner contents so they don't squash when sliding */}
        <div style={{ width: containerRef.current?.getBoundingClientRect().width || "600px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#ef4444",
                background: "rgba(239, 68, 68, 0.1)",
                padding: "4px 10px",
                borderRadius: "20px",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Flame size={12} /> LEGACY TEMPLATE BUILD
            </span>
            <h3 style={{ marginTop: "1rem", fontSize: "2rem", color: "#ef4444" }}>
              45/100 Speed Score
            </h3>
            <p style={{ color: "#94a3b8", marginTop: "0.5rem", fontSize: "0.9rem", maxWidth: "400px" }}>
              Bloated page builders, redundant plugins, uncompressed images, and slow render-blocking assets.
            </p>
          </div>

          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              border: "8px solid #ef4444",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(239, 68, 68, 0.05)",
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.1)",
            }}
          >
            <span style={{ fontSize: "2rem", fontWeight: 800, color: "#ef4444", fontFamily: "var(--font-heading)" }}>45</span>
            <span style={{ fontSize: "0.6rem", color: "#ef4444", letterSpacing: "1px", fontWeight: "bold" }}>PERFORMANCE</span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            width: containerRef.current?.getBoundingClientRect().width ? `${containerRef.current.getBoundingClientRect().width - 80}px` : "550px",
          }}
        >
          {[
            { label: "Page Load Time", value: "4.8s", color: "#ef4444", sub: "Blocks UI Interaction" },
            { label: "Bundle Weight", value: "4.2 MB", color: "#ef4444", sub: "Huge JS scripts overhead" },
            { label: "SEO & Best Practices", value: "52%", color: "#ef4444", sub: "Missing semantic anchors" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                padding: "1rem",
                borderRadius: "12px",
                backdropFilter: "blur(5px)",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{item.label}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: item.color, marginTop: "4px", fontFamily: "var(--font-heading)" }}>
                {item.value}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "2px" }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. SLIDER BAR DRAGGABLE DIVIDER */}
      <div
        onMouseDown={() => {
          isDragging.current = true;
        }}
        onTouchStart={() => {
          isDragging.current = true;
        }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          width: "2px",
          background: "#ffffff",
          cursor: "ew-resize",
          zIndex: 10,
          boxShadow: "0 0 10px #ffffff, 0 0 20px var(--primary)",
        }}
      >
        {/* Floating handle button */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: "2px solid var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5), 0 0 10px var(--primary)",
            color: "#030303",
          }}
        >
          <Cpu size={16} style={{ animation: "spin 12s linear infinite" }} />
        </div>
      </div>
    </div>
  );
}
