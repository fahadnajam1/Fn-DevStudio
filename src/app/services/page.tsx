"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Code, Brain, ShoppingBag, LayoutTemplate, Zap, ArrowRight, Check } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CustomCursor from "../../components/ui/CustomCursor";
import GlowCard from "../../components/ui/GlowCard";
import MagneticButton from "../../components/ui/MagneticButton";
import useScrollReset from "../useScrollReset";

export default function Services() {
  useScrollReset();
  const serviceCategories = [
    {
      id: "web-dev",
      icon: <Code size={32} color="var(--primary)" />,
      title: "Custom Web Development",
      tagline: "High-Performance Fullstack Architecture",
      desc: "We build tailored web applications designed for speed, scale, and longevity. No templates, no bloat. Just clean, optimized code.",
      features: [
        "React & Next.js SSR/ISR rendering systems",
        "Robust Node.js & Python backend REST APIs",
        "Serverless & Edge execution environments",
        "High-security auth (OAuth, MFA) setups",
        "Strict TypeScript safety across layouts",
      ],
      color: "rgba(79, 70, 229, 0.08)",
    },
    {
      id: "ai-integration",
      icon: <Brain size={32} color="var(--secondary)" />,
      title: "AI Integration & Workflows",
      tagline: "Cognitive Intelligence for Web Backends",
      desc: "Bridge web layers with state-of-the-art cognitive models. We integrate machine learning to automate complex user workflows.",
      features: [
        "Semantic vector search database setup",
        "Fine-tuned LLM chatbot support systems",
        "Automated RAG knowledge base engines",
        "Predictive lead scoring & workload tools",
        "Autonomous AI agent script engineering",
      ],
      color: "rgba(14, 165, 233, 0.08)",
    },
    {
      id: "ecommerce",
      icon: <ShoppingBag size={32} color="var(--accent)" />,
      title: "E-Commerce Solutions",
      tagline: "Frictionless Checkout & High Conversions",
      desc: "Turn clicks into revenue. We engineer secure digital storefronts designed for swift indexing and low cart abandonment rates.",
      features: [
        "Headless Shopify & custom React checkouts",
        "Multi-provider payment (Stripe, PayPal) APIs",
        "Dynamic content management panel (CMS)",
        "Automated inventory sync & mail hooks",
        "High-performance catalog product indexing",
      ],
      color: "rgba(217, 119, 6, 0.08)",
    },
    {
      id: "ui-ux",
      icon: <LayoutTemplate size={32} color="#f43f5e" />,
      title: "UI/UX Implementation",
      tagline: "Digital Craftsmanship & Responsive Flow",
      desc: "We translate Figma layout briefs into pixel-perfect interactive reality. We emphasize micro-interactions and smooth user feedback.",
      features: [
        "Responsive styling (Mobile up to 4K)",
        "Hardware-accelerated CSS animations",
        "Fluid route-transition UI state mechanics",
        "Interactive custom forms & input feedback",
        "Strict visual layout accessibility standards",
      ],
      color: "rgba(244, 63, 94, 0.08)",
    },
    {
      id: "performance",
      icon: <Zap size={32} color="#10b981" />,
      title: "Performance Optimization",
      tagline: "Drastic Load-time Reductions & Core Web Vitals",
      desc: "Is your legacy website slow? We perform exhaustive technical audits and refactor bundle code to ensure near-instant site loading.",
      features: [
        "Render-blocking scripts removal",
        "Static site compiling & CDN distribution",
        "Asset compressing & WebP image pipelines",
        "Redundant dependency removal",
        "Lighthouse performance rating of 100/100",
      ],
      color: "rgba(16, 185, 129, 0.08)",
    },
  ];

  const techStack = {
    frontend: ["Next.js", "React.js", "TypeScript", "Vanilla CSS", "HTML5 Canvas"],
    backend: ["Node.js", "Python FastAPI", "Express", "RESTful / GraphQL"],
    database: ["PostgreSQL", "Supabase", "Redis", "Pinecone (Vector DB)", "MongoDB"],
    cloud: ["Vercel Edge", "AWS", "Docker", "GitHub Actions", "Netlify"],
    ai: ["OpenAI API", "LangChain", "TensorFlow.js", "Hugging Face", "RAG Systems"],
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  } as const;

  return (
    <>
      <CustomCursor />
      <Header />

      <main style={{ paddingTop: "var(--header-height)", position: "relative" }}>
        {/* Background Grids */}
        <div className="grid-bg" />

        {/* Hero Banner */}
        <section style={{ padding: "6rem 0 4rem 0" }}>
          <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
                Our Ecosystem
              </span>
              <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4rem)", marginTop: "0.5rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
                Digital Infrastructure Coded for <span className="text-gradient">Scale</span>
              </h1>
              <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                At FN DevStudio, we don't build temporary templates. We build custom-engineered digital systems designed to drive business conversions and efficiency.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Detailed Service Cards */}
        <section style={{ padding: "4rem 0 8rem 0" }}>
          <div className="container" style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
            {serviceCategories.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.1fr 0.9fr",
                    gap: "4rem",
                    alignItems: "center",
                  }}
                  className={`service-detail-row ${isEven ? "" : "reverse-row"}`}
                >
                  {/* Text details */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "12px",
                          backgroundColor: "rgba(15, 23, 42, 0.02)",
                          border: "1px solid rgba(15, 23, 42, 0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {service.icon}
                      </div>
                      <div>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                          {service.tagline}
                        </span>
                        <h2 style={{ fontSize: "1.8rem", marginTop: "2px", color: "var(--text-primary)" }}>{service.title}</h2>
                      </div>
                    </div>

                    <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: "2rem", lineHeight: 1.6 }}>
                      {service.desc}
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="feature-grid">
                      {service.features.map((feature, idx) => (
                        <div key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                          <Check size={16} color="#10b981" style={{ marginTop: "4px", flexShrink: 0 }} />
                          <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual card */}
                  <div>
                    <GlowCard glowColor={service.color} className="glass-card">
                      <div style={{ padding: "3rem", display: "flex", flexDirection: "column", gap: "1.5rem", textAlign: "center", minHeight: "300px", justifyContent: "center" }}>
                        <Sparkles size={40} color="var(--accent)" style={{ alignSelf: "center", animation: "float 4s ease-in-out infinite" }} />
                        <h3 style={{ fontSize: "1.5rem" }} className="text-gradient">
                          Stellar Standard
                        </h3>
                        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                          Engineered with high security protocols, SEO markup schema, and full mobile adaptability.
                        </p>
                      </div>
                    </GlowCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Technology Matrix Section */}
        <section style={{ padding: "6rem 0 8rem 0", backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--card-border)" }}>
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem auto" }}
            >
              <h2 style={{ fontSize: "2.2rem", color: "var(--text-primary)" }}>Our Advanced Tech Stack</h2>
              <p style={{ color: "var(--text-secondary)", marginTop: "1rem" }}>
                We utilize cutting-edge libraries, frame-level compilers, and serverless edge databases to construct reliable apps.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1.5rem" }}
              className="tech-grid"
            >
              {[
                { title: "Frontend Stack", items: techStack.frontend, color: "rgba(79, 70, 229, 0.03)" },
                { title: "Backend Core", items: techStack.backend, color: "rgba(14, 165, 233, 0.03)" },
                { title: "Databases & Cache", items: techStack.database, color: "rgba(217, 119, 6, 0.03)" },
                { title: "Cloud & Devops", items: techStack.cloud, color: "rgba(16, 185, 129, 0.03)" },
                { title: "AI Frameworks", items: techStack.ai, color: "rgba(244, 63, 94, 0.03)" },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  style={{
                    padding: "2rem 1.5rem",
                    borderRadius: "15px",
                    border: "1px solid var(--card-border)",
                    background: category.color,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.01)",
                  }}
                >
                  <h4 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "1.2rem", borderBottom: "1px solid rgba(15, 23, 42, 0.06)", paddingBottom: "6px" }}>
                    {category.title}
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    {category.items.map((item, idx) => (
                      <span key={idx} style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "8rem 0", textAlign: "center" }}>
          <div className="container">
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>Have a unique project idea?</h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "550px", margin: "0 auto 2.5rem auto", fontSize: "1.1rem" }}>
              Reach out to us. We reject template structures to engineer completely custom solutions matching your exact specifications.
            </p>
            <Link href="/contact" passHref>
              <MagneticButton className="btn btn-accent">
                Book Briefing <ArrowRight size={16} />
              </MagneticButton>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
