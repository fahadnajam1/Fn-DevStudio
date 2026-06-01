"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, ArrowUpRight } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import GlowCard from "../../components/ui/GlowCard";
import MagneticButton from "../../components/ui/MagneticButton";
import useScrollReset from "../useScrollReset";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("../../components/ui/CustomCursor"), { ssr: false });

type FilterTag = "all" | "web" | "ai" | "ecommerce";

export default function Work() {
  useScrollReset();
  const [activeFilter, setActiveFilter] = useState<FilterTag>("all");

  const caseStudies = [
    {
      title: "Astra E-Commerce Storefront",
      tag: "ecommerce",
      tagName: "E-Commerce",
      description: "A headless digital storefront engineered for speed, custom product indexing, and payment gateways. Boosted client conversions by 42%.",
      image: "/assets/case_ecommerce.png",
      stats: [
        { label: "Core Web Vital", value: "98/100" },
        { label: "Conversion Lift", value: "+42%" },
        { label: "Load Time", value: "0.3s" }
      ],
      color: "rgba(217, 119, 6, 0.08)",
    },
    {
      title: "NeuraScale AI Platform",
      tag: "ai",
      tagName: "AI Integration",
      description: "Embedded automated GPT workflows and RAG vector searches inside legacy database dashboards, shrinking audit triage times by 80%.",
      image: "/assets/case_saas.png",
      stats: [
        { label: "Automated Workflows", value: "24/7" },
        { label: "Triage Speedup", value: "8.5x" },
        { label: "API Latency", value: "120ms" }
      ],
      color: "rgba(79, 70, 229, 0.08)",
    },
    {
      title: "Helios UI Core Infrastructure",
      tag: "web",
      tagName: "Web Development",
      description: "A comprehensive UI library design-system implementation. Compiled modular Next.js components to replace heavy old third-party script assets.",
      image: "/assets/service_ai.png",
      stats: [
        { label: "Bundle Size", value: "-68%" },
        { label: "Page Weight", value: "110 KB" },
        { label: "Lighthouse Score", value: "100%" }
      ],
      color: "rgba(14, 165, 233, 0.08)",
    },
  ];

  const filteredProjects = activeFilter === "all"
    ? caseStudies
    : caseStudies.filter((item) => item.tag === activeFilter);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  } as const;

  return (
    <>
      <CustomCursor />
      <Header />

      <main style={{ paddingTop: "var(--header-height)", position: "relative" }}>
        {/* Grid backdrop */}
        <div className="grid-bg" />

        {/* Floating gradient orb */}
        <div
          className="glow-spot"
          style={{
            top: "20%",
            right: "5%",
            width: "500px",
            height: "500px",
            backgroundColor: "var(--primary)",
            opacity: 0.04,
          }}
        />

        <section style={{ padding: "6rem 0 3rem 0" }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: "600px" }}>
              <span style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
                Case Studies
              </span>
              <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4rem)", marginTop: "0.5rem", marginBottom: "1rem", color: "var(--text-primary)" }}>
                Selected digital <span className="text-gradient">craftsmanship</span>
              </h1>
              <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>
                Explore how we bridge complex software logic and elegant layouts to deliver high-performance applications.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Interactive Filters */}
        <section style={{ padding: "1rem 0" }}>
          <div className="container" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Projects" },
              { id: "web", label: "Web Development" },
              { id: "ai", label: "AI Integration" },
              { id: "ecommerce", label: "E-Commerce" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as FilterTag)}
                style={{
                  padding: "0.6rem 1.4rem",
                  borderRadius: "50px",
                  border: activeFilter === filter.id ? "1px solid var(--primary)" : "1px solid rgba(15, 23, 42, 0.08)",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-heading)",
                  transition: "var(--transition-fast)",
                  backgroundColor: activeFilter === filter.id ? "rgba(79, 70, 229, 0.08)" : "rgba(255, 255, 255, 0.8)",
                  color: activeFilter === filter.id ? "var(--primary)" : "var(--text-secondary)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                }}
                className="interactive-hover"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* Case Studies list with animated reveals */}
        <section style={{ padding: "4rem 0 8rem 0" }}>
          <div className="container">
            <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    layout
                    key={project.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.1fr 0.9fr",
                      gap: "4rem",
                      alignItems: "center",
                    }}
                    className="project-row"
                  >
                    {/* Left: Image container */}
                    <div
                      style={{
                        position: "relative",
                        borderRadius: "20px",
                        overflow: "hidden",
                        border: "1px solid var(--card-border)",
                        boxShadow: "0 15px 40px -20px rgba(15, 23, 42, 0.1)",
                        aspectRatio: "16/10",
                        width: "100%",
                        backgroundColor: "rgba(255,255,255,0.01)",
                      }}
                      className="image-wrap interactive-hover"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{
                          objectFit: "cover",
                          transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                        className="project-image"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={idx === 0}
                      />
                      
                      {/* Hover Tag Overlay */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(to top, rgba(15, 23, 42, 0.4) 0%, transparent 60%)",
                          display: "flex",
                          alignItems: "flex-end",
                          padding: "2rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "#ffffff",
                            background: "var(--primary)",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                          }}
                        >
                          {project.tagName}
                        </span>
                      </div>
                    </div>

                    {/* Right: Project Details & Metrics */}
                    <div>
                      <h3 style={{ fontSize: "2rem", color: "var(--text-primary)", marginBottom: "1rem", lineHeight: 1.2 }}>
                        {project.title}
                      </h3>
                      
                      <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                        {project.description}
                      </p>

                      {/* Core Metric widgets */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2.5rem" }} className="project-stats-grid">
                        {project.stats.map((stat, sIdx) => (
                          <div
                            key={sIdx}
                            style={{
                              padding: "1rem",
                              borderRadius: "12px",
                              background: "rgba(255, 255, 255, 0.8)",
                              border: "1px solid var(--card-border)",
                              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)",
                            }}
                          >
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{stat.label}</div>
                            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--primary)", marginTop: "4px", fontFamily: "var(--font-heading)" }}>
                              {stat.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      <Link href="/contact" passHref>
                        <MagneticButton className="btn btn-secondary">
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                            Query Similar Build <ArrowUpRight size={16} />
                          </span>
                        </MagneticButton>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredProjects.length === 0 && (
                <div style={{ textAlign: "center", padding: "6rem 0", color: "var(--text-secondary)" }}>
                  No case studies match this filter. Check back soon!
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section style={{ padding: "6rem 0 8rem 0", borderTop: "1px solid var(--card-border)", backgroundColor: "var(--bg-secondary)" }}>
          <div className="container" style={{ textAlign: "center", maxWidth: "600px" }}>
            <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem", color: "var(--text-primary)" }}>Ready to scale your business?</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
              Work with lead engineer Fahad Najam to construct a bespoke framework and AI automation suited for your organization.
            </p>
            <Link href="/contact" passHref>
              <MagneticButton className="btn btn-accent">
                Book Initial Consultation <ArrowRight size={16} />
              </MagneticButton>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
