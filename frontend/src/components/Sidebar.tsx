"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, MessageSquare, Users, Brain, 
  BarChart, FileText, Star, Settings, 
  TerminalSquare, Cpu, Server, Menu, X
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chats", label: "Chats", icon: MessageSquare },
  { href: "/users", label: "Users", icon: Users },
  { href: "/memory", label: "Memory", icon: Brain },
  { href: "/analytics", label: "Analytics", icon: BarChart },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/vip", label: "VIP Users", icon: Star },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/logs", label: "Logs", icon: TerminalSquare },
  { href: "/agent-control", label: "AI Agent Control", icon: Cpu },
  { href: "/system", label: "System", icon: Server },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-lg text-slate-300 shadow-lg">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={`
              fixed md:sticky top-0 left-0 z-40 h-screen w-64
              bg-slate-900/60 backdrop-blur-2xl border-r border-slate-700/50
              flex flex-col flex-shrink-0 text-slate-300 shadow-2xl shadow-blue-900/20
            `}
          >
            <div className="p-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                OS
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                AgentOS
              </h1>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-hide">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link key={item.href} href={item.href} onClick={() => isMobile && setIsOpen(false)}>
                    <div className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]' 
                        : 'hover:bg-slate-800/50 hover:text-slate-100'}
                    `}>
                      <Icon size={18} className={isActive ? "text-blue-400" : "text-slate-400"} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-4 mt-auto">
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 shadow-inner">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
                  <span className="text-xs text-slate-400 font-medium">System Online</span>
                </div>
                <div className="text-xs text-slate-500">v1.0.0-beta</div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
