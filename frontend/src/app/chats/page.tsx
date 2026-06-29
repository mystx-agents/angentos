"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Pin, MessageSquare, Bot, Clock, Check, CheckCheck, Edit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock Data for Chats
const MOCK_CHATS = [
  {
    id: "1",
    name: "System AI",
    avatar: "S",
    lastMessage: "System optimization completed successfully.",
    timestamp: "10:23 AM",
    unread: 2,
    isPinned: true,
    isOnline: true,
    isTyping: false,
    isAiReply: true,
    status: "read",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    avatar: "SJ",
    lastMessage: "Can we review the deployment logs?",
    timestamp: "09:45 AM",
    unread: 0,
    isPinned: true,
    isOnline: true,
    isTyping: true,
    isAiReply: false,
    status: "delivered",
  },
  {
    id: "3",
    name: "Code Copilot",
    avatar: "C",
    lastMessage: "I've refactored the auth module. Take a look.",
    timestamp: "Yesterday",
    unread: 5,
    isPinned: false,
    isOnline: true,
    isTyping: false,
    isAiReply: true,
    status: "sent",
  },
  {
    id: "4",
    name: "Project Titan Team",
    avatar: "PT",
    lastMessage: "Alex: The new UI looks stunning!",
    timestamp: "Yesterday",
    unread: 0,
    isPinned: false,
    isOnline: false,
    isTyping: false,
    isAiReply: false,
    status: "read",
  },
  {
    id: "5",
    name: "Data Analyzer",
    avatar: "D",
    lastMessage: "Report generation failed. Missing parameters.",
    timestamp: "Tuesday",
    unread: 1,
    isPinned: false,
    isOnline: true,
    isTyping: false,
    isAiReply: true,
    status: "read",
  },
];

export default function ChatsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredChats = MOCK_CHATS.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedChats = filteredChats.filter((chat) => chat.isPinned);
  const unpinnedChats = filteredChats.filter((chat) => !chat.isPinned);

  const renderChatItem = (chat: typeof MOCK_CHATS[0]) => (
    <motion.div
      key={chat.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => router.push(`/chats/${chat.id}`)}
      className="relative flex items-center p-4 cursor-pointer rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group mb-3 backdrop-blur-md"
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]">
        {chat.avatar}
        {chat.isOnline && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-[#0a0a0a] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
        )}
      </div>

      {/* Chat Details */}
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-white font-medium truncate flex items-center gap-2">
            {chat.name}
            {chat.isAiReply && (
              <Bot size={14} className="text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]" />
            )}
          </h3>
          <span className="text-xs text-gray-400 whitespace-nowrap ml-2 flex items-center gap-1">
            <Clock size={12} />
            {chat.timestamp}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400 truncate flex-1 mr-4">
            {chat.isTyping ? (
              <span className="text-blue-400 italic flex items-center gap-1 animate-pulse">
                <Edit size={14} /> typing...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                {chat.status === "read" && <CheckCheck size={14} className="text-blue-400" />}
                {chat.status === "delivered" && <CheckCheck size={14} className="text-gray-500" />}
                {chat.status === "sent" && <Check size={14} className="text-gray-500" />}
                <span className="truncate">{chat.lastMessage}</span>
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {chat.isPinned && (
              <Pin size={14} className="text-purple-400 drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]" />
            )}
            {chat.unread > 0 && (
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold shadow-[0_0_10px_rgba(37,99,235,0.8)]">
                {chat.unread}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-8 lg:p-12 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-2 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              Messages
            </h1>
            <p className="text-gray-400">Connect with your AI agents and team members.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
            />
          </div>
        </motion.div>

        {/* Chat List */}
        <div className="space-y-8">
          <AnimatePresence>
            {pinnedChats.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-purple-400">
                  <Pin size={16} />
                  PINNED
                </div>
                <div className="space-y-2">
                  {pinnedChats.map(renderChatItem)}
                </div>
              </motion.div>
            )}

            {unpinnedChats.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-400 mt-6">
                  <MessageSquare size={16} />
                  ALL CONVERSATIONS
                </div>
                <div className="space-y-2">
                  {unpinnedChats.map(renderChatItem)}
                </div>
              </motion.div>
            )}

            {filteredChats.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-gray-500"
              >
                <Bot size={48} className="mx-auto mb-4 opacity-20" />
                <p>No conversations found matching "{searchQuery}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
