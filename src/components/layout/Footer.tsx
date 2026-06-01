"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = React.useState(2026);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        position: "relative",
        overflow: "hidden",
        padding: "5rem 0 2rem 0",
      }}
    >
      {/* Background glow spots */}
      <div
        className="glow-spot"
        style={{
          bottom: "-100px",
          left: "5%",
          width: "300px",
          height: "300px",
          backgroundColor: "var(--primary)",
        }}
      />
      <div
        className="glow-spot"
        style={{
          bottom: "-150px",
          right: "5%",
          width: "400px",
          height: "400px",
          backgroundColor: "var(--secondary)",
        }}
      />

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: "3rem",
            marginBottom: "4rem",
          }}
          className="footer-grid"
        >
          {/* Column 1: Company Profile */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.4rem",
                fontWeight: 800,
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.03em",
                marginBottom: "1.5rem",
              }}
            >
              <span>FN</span>
              <span style={{ fontWeight: 400, color: "var(--text-secondary)" }}>DevStudio</span>
              <Sparkles size={16} color="var(--accent)" />
            </Link>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "1.5rem", maxWidth: "320px" }}>
              A premier, forward-thinking development agency dedicated to engineering high-performance, custom web solutions integrated with intelligent AI.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a
                href="https://github.com/fahadnajam55"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                }}
                className="interactive-hover social-icon"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="#"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                }}
                className="interactive-hover social-icon"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1.5rem", color: "#ffffff" }}>
              Studio
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {["Home", "Services", "Work", "About", "Contact"].map((page) => (
                <Link
                  key={page}
                  href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                  style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}
                  className="interactive-hover footer-link"
                >
                  {page}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h4 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1.5rem", color: "#ffffff" }}>
              Services
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {[
                "Web Development",
                "AI Integration",
                "E-Commerce Suite",
                "UI/UX Implementation",
                "Performance Audit",
              ].map((service) => (
                <Link
                  key={service}
                  href="/services"
                  style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}
                  className="interactive-hover footer-link"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Identity */}
          <div>
            <h4 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1.5rem", color: "#ffffff" }}>
              Get In Touch
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                <Mail size={16} style={{ marginTop: "3px", color: "var(--primary)" }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Email Us</div>
                  <a href="mailto:fahadnajam55@gmail.com" className="interactive-hover footer-link">
                    fahadnajam55@gmail.com
                  </a>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                <Phone size={16} style={{ marginTop: "3px", color: "var(--secondary)" }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Call Us</div>
                  <a href="tel:+923326551255" className="interactive-hover footer-link">
                    +92 3326551255
                  </a>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                <MapPin size={16} style={{ marginTop: "3px", color: "var(--accent)" }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Location</div>
                  <span>Pakistan (Remote Worldwide)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.05)", margin: "2rem 0" }} />

        {/* Bottom Metadata */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
          className="footer-bottom"
        >
          <span>
            © {currentYear} FN DevStudio. All rights reserved.
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            Designed & Engineered by <span style={{ color: "#ffffff" }}>Fahad Najam</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
