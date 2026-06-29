"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Search, Filter, AlertCircle, Info, AlertTriangle, Terminal, ChevronLeft, ChevronRight, RefreshCw, Cpu, BrainCircuit } from "lucide-react";

export default function LogsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "system" | "ai" | "groq" | "errors">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "all", label: "All Logs" },
    { id: "system", label: "System", icon: <Terminal className="w-4 h-4 mr-1" /> },
    { id: "ai", label: "Agent AI", icon: <BrainCircuit className="w-4 h-4 mr-1" /> },
    { id: "groq", label: "Groq API", icon: <Cpu className="w-4 h-4 mr-1" /> },
    { id: "errors", label: "Errors Only", icon: <AlertCircle className="w-4 h-4 mr-1 text-red-400" /> },
  ];

  const mockLogs = [
    { id: "log-1", timestamp: "2026-06-28T17:55:02Z", level: "info", source: "system", message: "AgentOS core initialized successfully." },
    { id: "log-2", timestamp: "2026-06-28T17:55:05Z", level: "info", source: "ai", message: "Loaded model weights for sentiment analysis." },
    { id: "log-3", timestamp: "2026-06-28T17:55:12Z", level: "warning", source: "groq", message: "High latency detected on Groq endpoint (850ms)." },
    { id: "log-4", timestamp: "2026-06-28T17:56:01Z", level: "error", source: "system", message: "Failed to connect to Redis cache. Retrying..." },
    { id: "log-5", timestamp: "2026-06-28T17:56:05Z", level: "info", source: "system", message: "Redis connection re-established." },
    { id: "log-6", timestamp: "2026-06-28T17:56:22Z", level: "info", source: "ai", message: "Generated response for user_id: 8472 (Tone: Funny)" },
    { id: "log-7", timestamp: "2026-06-28T17:56:23Z", level: "info", source: "groq", message: "API Request successful. Tokens: 452." },
    { id: "log-8", timestamp: "2026-06-28T17:57:10Z", level: "info", source: "ai", message: "Task 'memory_consolidation' completed." },
    { id: "log-9", timestamp: "2026-06-28T17:57:30Z", level: "error", source: "groq", message: "Rate limit exceeded for model llama3-70b-8192." },
    { id: "log-10", timestamp: "2026-06-28T17:57:40Z", level: "warning", source: "system", message: "Memory usage above 80% threshold." },
  ];

  const filteredLogs = mockLogs.filter(log => {
    if (activeTab === "errors" && log.level !== "error") return false;
    if (activeTab !== "all" && activeTab !== "errors" && log.source !== activeTab) return false;
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error": return <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />;
      default: return <Info className="w-4 h-4 text-blue-400 mt-0.5" />;
    }
  };

  const getLevelStyle = (level: string) => {
    switch (level) {
      case "error": return "bg-red-500/10 border-red-500/20";
      case "warning": return "bg-yellow-500/10 border-yellow-500/20";
      default: return "bg-white/5 border-white/5";
    }
  };
  
  const getSourceStyle = (source: string) => {
    switch (source) {
      case "system": return "text-cyan-400 bg-cyan-400/10";
      case "ai": return "text-purple-400 bg-purple-400/10";
      case "groq": return "text-emerald-400 bg-emerald-400/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
            System Logs
          </h1>
          <p className="text-white/60 mt-1">Real-time event and error monitoring</p>
        </div>
        
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <GlassCard className="flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="p-4 border-b border-white/10 space-y-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input 
                type="text" 
                placeholder="Search logs..." 
                className="pl-9 bg-black/40 border-white/10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" 
                    : "bg-transparent text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm">
          <AnimatePresence initial={false}>
            {filteredLogs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="h-full flex flex-col items-center justify-center text-white/40"
              >
                <Terminal className="w-12 h-12 mb-4 opacity-50" />
                <p>No logs match the current filters.</p>
              </motion.div>
            ) : (
              filteredLogs.map((log, i) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className={`p-3 rounded-lg border flex gap-3 ${getLevelStyle(log.level)}`}
                >
                  <div className="shrink-0">{getLevelIcon(log.level)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white/40 text-xs">{log.timestamp}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider ${getSourceStyle(log.source)}`}>
                        {log.source}
                      </span>
                    </div>
                    <p className={`break-words ${log.level === 'error' ? 'text-red-200' : log.level === 'warning' ? 'text-yellow-200' : 'text-white/80'}`}>
                      {log.message}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        
        <div className="p-3 border-t border-white/10 shrink-0 flex items-center justify-between text-sm text-white/60 bg-black/20">
          <div>Showing {filteredLogs.length} results</div>
          <div className="flex gap-1">
            <button className="p-1 rounded hover:bg-white/10 disabled:opacity-50"><ChevronLeft className="w-5 h-5" /></button>
            <span className="px-2 py-1">Page 1 of 42</span>
            <button className="p-1 rounded hover:bg-white/10 disabled:opacity-50"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
