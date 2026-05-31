"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Mail, Phone, Sparkles } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CustomCursor from "../../components/ui/CustomCursor";
import GlowCard from "../../components/ui/GlowCard";
import MagneticButton from "../../components/ui/MagneticButton";
import useScrollReset from "../useScrollReset";

export default function Contact() {
  useScrollReset();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = 4;

  // Form State
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const servicesOptions = [
    "Custom Web Development",
    "AI Workflow Integration",
    "E-Commerce Solutions",
    "UI/UX Implementation",
    "Speed & Core Vitals Optimization",
  ];

  const budgetOptions = [
    "Under $5,000",
    "$5,000 - $15,000",
    "$15,000 - $30,000",
    "$30,000+",
  ];

  const timelineOptions = [
    "Under 1 Month",
    "1 - 3 Months",
    "3+ Months",
    "Ongoing Advisory",
  ];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.name || !contactInfo.email) {
      alert("Please fill in your Name and Email address.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <CustomCursor />
      <Header />

      <main style={{ paddingTop: "var(--header-height)", position: "relative" }}>
        {/* Background grids */}
        <div className="grid-bg" />

        {/* Decorative glows */}
        <div
          className="glow-spot"
          style={{
            top: "20%",
            left: "5%",
            width: "450px",
            height: "450px",
            backgroundColor: "var(--primary)",
            opacity: 0.04,
          }}
        />

        <section style={{ padding: "5rem 0 8rem 0" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "0.8fr 1.2fr",
                gap: "5rem",
                alignItems: "flex-start",
              }}
              className="contact-layout-grid"
            >
              {/* Left Column: Contact details */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <div>
                  <span style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
                    Get In Touch
                  </span>
                  <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", marginTop: "0.5rem", marginBottom: "1rem", color: "var(--text-primary)" }}>
                    Let's build <span className="text-gradient">together</span>
                  </h1>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    Submit our onboarding wizard brief, or reach out directly via mail or call. Fahad Najam responds to all qualified briefings within 24 hours.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "rgba(15, 23, 42, 0.02)", border: "1px solid rgba(15, 23, 42, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Mail size={18} color="var(--primary)" />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>General Mailbox</div>
                      <a href="mailto:fahadnajam55@gmail.com" style={{ fontSize: "0.95rem", color: "var(--text-primary)" }} className="interactive-hover email-hover">
                        fahadnajam55@gmail.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "rgba(15, 23, 42, 0.02)", border: "1px solid rgba(15, 23, 42, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Phone size={18} color="var(--secondary)" />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Direct Phone</div>
                      <a href="tel:+923326551255" style={{ fontSize: "0.95rem", color: "var(--text-primary)" }} className="interactive-hover email-hover">
                        +92 3326551255
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Multi-step Brief Wizard */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <GlowCard glowColor="rgba(79, 70, 229, 0.06)">
                  <div style={{ padding: "3rem 2.5rem" }}>
                    {submitted ? (
                      /* Success State */
                      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1.5rem", padding: "3rem 0" }}>
                        <div
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                            border: "2px solid #10b981",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                            boxShadow: "0 0 20px rgba(16, 185, 129, 0.1)",
                          }}
                        >
                          <Check size={36} color="#10b981" />
                        </div>
                        <div>
                          <h3 style={{ fontSize: "1.6rem", color: "var(--text-primary)" }}>Brief Submitted!</h3>
                          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.5rem", lineHeight: 1.6 }}>
                            Thank you, {contactInfo.name}. We've received your requirements and variables. Fahad Najam will review the specifications and schedule an intake call with you within 24 hours.
                          </p>
                        </div>
                        <Link href="/" passHref style={{ marginTop: "1rem" }}>
                          <button className="btn btn-secondary">Return Home</button>
                        </Link>
                      </div>
                    ) : (
                      /* Form Steps */
                      <form onSubmit={handleSubmit}>
                        {/* Step Progress indicators */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
                          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                            STEP {step} OF {totalSteps}
                          </span>
                          <div style={{ display: "flex", gap: "4px" }}>
                            {[...Array(totalSteps)].map((_, i) => (
                              <div
                                key={i}
                                style={{
                                  width: "24px",
                                  height: "4px",
                                  borderRadius: "2px",
                                  backgroundColor: i + 1 <= step ? "var(--primary)" : "rgba(15, 23, 42, 0.06)",
                                  transition: "background-color 0.3s ease",
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* STEP CONTENT WRAPPED IN ANIMATEPRESENCE */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* STEP 1: SERVICES SELECTOR */}
                            {step === 1 && (
                              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                <div>
                                  <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>What services do you require?</h3>
                                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                                    Select all categories that apply to your business goals.
                                  </p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                                  {servicesOptions.map((service) => {
                                    const selected = selectedServices.includes(service);
                                    return (
                                      <button
                                        key={service}
                                        type="button"
                                        onClick={() => toggleService(service)}
                                        style={{
                                          padding: "1rem 1.5rem",
                                          borderRadius: "12px",
                                          border: selected ? "1px solid var(--primary)" : "1px solid var(--card-border)",
                                          background: selected ? "rgba(79, 70, 229, 0.06)" : "#ffffff",
                                          color: selected ? "var(--primary)" : "var(--text-secondary)",
                                          boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
                                          textAlign: "left",
                                          fontSize: "0.95rem",
                                          cursor: "pointer",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          transition: "var(--transition-fast)",
                                        }}
                                        className="interactive-hover"
                                      >
                                        <span>{service}</span>
                                        {selected && <Check size={16} color="var(--primary)" />}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* STEP 2: BUDGET SELECTOR */}
                            {step === 2 && (
                              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                <div>
                                  <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>What is your estimated budget?</h3>
                                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                                    Select the tier that matches your investment target.
                                  </p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                                  {budgetOptions.map((opt) => {
                                    const selected = budget === opt;
                                    return (
                                      <button
                                        key={opt}
                                        type="button"
                                        onClick={() => setBudget(opt)}
                                        style={{
                                          padding: "1rem 1.5rem",
                                          borderRadius: "12px",
                                          border: selected ? "1px solid var(--secondary)" : "1px solid var(--card-border)",
                                          background: selected ? "rgba(14, 165, 233, 0.06)" : "#ffffff",
                                          color: selected ? "var(--secondary)" : "var(--text-secondary)",
                                          boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
                                          textAlign: "left",
                                          fontSize: "0.95rem",
                                          cursor: "pointer",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          transition: "var(--transition-fast)",
                                        }}
                                        className="interactive-hover"
                                      >
                                        <span>{opt}</span>
                                        {selected && <Check size={16} color="var(--secondary)" />}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* STEP 3: TIMELINE SELECTOR */}
                            {step === 3 && (
                              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                <div>
                                  <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>What is your target delivery timeline?</h3>
                                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                                    Select when you need the digital modules active.
                                  </p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                                  {timelineOptions.map((opt) => {
                                    const selected = timeline === opt;
                                    return (
                                      <button
                                        key={opt}
                                        type="button"
                                        onClick={() => setTimeline(opt)}
                                        style={{
                                          padding: "1rem 1.5rem",
                                          borderRadius: "12px",
                                          border: selected ? "1px solid var(--accent)" : "1px solid var(--card-border)",
                                          background: selected ? "rgba(217, 119, 6, 0.06)" : "#ffffff",
                                          color: selected ? "var(--accent)" : "var(--text-secondary)",
                                          boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
                                          textAlign: "left",
                                          fontSize: "0.95rem",
                                          cursor: "pointer",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          transition: "var(--transition-fast)",
                                        }}
                                        className="interactive-hover"
                                      >
                                        <span>{opt}</span>
                                        {selected && <Check size={16} color="var(--accent)" />}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* STEP 4: CONTACT & DETAILS */}
                            {step === 4 && (
                              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                <div>
                                  <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>Share your contact coordinates</h3>
                                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                                    Tell us who to contact when we review the brief.
                                  </p>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                                  <div>
                                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Full Name *</label>
                                    <input
                                      type="text"
                                      name="name"
                                      required
                                      value={contactInfo.name}
                                      onChange={handleInputChange}
                                      placeholder="e.g. John Doe"
                                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--card-border)", background: "#ffffff", color: "var(--text-primary)", outline: "none" }}
                                    />
                                  </div>

                                  <div>
                                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Company Email *</label>
                                    <input
                                      type="email"
                                      name="email"
                                      required
                                      value={contactInfo.email}
                                      onChange={handleInputChange}
                                      placeholder="e.g. name@company.com"
                                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--card-border)", background: "#ffffff", color: "var(--text-primary)", outline: "none" }}
                                    />
                                  </div>

                                  <div>
                                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Phone Number</label>
                                    <input
                                      type="text"
                                      name="phone"
                                      value={contactInfo.phone}
                                      onChange={handleInputChange}
                                      placeholder="e.g. +1 555 123 4567"
                                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--card-border)", background: "#ffffff", color: "var(--text-primary)", outline: "none" }}
                                    />
                                  </div>

                                  <div>
                                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Project Scope / Notes</label>
                                    <textarea
                                      name="details"
                                      rows={4}
                                      value={contactInfo.details}
                                      onChange={handleInputChange}
                                      placeholder="Briefly tell us what you're building..."
                                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--card-border)", background: "#ffffff", color: "var(--text-primary)", outline: "none", resize: "none" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", borderTop: "1px solid var(--card-border)", paddingTop: "1.5rem" }}>
                          {step > 1 ? (
                            <button
                              type="button"
                              onClick={handleBack}
                              style={{
                                background: "none",
                                border: "none",
                                color: "var(--text-secondary)",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                              className="interactive-hover"
                            >
                              <ArrowLeft size={16} /> Back
                            </button>
                          ) : (
                            <div />
                          )}

                          {step < totalSteps ? (
                            <button
                              type="button"
                              onClick={handleNext}
                              disabled={
                                (step === 1 && selectedServices.length === 0) ||
                                (step === 2 && !budget) ||
                                (step === 3 && !timeline)
                              }
                              style={{
                                background: "var(--primary)",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "8px",
                                padding: "0.6rem 1.4rem",
                                fontSize: "0.9rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                opacity:
                                  (step === 1 && selectedServices.length === 0) ||
                                  (step === 2 && !budget) ||
                                  (step === 3 && !timeline)
                                    ? 0.5
                                    : 1,
                              }}
                              className="interactive-hover"
                            >
                              Continue <ArrowRight size={16} />
                            </button>
                          ) : (
                            <MagneticButton type="submit" className="btn btn-accent">
                              Submit Specifications
                            </MagneticButton>
                          )}
                        </div>
                      </form>
                    )}
                  </div>
                </GlowCard>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
