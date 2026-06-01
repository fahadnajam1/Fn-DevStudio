"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code, Brain, ShoppingBag, LayoutTemplate, Zap, ShieldCheck, HeartHandshake, Sparkles, Star } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import GlowCard from "../components/ui/GlowCard";
import MagneticButton from "../components/ui/MagneticButton";
import SpeedSlider from "../components/ui/SpeedSlider";
import React from "react";
import useScrollReset from "./useScrollReset";
import Image from "next/image";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("../components/ui/CustomCursor"), { ssr: false });
const AiSandbox = dynamic(() => import("../components/home/AiSandbox"), { ssr: false });

export default function Home() {
  useScrollReset();

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const backgroundScale = useTransform(scrollY, [0, 500], [1, 1.12]);
  const textY = useTransform(scrollY, [0, 500], [0, 80]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const titleWords = ["Building", "Stellar", "Web", "Solutions"];

  const bentoServices = [
    {
      icon: <Code size={28} color="var(--primary)" />,
      title: "Custom Web Development",
      description: "Frontend & backend engineering for tailored SaaS apps and corporate infrastructure. Performance-first architecture.",
      badge: "Edge Ready",
      color: "rgba(79, 70, 229, 0.08)",
      gridClass: "col-span-3",
    },
    {
      icon: <Brain size={28} color="var(--secondary)" />,
      title: "AI Integration",
      description: "Embedding custom Large Language Models (LLMs), semantic vector databases, and autonomous task workflows.",
      badge: "Cognitive",
      color: "rgba(14, 165, 233, 0.08)",
      gridClass: "col-span-2",
    },
    {
      icon: <ShoppingBag size={28} color="var(--accent)" />,
      title: "E-Commerce Solutions",
      description: "High-conversion checkout flows, multi-provider payment integrations, and lightning-fast storefront indexing.",
      badge: "High Conversion",
      color: "rgba(217, 119, 6, 0.08)",
      gridClass: "col-span-2",
    },
    {
      icon: <LayoutTemplate size={28} color="#f43f5e" />,
      title: "UI/UX Implementation",
      description: "Engineering design mockups (Figma/Adobe) into responsive, motion-rich, and interactive web layouts.",
      badge: "Premium Motion",
      color: "rgba(244, 63, 94, 0.08)",
      gridClass: "col-span-3",
    },
    {
      icon: <Zap size={28} color="#10b981" />,
      title: "Performance Optimization",
      description: "Auditing, refactoring, script offloading, and image rendering compressions to elevate core web vitals and organic SEO rankings.",
      badge: "100% Core Vitals",
      color: "rgba(16, 185, 129, 0.08)",
      gridClass: "col-span-5",
    },
  ];

  // Motion animation parameters
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <CustomCursor />
      <Header />

      <section className="hero-section" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Parallax Background Image with Entrance Fade Zoom */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
          <motion.div
            initial={{ scale: 1.18, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              y: backgroundY,
              scale: backgroundScale,
            }}
          >
            <Image
              src="/bgimage.png"
              alt="Stellar Web Solutions Background"
              fill
              priority
              quality={85}
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              sizes="100vw"
            />
          </motion.div>
        </div>
        <div className="hero-overlay" />
        <motion.div
          className="container"
          style={{ position: "relative", zIndex: 2, paddingBottom: "4rem", y: textY, opacity: textOpacity }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ maxWidth: "800px", display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Lead pill */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: "6px 14px",
                borderRadius: "30px",
                width: "fit-content",
                backdropFilter: "blur(4px)",
              }}
            >
              <Sparkles size={14} color="#f59e0b" style={{ animation: "spin 8s linear infinite" }} />
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255, 255, 255, 0.9)", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                Next-Gen Web & AI Integrations
              </span>
            </motion.div>

            {/* H1 Title with Word-by-word mask reveal */}
            <motion.h1 style={{ fontSize: "clamp(3.2rem, 7.5vw, 4.8rem)", lineHeight: 1.05, color: "#ffffff", fontWeight: 800, letterSpacing: "-0.03em", display: "flex", flexWrap: "wrap", rowGap: "0.4rem" }}>
              {titleWords.map((word, i) => {
                const isGradient = word === "Stellar" || word === "Web";
                return (
                  <span key={i} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.6rem" }}>
                    <motion.span
                      variants={{
                        hidden: { y: "100%" },
                        visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      style={{ display: "inline-block" }}
                      className={isGradient ? "text-gradient-hero" : ""}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={fadeUp} style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.3rem)", color: "rgba(255, 255, 255, 0.8)", maxWidth: "620px", lineHeight: 1.6, fontWeight: 400 }}>
              FN DevStudio is a premier, forward-thinking web development agency. We bridge the gap between complex software logic and elegant, blazing-fast user experiences.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
              <Link href="/contact" passHref>
                <MagneticButton className="btn btn-accent">
                  Book Free Consultation <ArrowRight size={16} />
                </MagneticButton>
              </Link>
              <Link href="/work">
                <button className="btn btn-secondary" style={{ background: "rgba(255, 255, 255, 0.08)", color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(4px)" }}>Explore Work</button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* CORE SERVICES BENTO SECTION */}
      <section style={{ padding: "8rem 0", position: "relative", backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--card-border)" }}>
        <div className="container">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            style={{ maxWidth: "600px", marginBottom: "4rem" }}
          >
            <span style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
              What We Do
            </span>
            <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3rem)", marginTop: "0.5rem", color: "var(--text-primary)" }}>
              Engineered for Business Scale
            </h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "1rem", fontSize: "1.05rem" }}>
              We reject generic templates. Every project is coded custom to support your unique business processes and workflow automation.
            </p>
          </motion.div>

          {/* Bento CSS Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="bento-grid"
          >
            {bentoServices.map((service, index) => (
              <motion.div key={index} variants={fadeUp} className={service.gridClass} style={{ display: "flex" }}>
                <GlowCard className="bento-card" glowColor={service.color} style={{ width: "100%" }}>
                  <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", height: "100%", gap: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "14px",
                          backgroundColor: "rgba(15, 23, 42, 0.02)",
                          border: "1px solid rgba(15, 23, 42, 0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {service.icon}
                      </div>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--text-secondary)",
                          background: "rgba(15, 23, 42, 0.03)",
                          border: "1px solid rgba(15, 23, 42, 0.05)",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontFamily: "var(--font-heading)",
                          fontWeight: 600,
                        }}
                      >
                        {service.badge}
                      </span>
                    </div>

                    <div>
                      <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                        {service.title}
                      </h3>
                      <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PERFORMANCE SHOWCASE SLIDER SECTION */}
      <section style={{ padding: "8rem 0", position: "relative" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "center" }} className="speed-section-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <span style={{ color: "var(--secondary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
                Speed is Revenue
              </span>
              <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3rem)", marginTop: "0.5rem", color: "var(--text-primary)" }}>
                Performance-First Coded Infrastructure
              </h2>
              <p style={{ color: "var(--text-secondary)", marginTop: "1.2rem", fontSize: "1rem", lineHeight: 1.6 }}>
                Every second added to page speed results in a 7% conversion drop. We write clean, optimized code with static compile-time generation to achieve perfect 100/100 Lighthouse audits.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
                {[
                  { icon: <ShieldCheck size={20} color="#10b981" />, title: "Instant Hydration", desc: "Minimal blocking scripting, optimized asset offloading." },
                  { icon: <HeartHandshake size={20} color="#10b981" />, title: "SEO Advantage", desc: "Google ranks fast, statically readable markup websites higher." }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ marginTop: "2px" }}>{item.icon}</div>
                    <div>
                      <h4 style={{ fontSize: "1rem", color: "var(--text-primary)" }}>{item.title}</h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <SpeedSlider />
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI INTERACTIVE SANDBOX SECTION */}
      <section style={{ padding: "8rem 0", position: "relative", backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--card-border)" }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 4rem auto" }}
          >
            <span style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
              AI Integration Sandbox
            </span>
            <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3rem)", marginTop: "0.5rem", color: "var(--text-primary)" }}>
              Intelligent Cloud Systems
            </h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "1rem", fontSize: "1.05rem" }}>
              See how we embed machine learning models and semantic data into web backends. Pick a module below, compile the endpoint, and run the preview.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <AiSandbox />
          </motion.div>
        </div>
      </section>

      {/* WHY CLIENTS CHOOSE US */}
      <section style={{ padding: "8rem 0", position: "relative" }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 5rem auto" }}
          >
            <span style={{ color: "var(--accent)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
              Our Philosophy
            </span>
            <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3rem)", marginTop: "0.5rem", color: "var(--text-primary)" }}>
              Why Clients Choose FN DevStudio
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}
            className="why-us-grid"
          >
            {[
              {
                num: "01",
                title: "Bespoke Architecture",
                desc: "We reject cookie-cutter themes and templates. Every project is built custom from scratch to exactly matching your visual layout and backend workflows.",
              },
              {
                num: "02",
                title: "Clean Logic & Performance",
                desc: "Clean, minified code ensuring your page loads instantly, boosts visitor retention, and secures top organic ranks on Google indexes.",
              },
              {
                num: "03",
                title: "Intelligent Workflows",
                desc: "AI integrations aren't just chatbot extensions. We inject model endpoints directly into database structures, creating automated smart networks.",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                style={{
                  padding: "2.5rem",
                  background: "rgba(255, 255, 255, 0.7)",
                  border: "1px solid var(--card-border)",
                  boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.03)",
                  borderRadius: "20px",
                }}
              >
                <div style={{ fontSize: "3rem", fontWeight: 800, color: "rgba(79, 70, 229, 0.15)", fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>
                  {card.num}
                </div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.8rem" }}>{card.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CONSULTATION CALL TO ACTION */}
      <section style={{ padding: "8rem 0 10rem 0", position: "relative" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              background: "linear-gradient(135deg, rgba(79, 70, 229, 0.04) 0%, rgba(255, 255, 255, 0.9) 100%)",
              border: "1px solid rgba(79, 70, 229, 0.12)",
              boxShadow: "0 20px 50px -20px rgba(79, 70, 229, 0.1)",
              borderRadius: "30px",
              padding: "5rem 2rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background highlights */}
            <div
              className="glow-spot"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "400px",
                height: "400px",
                backgroundColor: "var(--primary)",
                opacity: 0.05,
              }}
            />

            <div style={{ position: "relative", zIndex: 2, maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ display: "inline-flex", gap: "3px", color: "var(--accent)", marginBottom: "1rem" }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--accent)" color="var(--accent)" />)}
              </div>
              <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
                Ready to Build Something <span className="text-gradient">Stellar?</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "2.5rem" }}>
                Schedule a briefing with lead developer Fahad Najam. Let's design and deploy custom web solutions and AI integrations tailored for your company.
              </p>
              <Link href="/contact" passHref>
                <MagneticButton className="btn btn-accent">
                  Initiate Project Brief <ArrowRight size={16} />
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
