"use client";

import { Bell, Search, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Topbar() {
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
      
      <div className="flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white transition-colors"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        </motion.button>
        
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border border-slate-500/50 flex items-center justify-center cursor-pointer">
          <User size={16} className="text-slate-200" />
        </div>
      </div>
    </header>
  );
}
