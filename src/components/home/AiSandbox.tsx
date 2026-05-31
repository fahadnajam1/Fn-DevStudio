"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Play, CheckCircle2, Cpu, Eye, Code2 } from "lucide-react";
import GlowCard from "../ui/GlowCard";

type TabId = "chatbot" | "search" | "dashboard";

interface TerminalLine {
  text: string;
  type: "command" | "info" | "success" | "warning";
}

export default function AiSandbox() {
  const [activeTab, setActiveTab] = useState<TabId>("chatbot");
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<TerminalLine[]>([]);
  const [showLivePreview, setShowLivePreview] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Chatbot state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Hello! I am the FN DevStudio AI assistant. Ask me anything about our web capabilities." }
  ]);
  const [userInput, setUserInput] = useState("");

  // Semantic Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchItems] = useState([
    { title: "Next.js Core Integration", category: "Web Development", desc: "Server components, routes optimization" },
    { title: "Retrieval Augmented Generation (RAG)", category: "AI Integrations", desc: "LLM contextual vector databases" },
    { title: "Lighthouse Performance Audit", category: "Optimization", desc: "Speed optimization, script offloading" },
    { title: "Tailored Shopify Storefronts", category: "E-Commerce", desc: "High conversion checkout architectures" },
  ]);

  // Lead Score states
  const [selectedIndustry, setSelectedIndustry] = useState("SaaS");
  const [userVol, setUserVol] = useState(25000);

  const tabDetails = {
    chatbot: {
      name: "AI Support Chatbot",
      description: "Embed customized customer-service LLM agents that read your company knowledge base.",
      code: `// File: src/app/api/ai/chat/route.ts\nimport { OpenAIStream, StreamingTextResponse } from "ai";\nimport { Configuration, OpenAIApi } from "openai-edge";\n\nconst config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });\nconst openai = new OpenAIApi(config);\n\nexport async function POST(req: Request) {\n  const { messages } = await req.json();\n  const response = await openai.createChatCompletion({\n    model: "gpt-4o-mini",\n    stream: true,\n    messages: [{ role: "system", content: "You are FN DevStudio's agent." }, ...messages]\n  });\n  const stream = OpenAIStream(response);\n  return new StreamingTextResponse(stream);\n}`,
    },
    search: {
      name: "Semantic Neural Search",
      description: "Replace legacy database regex matches with intelligent, vector-embedding query matching.",
      code: `// File: src/lib/ai/vectorSearch.ts\nimport { OpenAIEmbeddings } from "@langchain/openai";\nimport { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";\n\nexport async function searchKnowledge(query: string) {\n  const embeddings = new OpenAIEmbeddings({ modelName: "text-embedding-3-small" });\n  const vectorStore = new SupabaseVectorStore(embeddings, {\n    client: supabaseClient,\n    tableName: "documents",\n    queryName: "match_documents"\n  });\n  return await vectorStore.similaritySearch(query, 3);\n}`,
    },
    dashboard: {
      name: "Predictive Analytics Model",
      description: "Integrate regression models that forecast business workloads, lead scores, and scaling requirements.",
      code: `// File: src/lib/ai/predictor.ts\nimport * as tf from "@tensorflow/tfjs";\n\nexport function predictConversionRate(monthlyTraffic: number, pageSpeed: number) {\n  // Load lightweight linear regression model weight matrices\n  const speedWeight = -0.04; // Faster pages increase conversion\n  const baseRate = 1.2;\n  const scaledSpeedBonus = Math.max(0, (5000 - pageSpeed) / 1000) * 0.4;\n  \n  return Math.min(8.5, baseRate + (monthlyTraffic * 0.00002) + scaledSpeedBonus);\n}`,
    },
  };

  useEffect(() => {
    // Reset sandbox when switching tabs
    setIsRunning(false);
    setProgress(0);
    setTerminalLogs([
      { text: `$ select-pipeline --module=${activeTab}`, type: "command" },
      { text: `Target set to: ${tabDetails[activeTab].name}`, type: "info" },
      { text: `Press "Run Integration Pipeline" to deploy this module.`, type: "info" },
    ]);
    setShowLivePreview(false);
  }, [activeTab]);

  // Prevent initial auto‑scroll to terminal on page load.
  // We only want to scroll when the sandbox is actively showing logs after a pipeline run.
  const hasScrolledRef = React.useRef(false);
  React.useEffect(() => {
    // Trigger scroll when new logs are added **and** the live preview is displayed.
    if (showLivePreview && terminalEndRef.current && !hasScrolledRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
      hasScrolledRef.current = true;
    }
  }, [terminalLogs, showLivePreview]);

  const runPipeline = () => {
    setIsRunning(true);
    setProgress(5);
    setShowLivePreview(false);
    setTerminalLogs([
      { text: `$ run-build-pipeline --module=${activeTab} --env=production`, type: "command" },
    ]);

    const logs: Array<{ text: string; type: "command" | "info" | "success" | "warning"; delay: number }> = [
      { text: "📦 Fetching OpenAI text-embedding-3 and model endpoint artifacts...", type: "info", delay: 400 },
      { text: "🔧 Compiling Serverless API Endpoint triggers...", type: "info", delay: 900 },
      { text: "🔒 Checking environment variables and API credentials...", type: "info", delay: 1400 },
      { text: "🧩 Initializing pinecone/supabase vector lookup connections...", type: "info", delay: 1800 },
      { text: "⚡ Bundling runtime libraries (TensorFlow / LangChain dependencies)...", type: "info", delay: 2400 },
      { text: "⚠️ Bundle optimizer check: Tree-shaking unused dynamic modules...", type: "warning", delay: 2900 },
      { text: "🚀 Deploying Edge Middleware Edge Functions to Edge Clusters...", type: "info", delay: 3400 },
      { text: "✅ Production build finished successfully. Cache revalidated.", type: "success", delay: 3900 },
      { text: "🟢 Hot Reload: Local client rendering sandbox active.", type: "success", delay: 4300 },
    ];

    logs.forEach((log) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, { text: log.text, type: log.type }]);
        setProgress((p) => Math.min(100, p + 10));
      }, log.delay);
    });

    setTimeout(() => {
      setProgress(100);
      setIsRunning(false);
      setShowLivePreview(true);
    }, 4600);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = userInput;
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setUserInput("");

    setTimeout(() => {
      let aiText = "Thank you for asking! FN DevStudio ensures full OpenAI integration with optimized token caching.";
      if (userMsg.toLowerCase().includes("speed") || userMsg.toLowerCase().includes("perform")) {
        aiText = "Our custom Next.js builds score 100/100 because we compile all code statically, minimizing runtime scripts.";
      } else if (userMsg.toLowerCase().includes("cost") || userMsg.toLowerCase().includes("price")) {
        aiText = "We tailor custom packages depending on your business requirements. Fill out our contact brief for an exact quotation!";
      } else if (userMsg.toLowerCase().includes("hi") || userMsg.toLowerCase().includes("hello")) {
        aiText = "Hello! I am Fahad Najam's automated AI assistant. How can I help you today?";
      }

      setChatMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    }, 800);
  };

  const filteredSearchItems = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Tab Selectors */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          background: "rgba(255, 255, 255, 0.02)",
          padding: "6px",
          borderRadius: "14px",
          border: "1px solid var(--card-border)",
          width: "fit-content",
          alignSelf: "center",
        }}
      >
        {(Object.keys(tabDetails) as TabId[]).map((tabId) => (
          <button
            key={tabId}
            onClick={() => setActiveTab(tabId)}
            style={{
              padding: "0.6rem 1.2rem",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 600,
              fontFamily: "var(--font-heading)",
              transition: "var(--transition-fast)",
              backgroundColor: activeTab === tabId ? "rgba(255, 255, 255, 0.05)" : "transparent",
              color: activeTab === tabId ? "#ffffff" : "var(--text-secondary)",
            }}
            className="interactive-hover"
          >
            {tabDetails[tabId].name}
          </button>
        ))}
      </div>

      {/* Intro Description */}
      <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)" }}>
          {tabDetails[activeTab].description}
        </p>
      </div>

      {/* Main Grid: Code / Terminal VS Browser Mockup */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}
        className="sandbox-grid"
      >
        {/* Left Side: Code / Terminal compilation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {/* Code Viewer */}
          <div
            style={{
              background: "rgba(5, 5, 7, 0.8)",
              borderRadius: "15px",
              border: "1px solid var(--card-border)",
              fontFamily: "monospace",
              fontSize: "0.8rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                padding: "8px 16px",
                borderBottom: "1px solid var(--card-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Code2 size={14} /> Source Code
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>TypeScript</span>
            </div>
            <pre
              style={{
                padding: "1.2rem",
                margin: 0,
                color: "#e2e8f0",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                height: "220px",
                lineHeight: 1.5,
              }}
            >
              {tabDetails[activeTab].code}
            </pre>
          </div>

          {/* Terminal Logs */}
          <div
            style={{
              background: "#050508",
              borderRadius: "15px",
              border: "1px solid var(--card-border)",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              fontFamily: "monospace",
              fontSize: "0.8rem",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                padding: "8px 16px",
                borderBottom: "1px solid var(--card-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "var(--text-secondary)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Terminal size={14} /> Edge Console
              </span>
              <button
                onClick={runPipeline}
                disabled={isRunning}
                style={{
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                  border: "none",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  opacity: isRunning ? 0.6 : 1,
                }}
                className="interactive-hover"
              >
                <Play size={10} /> Run Pipeline
              </button>
            </div>

            <div
              style={{
                padding: "1rem",
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {terminalLogs.map((log, index) => (
                <div
                  key={index}
                  style={{
                    color:
                      log.type === "command"
                        ? "var(--secondary)"
                        : log.type === "success"
                          ? "#10b981"
                          : log.type === "warning"
                            ? "#fbbf24"
                            : "#94a3b8",
                  }}
                >
                  {log.text}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Progress bar */}
            {isRunning && (
              <div style={{ height: "4px", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    backgroundColor: "var(--primary)",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Simulated Web Browser Live Preview */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              flex: 1,
              background: "rgba(10, 10, 12, 0.8)",
              borderRadius: "20px",
              border: "1px solid var(--card-border)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              minHeight: "440px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Browser top navigation bar */}
            <div
              style={{
                height: "40px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderBottom: "1px solid var(--card-border)",
                display: "flex",
                alignItems: "center",
                padding: "0 1rem",
                gap: "1.5rem",
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#fbbf24" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10b981" }} />
              </div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  height: "22px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                }}
              >
                sandbox://localhost:3000/{activeTab}
              </div>
              <span style={{ color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.7rem" }}>
                <Eye size={12} /> Live Preview
              </span>
            </div>

            {/* Browser Body Rendering */}
            <div style={{ flex: 1, display: "flex", position: "relative" }}>
              {!showLivePreview && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    textAlign: "center",
                    zIndex: 5,
                    backgroundColor: "rgba(10, 10, 12, 0.95)",
                  }}
                >
                  <Cpu size={48} className="floating" color="var(--primary)" style={{ marginBottom: "1rem" }} />
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Sandbox Offline</h4>
                  <p style={{ fontSize: "0.85rem", maxWidth: "300px" }}>
                    Run the build pipeline console to compile, bind OpenAI dependencies, and activate live edge deployment.
                  </p>
                </div>
              )}

              {showLivePreview && (
                <div style={{ width: "100%", height: "100%", padding: "1.5rem", display: "flex", flexDirection: "column", overflowY: "auto" }}>
                  {/* TAB 1 CONTENT: CHATBOT */}
                  {activeTab === "chatbot" && (
                    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1rem" }}>
                        {chatMessages.map((msg, idx) => (
                          <div
                            key={idx}
                            style={{
                              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                              backgroundColor: msg.sender === "user" ? "var(--primary)" : "rgba(255,255,255,0.05)",
                              color: "#ffffff",
                              padding: "8px 14px",
                              borderRadius: "14px",
                              borderTopRightRadius: msg.sender === "user" ? "2px" : "14px",
                              borderTopLeftRadius: msg.sender === "ai" ? "2px" : "14px",
                              maxWidth: "85%",
                              fontSize: "0.85rem",
                              lineHeight: 1.4,
                            }}
                          >
                            {msg.text}
                          </div>
                        ))}
                      </div>
                      <form onSubmit={handleChatSubmit} style={{ display: "flex", gap: "0.5rem" }}>
                        <input
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          placeholder="Ask chatbot about speed, costs, etc..."
                          style={{
                            flex: 1,
                            background: "rgba(0,0,0,0.3)",
                            border: "1px solid var(--card-border)",
                            borderRadius: "8px",
                            padding: "8px 12px",
                            color: "#ffffff",
                            fontSize: "0.8rem",
                            outline: "none",
                          }}
                        />
                        <button
                          type="submit"
                          style={{
                            background: "var(--primary)",
                            border: "none",
                            borderRadius: "8px",
                            color: "#ffffff",
                            padding: "0 1rem",
                            fontWeight: 600,
                            fontSize: "0.8rem",
                            cursor: "pointer",
                          }}
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  )}

                  {/* TAB 2 CONTENT: SEMANTIC SEARCH */}
                  {activeTab === "search" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Type keywords (e.g. 'speed', 'RAG', 'Shopify')..."
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          border: "1px solid var(--card-border)",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          color: "#ffffff",
                          fontSize: "0.8rem",
                          outline: "none",
                          width: "100%",
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {filteredSearchItems.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              background: "rgba(255, 255, 255, 0.02)",
                              border: "1px solid var(--card-border)",
                              borderRadius: "10px",
                              padding: "0.8rem",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <h5 style={{ fontSize: "0.85rem", color: "#ffffff" }}>{item.title}</h5>
                              <span style={{ fontSize: "0.65rem", padding: "2px 6px", borderRadius: "10px", background: "rgba(6, 182, 212, 0.15)", color: "var(--secondary)" }}>
                                {item.category}
                              </span>
                            </div>
                            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px" }}>{item.desc}</p>
                          </div>
                        ))}
                        {filteredSearchItems.length === 0 && (
                          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", padding: "2rem" }}>
                            No similarity vectors found for search query.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 3 CONTENT: PREDICTIVE DASHBOARD */}
                  {activeTab === "dashboard" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                      <div style={{ display: "flex", gap: "1rem" }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: "0.7rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Industry</label>
                          <select
                            value={selectedIndustry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                            style={{
                              background: "rgba(0,0,0,0.3)",
                              border: "1px solid var(--card-border)",
                              borderRadius: "6px",
                              padding: "6px 8px",
                              color: "#ffffff",
                              fontSize: "0.75rem",
                              width: "100%",
                              outline: "none",
                            }}
                          >
                            <option value="SaaS">SaaS Platform</option>
                            <option value="Ecommerce">E-Commerce</option>
                            <option value="Consulting">Consulting</option>
                          </select>
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: "0.7rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Traffic / Mo</label>
                          <input
                            type="range"
                            min="5000"
                            max="200000"
                            step="5000"
                            value={userVol}
                            onChange={(e) => setUserVol(parseInt(e.target.value))}
                            style={{ width: "100%", accentColor: "var(--primary)" }}
                          />
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "2px" }}>
                            <span>5K</span>
                            <span style={{ color: "#ffffff" }}>{(userVol / 1000).toFixed(0)}K</span>
                            <span>200K</span>
                          </div>
                        </div>
                      </div>

                      {/* Prediction Result Graph */}
                      <div
                        style={{
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid var(--card-border)",
                          borderRadius: "12px",
                          padding: "1rem",
                          textAlign: "center",
                        }}
                      >
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>PREDICTED CONVERSION RATE</span>
                        <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--secondary)", marginTop: "4px", fontFamily: "var(--font-heading)" }}>
                          {(1.2 + userVol * 0.00002 + (selectedIndustry === "Ecommerce" ? 0.8 : 0)).toFixed(2)}%
                        </div>
                        <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                          Linear regression computed on {selectedIndustry} parameters.
                        </p>
                      </div>

                      {/* Bar graph visualization */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                          <span>Data Pipeline Sync</span>
                          <span style={{ color: "#10b981", fontWeight: "bold" }}>Synchronized</span>
                        </div>
                        <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ width: "88%", height: "100%", background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 992px) {
          .sandbox-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
