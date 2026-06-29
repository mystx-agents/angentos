"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Brain, Calendar, Pin, FileText, 
  Trash2, Edit3, Check, X, Clock, ShieldAlert,
  MoreVertical, Filter, Database
} from "lucide-react";

// Mock Data
type Memory = {
  id: string;
  type: "long-term" | "summary" | "pinned";
  content: string;
  date: string;
  isImportant?: boolean;
};

const INITIAL_MEMORIES: Memory[] = [
  { id: "1", type: "pinned", content: "User prefers dark mode UI and high-contrast text.", date: "2024-06-25", isImportant: true },
  { id: "2", type: "long-term", content: "Project Titan architecture relies on Next.js App Router and Zustand for state management.", date: "2024-06-20", isImportant: true },
  { id: "3", type: "summary", content: "Discussed database schema for user profiles. Agreed on Postgres with Prisma ORM.", date: "2024-06-18" },
  { id: "4", type: "long-term", content: "The API rate limit for external services is 100 requests per minute.", date: "2024-06-15" },
  { id: "5", type: "pinned", content: "Always lazy load charting libraries to prevent initial bundle bloat.", date: "2024-06-10", isImportant: true },
  { id: "6", type: "summary", content: "Weekly sync: Auth module is 90% complete. Need to finalize OAuth providers.", date: "2024-06-05" },
];

export default function MemoryPage() {
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "long-term" | "summary" | "pinned">("all");
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const filteredMemories = memories.filter(m => {
    const matchesSearch = m.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || m.type === activeFilter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleDelete = (id: string) => {
    setMemories(memories.filter(m => m.id !== id));
  };

  const startEdit = (memory: Memory) => {
    setEditingId(memory.id);
    setEditContent(memory.content);
  };

  const saveEdit = (id: string) => {
    setMemories(memories.map(m => m.id === id ? { ...m, content: editContent } : m));
    setEditingId(null);
  };

  const togglePin = (id: string) => {
    setMemories(memories.map(m => {
      if (m.id === id) {
        return { ...m, type: m.type === "pinned" ? "long-term" : "pinned" };
      }
      return m;
    }));
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "pinned": return <Pin size={16} className="text-purple-400" />;
      case "long-term": return <Database size={16} className="text-blue-400" />;
      case "summary": return <FileText size={16} className="text-green-400" />;
      default: return <Brain size={16} className="text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case "pinned": return "Pinned Directive";
      case "long-term": return "Core Memory";
      case "summary": return "Conversation Summary";
      default: return "Memory";
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-8 lg:p-12 selection:bg-purple-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Brain className="text-purple-400" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                Neural Memory
              </h1>
              <p className="text-gray-400 mt-1">Manage system retention, directives, and conversational context.</p>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md overflow-x-auto w-full md:w-auto scrollbar-hide">
            {[
              { id: "all", label: "All Memories" },
              { id: "pinned", label: "Pinned" },
              { id: "long-term", label: "Core Data" },
              { id: "summary", label: "Summaries" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeFilter === tab.id 
                    ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search neural network..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Timeline View */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-[5.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/20 to-transparent hidden md:block" />

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredMemories.map((memory, index) => (
                <motion.div
                  layout
                  key={memory.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex flex-col md:flex-row gap-4 md:gap-8 relative group"
                >
                  {/* Date Column (Desktop) */}
                  <div className="hidden md:flex flex-col items-end w-16 shrink-0 pt-4 text-xs font-medium text-gray-500">
                    <span>{new Date(memory.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    <span className="text-[10px] opacity-70">{new Date(memory.date).getFullYear()}</span>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-[5.5rem] -translate-x-1/2 top-5 w-3 h-3 rounded-full bg-[#050505] border-2 border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] z-10" />

                  {/* Memory Card */}
                  <div className={`flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] ${
                    memory.isImportant ? "border-purple-500/30 bg-purple-500/5" : ""
                  }`}>
                    
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-black/30 rounded-lg">
                          {getTypeIcon(memory.type)}
                        </div>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {getTypeLabel(memory.type)}
                        </span>
                        {memory.isImportant && (
                          <span className="flex items-center gap-1 text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">
                            <ShieldAlert size={10} /> Critical
                          </span>
                        )}
                        <span className="md:hidden text-xs text-gray-500 ml-2">
                          {memory.date}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => togglePin(memory.id)} className="p-1.5 text-gray-400 hover:text-purple-400 hover:bg-white/10 rounded-md transition-colors" title={memory.type === "pinned" ? "Unpin" : "Pin"}>
                          <Pin size={16} className={memory.type === "pinned" ? "fill-purple-400 text-purple-400" : ""} />
                        </button>
                        <button onClick={() => startEdit(memory)} className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-white/10 rounded-md transition-colors" title="Edit">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => handleDelete(memory.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-md transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    {editingId === memory.id ? (
                      <div className="mt-2">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full bg-black/50 border border-purple-500/50 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 min-h-[80px] resize-none"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors">
                            <X size={14} /> Cancel
                          </button>
                          <button onClick={() => saveEdit(memory.id)} className="flex items-center gap-1 px-3 py-1.5 text-xs text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all">
                            <Check size={14} /> Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[15px] leading-relaxed text-gray-200">
                        {memory.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {filteredMemories.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-gray-500"
                >
                  <Brain size={48} className="mb-4 opacity-20" />
                  <p className="text-lg font-medium text-gray-400">No memories found</p>
                  <p className="text-sm">Try adjusting your filters or search query.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
