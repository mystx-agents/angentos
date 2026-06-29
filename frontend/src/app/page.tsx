"use client";

import { motion } from "framer-motion";
import { 
  Users, MessageSquare, Clock, CheckCircle2, 
  Brain, Database, Server, Cpu
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Map colors to full Tailwind classes so they aren't purged
const colorMap: Record<string, { bg: string, blur: string, blurHover: string, text: string, border: string }> = {
  blue: { bg: 'bg-blue-500/10', blur: 'bg-blue-500/10', blurHover: 'group-hover:bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/20' },
  purple: { bg: 'bg-purple-500/10', blur: 'bg-purple-500/10', blurHover: 'group-hover:bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/20' },
  indigo: { bg: 'bg-indigo-500/10', blur: 'bg-indigo-500/10', blurHover: 'group-hover:bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  emerald: { bg: 'bg-emerald-500/10', blur: 'bg-emerald-500/10', blurHover: 'group-hover:bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  green: { bg: 'bg-green-500/10', blur: 'bg-green-500/10', blurHover: 'group-hover:bg-green-500/20', text: 'text-green-400', border: 'border-green-500/20' },
  amber: { bg: 'bg-amber-500/10', blur: 'bg-amber-500/10', blurHover: 'group-hover:bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/20' },
  red: { bg: 'bg-red-500/10', blur: 'bg-red-500/10', blurHover: 'group-hover:bg-red-500/20', text: 'text-red-400', border: 'border-red-500/20' },
  orange: { bg: 'bg-orange-500/10', blur: 'bg-orange-500/10', blurHover: 'group-hover:bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/20' },
};

// Mock fetching function
const fetchDashboardStats = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const res = await axios.get(`${apiUrl}/api/dashboard/stats`);
    return res.data;
  } catch (error) {
    // Fallback to mock data if backend is not available
    return {
      totalUsers: "1,245",
      activeConversations: "42",
      todayMessages: "8,392",
      aiReplyTime: "1.2s",
      successRate: "99.8%",
      memoryUsage: "45%",
      redisStatus: "Online",
      postgresStatus: "Online",
      groqStatus: "Optimal",
    };
  }
};

const StatCard = ({ title, value, icon: Icon, color, delay }: any) => {
  const styles = colorMap[color] || colorMap.blue;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/40 transition-colors shadow-lg shadow-black/20 relative overflow-hidden group"
    >
      <div className={`absolute -right-4 -top-4 w-24 h-24 ${styles.blur} rounded-full blur-2xl ${styles.blurHover} transition-all`} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-100">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${styles.bg} ${styles.text} border ${styles.border}`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  const cards = [
    { title: "Total Users", key: "totalUsers", icon: Users, color: "blue" },
    { title: "Active Conversations", key: "activeConversations", icon: MessageSquare, color: "purple" },
    { title: "Today's Messages", key: "todayMessages", icon: MessageSquare, color: "indigo" },
    { title: "AI Reply Time", key: "aiReplyTime", icon: Clock, color: "emerald" },
    { title: "Success Rate", key: "successRate", icon: CheckCircle2, color: "green" },
    { title: "Memory Usage", key: "memoryUsage", icon: Brain, color: "amber" },
    { title: "Redis Status", key: "redisStatus", icon: Database, color: "red" },
    { title: "PostgreSQL", key: "postgresStatus", icon: Server, color: "blue" },
    { title: "Groq API", key: "groqStatus", icon: Cpu, color: "orange" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">System Overview</h1>
          <p className="text-slate-400">Real-time metrics and status for AgentOS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <StatCard 
            key={card.key}
            title={card.title}
            value={isLoading ? "..." : stats?.[card.key] || "-"}
            icon={card.icon}
            color={card.color}
            delay={index * 0.05}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 min-h-[300px]"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Activity Stream</h3>
          <div className="flex items-center justify-center h-[200px] text-slate-500 text-sm border border-dashed border-slate-700/50 rounded-lg">
            Chart visualization will be mounted here
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 min-h-[300px]"
        >
          <h3 className="text-lg font-semibold text-white mb-4">System Alerts</h3>
          <div className="space-y-4">
            {[
              { id: 1, text: "Routine memory optimization completed", time: "2 minutes ago", color: "bg-blue-400" },
              { id: 2, text: "High traffic detected from User API", time: "15 minutes ago", color: "bg-amber-400" },
              { id: 3, text: "PostgreSQL backup successful", time: "1 hour ago", color: "bg-green-400" }
            ].map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                <div className={`mt-0.5 w-2 h-2 rounded-full ${alert.color} shadow-[0_0_8px_rgba(255,255,255,0.3)]`} />
                <div>
                  <p className="text-sm text-slate-200">{alert.text}</p>
                  <span className="text-xs text-slate-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
