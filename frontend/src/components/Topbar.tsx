"use client";

import { Bell, Search, User, LogIn, LogOut, FileText, Shield, UserX, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/40 backdrop-blur-xl border-b border-slate-700/50 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4 flex-1 md:ml-0 ml-12">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search systems, agents, logs..." 
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all placeholder:text-slate-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
            className="relative p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-3 border-b border-slate-700 bg-slate-800/50">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-3 border-b border-slate-700/50 hover:bg-slate-700/30 transition cursor-pointer">
                    <p className="text-sm text-slate-200">System deployment successful!</p>
                    <p className="text-xs text-slate-500 mt-1">2 mins ago</p>
                  </div>
                  <div className="p-3 border-b border-slate-700/50 hover:bg-slate-700/30 transition cursor-pointer">
                    <p className="text-sm text-slate-200">VIP User @elon sent a new message.</p>
                    <p className="text-xs text-slate-500 mt-1">10 mins ago</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="relative">
          <div 
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
            className="h-8 w-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border border-slate-500/50 flex items-center justify-center cursor-pointer hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition"
          >
            <User size={16} className="text-slate-200" />
          </div>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-3 border-b border-slate-700 bg-slate-800/50 flex flex-col">
                  <span className="text-sm font-bold text-white">Admin User</span>
                  <span className="text-xs text-slate-400">admin@agentos.ai</span>
                </div>
                <div className="py-2">
                  <Link href="/auth/login" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition">
                    <LogIn size={16} /> Login
                  </Link>
                  <Link href="/auth/register" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition">
                    <UserCheck size={16} /> Register
                  </Link>
                  <div className="h-px bg-slate-700 my-1" />
                  <Link href="/terms" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition">
                    <FileText size={16} /> Terms of Service
                  </Link>
                  <Link href="/privacy" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition">
                    <Shield size={16} /> Privacy Policy
                  </Link>
                  <Link href="/data-deletion" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition">
                    <UserX size={16} /> Data Deletion
                  </Link>
                  <div className="h-px bg-slate-700 my-1" />
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
