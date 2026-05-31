"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import { motion } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + custom * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: scrolled ? "70px" : "var(--header-height)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        transition: "background-color 0.3s, border-bottom 0.3s, backdrop-filter 0.3s, height 0.3s ease",
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(15, 23, 42, 0.06)" : "1px solid transparent",
      }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/" className="logo interactive-hover">
            <span className="logo-primary text-gradient">FN</span>
            <span className="logo-secondary" style={{ color: (scrolled || !isHome) ? "var(--logo-color-secondary)" : "#ffffff", transition: "color 0.3s ease" }}>DevStudio</span>
            <Sparkles size={16} color="var(--accent)" style={{ animation: "float 4s ease-in-out infinite" }} />
          </Link>
        </motion.div>

        {/* DESKTOP NAV LINKS */}
        <nav style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              gap: "2rem",
            }}
            className="desktop-only"
          >
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                >
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''} interactive-hover nav-link-hover`}
                    style={{
                      position: "relative",
                      color: (scrolled || !isHome) ? "var(--nav-color)" : "rgba(255, 255, 255, 0.9)",
                      transition: "color 0.3s ease"
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeUnderline"
                        style={{
                          position: "absolute",
                          bottom: "-6px",
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
                          borderRadius: "2px",
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* DESKTOP CTA */}
          <motion.div
            className="desktop-only"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/contact" passHref>
              <MagneticButton
                className="btn btn-secondary"
                style={{
                  fontSize: "0.85rem",
                  padding: "0.6rem 1.4rem",
                  color: (scrolled || !isHome) ? "var(--text-primary)" : "#ffffff",
                  backgroundColor: (scrolled || !isHome) ? "rgba(15, 23, 42, 0.04)" : "rgba(255, 255, 255, 0.12)",
                  borderColor: (scrolled || !isHome) ? "rgba(15, 23, 42, 0.08)" : "rgba(255, 255, 255, 0.25)",
                  backdropFilter: (scrolled || !isHome) ? "none" : "blur(4px)",
                  transition: "color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease"
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                  Get Brief <ArrowRight size={14} />
                </span>
              </MagneticButton>
            </Link>
          </motion.div>

          {/* MOBILE BURGER BUTTON */}
          <motion.button
            className="mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              color: (scrolled || !isHome) ? "var(--text-primary)" : "#ffffff",
              cursor: "pointer",
              display: "none", // Managed by CSS below
              transition: "color 0.3s ease"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </nav>
      </div>

      {/* MOBILE NAV DRAWER */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: scrolled ? "70px" : "var(--header-height)",
            left: 0,
            right: 0,
            height: scrolled ? "calc(100vh - 70px)" : "calc(100vh - var(--header-height))",
            backgroundColor: "var(--bg-primary)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            gap: "2rem",
            borderTop: "1px solid rgba(15, 23, 42, 0.06)",
            transition: "top 0.3s ease, height 0.3s ease"
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "1.5rem",
                fontFamily: "var(--font-heading)",
                color: pathname === link.href ? "var(--primary)" : "var(--text-primary)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              marginTop: "auto",
              padding: "1rem",
              borderRadius: "10px",
              textAlign: "center",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
              color: "#ffffff",
              fontWeight: 600,
            }}
          >
            Get in Touch
          </Link>
        </div>
      )}
    </motion.header>
  );
}
