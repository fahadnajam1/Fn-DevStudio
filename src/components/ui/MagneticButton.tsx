"use client";

import React, { useRef, useState, useEffect } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  className = "btn btn-primary",
  onClick,
  type = "button",
  style,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const { left, top, width, height } = btn.getBoundingClientRect();
    // Calculate cursor distance from the center of the button
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    // Pull intensity factor (0.3 pulls up to 30% of the distance)
    setCoords({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      className={`interactive-hover ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
        transition: coords.x === 0 ? "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" : "transform 0.1s linear",
      }}
    >
      <span
        style={{
          display: "block",
          transform: `translate3d(${coords.x * 0.25}px, ${coords.y * 0.25}px, 0)`,
          transition: coords.x === 0 ? "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" : "transform 0.1s linear",
        }}
      >
        {children}
      </span>
    </button>
  );
}
