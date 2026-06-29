"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function AnimatedSection({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] transition-shadow duration-500 ${className}`}
    >
      {children}
    </motion.section>
  );
}
