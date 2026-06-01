"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Star, Rocket, Shield, Cpu, User, ArrowRight } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import GlowCard from "../../components/ui/GlowCard";
import MagneticButton from "../../components/ui/MagneticButton";
import useScrollReset from "../useScrollReset";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("../../components/ui/CustomCursor"), { ssr: false });

export default function About() {
  useScrollReset();
  const missionCards = [
    {
      icon: <Rocket size={24} color="var(--primary)" />,
      title: "Performance-First Coded Infrastructure",
      desc: "Every second counts. We construct custom solutions from the ground up, keeping scripts light, page transitions fluid, and search engines optimized."
    },
    {
      icon: <Shield size={24} color="var(--secondary)" />,
      title: "Strict Personal Accountability",
      desc: "The 'FN' in our name signifies founder Fahad Najam's direct involvement in auditing and engineering every single deployment block."
    },
    {
      icon: <Cpu size={24} color="var(--accent)" />,
      title: "Modern Intelligent Workflows",
      desc: "We merge Next.js fullstack capabilities with semantic AI databases, allowing apps to auto-learn, automate prompts, and sync instantly."
    }
  ];

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

      <main style={{ paddingTop: "var(--header-height)", position: "relative" }}>
        {/* Background grids */}
        <div className="grid-bg" />

        {/* Floating gradient highlights */}
        <div
          className="glow-spot"
          style={{
            top: "15%",
            left: "5%",
            width: "450px",
            height: "450px",
            backgroundColor: "var(--primary)",
            opacity: 0.04,
          }}
        />

        {/* Hero Section */}
        <section style={{ padding: "6rem 0 4rem 0" }}>
          <div className="container about-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "4rem", alignItems: "center" }}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <span style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
                Who We Are
              </span>
              <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4rem)", lineHeight: 1.1, color: "var(--text-primary)" }}>
                Digital Craftsmanship meeting <span className="text-gradient">Logic</span>
              </h1>
              <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                FN DevStudio is a premier, forward-thinking web development agency dedicated to engineering high-performance, scalable, and visually stunning digital solutions.
              </p>
              <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                The name FN DevStudio reflects our core identity: **FN** establishes personal accountability and leadership, while **DevStudio** signifies a collaborative workspace of digital craftsmanship.
              </p>
            </motion.div>

            {/* Glowing Brand Card */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <GlowCard glowColor="rgba(79, 70, 229, 0.08)">
                <div style={{ padding: "3rem 2rem", textAlign: "center", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <Star size={44} color="var(--accent)" fill="var(--accent)" style={{ alignSelf: "center", animation: "float 4s ease-in-out infinite" }} />
                  <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>The "Najam" Philosophy</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    Our driving philosophy is centered around delivering **"stellar web solutions"**—a nod to the meaning of Najam (Star)—ensuring that every project we touch stands out in the digital landscape.
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </section>

        {/* Mission & Values cards */}
        <section style={{ padding: "6rem 0", backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--card-border)" }}>
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ maxWidth: "600px", marginBottom: "4rem" }}
            >
              <span style={{ color: "var(--secondary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
                Our Mission & Values
              </span>
              <h2 style={{ fontSize: "2.2rem", marginTop: "0.5rem", color: "var(--text-primary)" }}>
                We Build Digital Infrastructure
              </h2>
              <p style={{ color: "var(--text-secondary)", marginTop: "1rem" }}>
                At FN DevStudio, we don't just build websites; we build scalable digital infrastructure that drives business growth.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}
              className="about-values-grid"
            >
              {missionCards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  style={{
                    padding: "2.5rem 2rem",
                    background: "rgba(255, 255, 255, 0.75)",
                    border: "1px solid var(--card-border)",
                    boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.03)",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(15, 23, 42, 0.02)",
                      border: "1px solid rgba(15, 23, 42, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>{card.title}</h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Founder section */}
        <section style={{ padding: "8rem 0" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "0.8fr 1.2fr",
                gap: "5rem",
                alignItems: "center",
              }}
              className="founder-grid"
            >
              {/* Founder Avatar card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  border: "1px solid var(--card-border)",
                  boxShadow: "0 10px 35px -15px rgba(15, 23, 42, 0.06)",
                  background: "rgba(255, 255, 255, 0.75)",
                  padding: "3rem 2rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(79, 70, 229, 0.06)",
                    border: "2px solid var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 20px rgba(79, 70, 229, 0.1)",
                  }}
                >
                  <User size={50} color="var(--primary)" />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.4rem", color: "var(--text-primary)" }}>Fahad Najam</h3>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Founder & Lead Developer
                  </span>
                </div>
              </motion.div>

              {/* Founder Biography */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
              >
                <span style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
                  Message From The Founder
                </span>
                <h2 style={{ fontSize: "2.2rem", marginTop: "0.5rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
                  Personalized Craftsmanship & Accountability
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "1.2rem" }}>
                  "When you work with a large dev agency, your project is often handed off to junior developers, resulting in generic template outputs and code compromises. At FN DevStudio, I personally oversee the architecture and compile-cycle of every codebase."
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                  "Our mission is to help startups, enterprises, and local brands deploy digital assets that load instantly and interact flawlessly. We blend standard web logic with modern AI capabilities, ensuring your systems scale alongside your customer count."
                </p>
                <Link href="/contact" passHref>
                  <MagneticButton className="btn btn-accent">
                    Book Technical Call <ArrowRight size={16} />
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
