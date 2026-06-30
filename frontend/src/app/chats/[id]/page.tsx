"use client";

export const runtime = 'edge';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Info, Send, Paperclip, Mic, 
  Bot, User, Clock, Heart, BrainCircuit, 
  Activity, Star, Zap, Smile, Briefcase, 
  Flame, Pin, Calendar, X
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Data
const MOCK_MESSAGES = [
  { id: 1, sender: "ai", text: "Hello! System systems are fully operational. How can I assist you today?", time: "10:00 AM" },
  { id: 2, sender: "user", text: "Can you analyze the recent deployment logs for the frontend?", time: "10:05 AM" },
  { id: 3, sender: "ai", text: "Analyzing logs now...", time: "10:05 AM", isTyping: false },
  { id: 4, sender: "ai", text: "The logs indicate a smooth deployment. However, there was a minor latency spike during the initial bundle load. I recommend lazy loading the heavy charting libraries.", time: "10:07 AM" },
  { id: 5, sender: "user", text: "Good catch. Let's create a memory for that so we don't forget.", time: "10:08 AM" },
  { id: 6, sender: "ai", text: "I've pinned a new memory: 'Lazy load charting libraries to reduce initial bundle latency.'", time: "10:10 AM" },
];

const MOCK_SIDEBAR_DATA = {
  relationshipScore: 92,
  stats: {
    funny: 15,
    casual: 30,
    emotional: 5,
    professional: 45,
    craze: 5,
  },
  lastInteraction: "2 mins ago",
  avgReplyTime: "1.2s",
  pinnedMemories: [
    "Lazy load charting libraries",
    "User prefers dark mode UI",
  ],
  importantMemories: [
    "Project Titan deadline: Aug 15",
    "API Key rotated on Jun 1st",
  ]
};

export default function ChatConversationPage() {
  const params = useParams();
  const chatId = params?.id;
  
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const wsUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace("http", "ws") + "/ws";
    const ws = new WebSocket(wsUrl);
    
    ws.onmessage = (event) => {
      try {
        const newMsg = JSON.parse(event.data);
        if (newMsg.sender === "ai") {
          setMessages(prev => {
            // Remove typing indicator if exists
            const filtered = prev.filter(m => !m.isTyping);
            return [...filtered, newMsg];
          });
        }
      } catch (e) {
        console.error("Failed to parse websocket message", e);
      }
    };

    return () => ws.close();
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "user",
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInputValue("");
    
    // Simulate AI typing
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      sender: "ai",
      text: "I am processing your request...",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTyping: true
    }]);

    // Send real request to backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    // Retrieve token from Zustand persist storage manually since we're in an event handler or use the hook
    let token = "";
    try {
      const storage = localStorage.getItem("agentos-auth-storage");
      if (storage) {
        token = JSON.parse(storage).state?.token || "";
      }
    } catch(e) {}

    fetch(`${apiUrl}/api/messages/chat`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ content: inputValue })
    }).catch(err => {
      console.error("Chat API error:", err);
      // Remove typing indicator on error
      setMessages(prev => prev.filter(m => !m.isTyping));
    });
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col h-full transition-all duration-300 ${isSidebarOpen ? 'mr-0 lg:mr-80' : ''}`}>
        
        {/* Chat Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-white/10 bg-white/5 backdrop-blur-md z-10 shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/chats" className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={20} className="text-gray-400 hover:text-white" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-semibold shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                AI
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a0a] rounded-full" />
              </div>
              <div>
                <h2 className="font-medium text-white flex items-center gap-2">
                  System AI
                  <Bot size={14} className="text-blue-400" />
                </h2>
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-full transition-colors ${isSidebarOpen ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/10 text-gray-400'}`}
          >
            <Info size={20} />
          </button>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide">
          <div className="text-center my-6">
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-500 border border-white/5">
              Today
            </span>
          </div>
          
          {messages.map((msg, index) => {
            const isUser = msg.sender === "user";
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isUser ? "justify-end" : "justify-start"} group`}
              >
                <div className={`flex max-w-[85%] md:max-w-[70%] ${isUser ? "flex-row-reverse" : "flex-row"} gap-3`}>
                  
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-auto ${
                    isUser ? "bg-gray-800" : "bg-gradient-to-br from-blue-600 to-purple-600 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                  }`}>
                    {isUser ? <User size={14} className="text-gray-300" /> : <Bot size={14} className="text-white" />}
                  </div>
                  
                  <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                    <div className={`px-4 py-3 rounded-2xl relative ${
                      isUser 
                        ? "bg-blue-600 text-white rounded-br-none shadow-[0_0_15px_rgba(37,99,235,0.2)]" 
                        : "bg-white/10 text-gray-100 rounded-bl-none border border-white/5 backdrop-blur-sm"
                    }`}>
                      {msg.isTyping ? (
                        <div className="flex gap-1 items-center h-5">
                          <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                          <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                          <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                        </div>
                      ) : (
                        <p className="text-[15px] leading-relaxed break-words">{msg.text}</p>
                      )}
                    </div>
                    
                    <span className="text-[11px] text-gray-500 mt-1.5 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {msg.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[#0a0a0a] border-t border-white/10 shrink-0">
          <form 
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-full p-1.5 pl-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 transition-all"
          >
            <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10">
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 py-2 focus:outline-none text-[15px]"
            />
            <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10">
              <Mic size={18} />
            </button>
            <button 
              type="submit" 
              disabled={!inputValue.trim()}
              className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-80 h-full bg-[#0a0a0a]/95 border-l border-white/10 z-30 shadow-2xl backdrop-blur-xl flex flex-col"
          >
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <BrainCircuit size={18} className="text-purple-400" />
                Intelligence Profile
              </h3>
              <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 transition-colors lg:hidden">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              
              {/* Relationship Score */}
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center mb-2">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
                    <circle 
                      cx="48" cy="48" r="40" 
                      stroke="url(#gradient)" 
                      strokeWidth="6" fill="none" 
                      strokeDasharray="251.2" 
                      strokeDashoffset={251.2 - (251.2 * MOCK_SIDEBAR_DATA.relationshipScore) / 100} 
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{MOCK_SIDEBAR_DATA.relationshipScore}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Score</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-white flex items-center justify-center gap-1.5">
                  <Heart size={14} className="text-pink-500" />
                  Relationship Harmony
                </h4>
              </div>

              {/* Interaction Stats */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Activity size={14} /> Tone Analysis
                </h4>
                <div className="space-y-3">
                  {[
                    { label: "Professional", val: MOCK_SIDEBAR_DATA.stats.professional, icon: Briefcase, color: "bg-blue-500" },
                    { label: "Casual", val: MOCK_SIDEBAR_DATA.stats.casual, icon: Smile, color: "bg-green-500" },
                    { label: "Funny", val: MOCK_SIDEBAR_DATA.stats.funny, icon: Star, color: "bg-yellow-500" },
                    { label: "Emotional", val: MOCK_SIDEBAR_DATA.stats.emotional, icon: Heart, color: "bg-pink-500" },
                    { label: "Craze", val: MOCK_SIDEBAR_DATA.stats.craze, icon: Flame, color: "bg-red-500" },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300 flex items-center gap-1.5">
                          <stat.icon size={12} className="opacity-70" /> {stat.label}
                        </span>
                        <span className="text-white font-medium">{stat.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.val}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`h-full ${stat.color} shadow-[0_0_8px_currentColor]`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                  <Calendar size={14} className="text-blue-400 mb-2" />
                  <div className="text-xs text-gray-400">Last Seen</div>
                  <div className="text-sm font-medium text-white truncate">{MOCK_SIDEBAR_DATA.lastInteraction}</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                  <Zap size={14} className="text-yellow-400 mb-2" />
                  <div className="text-xs text-gray-400">Avg Reply</div>
                  <div className="text-sm font-medium text-white">{MOCK_SIDEBAR_DATA.avgReplyTime}</div>
                </div>
              </div>

              {/* Memories */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Pin size={14} className="text-purple-400" /> Pinned Memories
                </h4>
                <div className="space-y-2">
                  {MOCK_SIDEBAR_DATA.pinnedMemories.map((mem, i) => (
                    <div key={i} className="text-sm bg-purple-500/10 border border-purple-500/20 text-purple-100 p-2.5 rounded-lg flex gap-2">
                      <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      {mem}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <BrainCircuit size={14} className="text-blue-400" /> Core Directives
                </h4>
                <div className="space-y-2">
                  {MOCK_SIDEBAR_DATA.importantMemories.map((mem, i) => (
                    <div key={i} className="text-sm bg-white/5 border border-white/10 text-gray-300 p-2.5 rounded-lg flex gap-2">
                      <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {mem}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
