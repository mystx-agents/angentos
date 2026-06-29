"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Activity, BarChart2, TrendingUp, Users, Clock, Smile, MessageCircle } from "lucide-react";

export default function AnalyticsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const mockWeeklyData = [
    { day: "Mon", value: 120 },
    { day: "Tue", value: 150 },
    { day: "Wed", value: 110 },
    { day: "Thu", value: 180 },
    { day: "Fri", value: 240 },
    { day: "Sat", value: 310 },
    { day: "Sun", value: 280 }
  ];

  const mockTones = [
    { label: "Funny", value: 45, color: "bg-purple-500" },
    { label: "Casual", value: 30, color: "bg-blue-400" },
    { label: "Emotional", value: 15, color: "bg-pink-500" },
    { label: "Professional", value: 5, color: "bg-cyan-500" },
    { label: "Craze", value: 5, color: "bg-indigo-500" },
  ];

  const mockActiveHours = [
    { hour: "12am", value: 10 }, { hour: "4am", value: 5 }, { hour: "8am", value: 30 },
    { hour: "12pm", value: 60 }, { hour: "4pm", value: 80 }, { hour: "8pm", value: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Analytics
          </h1>
          <p className="text-white/60 mt-1">Deep dive into agent performance and interactions</p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <GlassCard className="p-6" variants={itemVariants}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/60 text-sm">Messages/Day</p>
              <h3 className="text-2xl font-bold text-white mt-1">1,245</h3>
              <p className="text-emerald-400 text-xs mt-2 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> +12% from last week
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
              <MessageCircle className="w-5 h-5" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6" variants={itemVariants}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/60 text-sm">Avg. Reply Speed</p>
              <h3 className="text-2xl font-bold text-white mt-1">1.2s</h3>
              <p className="text-emerald-400 text-xs mt-2 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> -0.3s from last week
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6" variants={itemVariants}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/60 text-sm">Active Users</p>
              <h3 className="text-2xl font-bold text-white mt-1">432</h3>
              <p className="text-emerald-400 text-xs mt-2 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> +24 new today
              </p>
            </div>
            <div className="p-3 rounded-xl bg-pink-500/20 text-pink-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6" variants={itemVariants}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/60 text-sm">Relationship Growth</p>
              <h3 className="text-2xl font-bold text-white mt-1">High</h3>
              <p className="text-white/40 text-xs mt-2 flex items-center">
                Based on sentiment analysis
              </p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Smile className="w-5 h-5" />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2 text-blue-400" />
            Messages Over Last 7 Days
          </h3>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {mockWeeklyData.map((data, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.value / 310) * 100}%` }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                  className="w-full max-w-[40px] bg-gradient-to-t from-blue-500/40 to-blue-400 rounded-t-md relative group-hover:from-blue-500/60 group-hover:to-blue-300 transition-colors"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-xs px-2 py-1 rounded text-white whitespace-nowrap">
                    {data.value} msgs
                  </div>
                </motion.div>
                <span className="text-xs text-white/60 mt-3">{data.day}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-purple-400" />
            Personality Breakdown (%)
          </h3>
          <div className="space-y-4 mt-8">
            {mockTones.map((tone, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/80">{tone.label}</span>
                  <span className="text-white font-medium">{tone.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${tone.value}%` }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 1 }}
                    className={`h-full ${tone.color} rounded-full shadow-[0_0_10px_currentColor]`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-cyan-400" />
            Most Active Hours
          </h3>
          <div className="h-48 flex items-end justify-between gap-2 px-2 mt-4">
            {mockActiveHours.map((data, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.value / 100) * 100}%` }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                  className="w-full max-w-[30px] bg-gradient-to-t from-purple-500/40 to-purple-400 rounded-t-md relative group-hover:from-purple-500/60 group-hover:to-purple-300 transition-colors"
                />
                <span className="text-xs text-white/60 mt-3">{data.hour}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
            Trend Analysis
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <h4 className="text-sm font-medium text-white mb-2">Rising Engagement</h4>
              <p className="text-xs text-white/60">Users are responding 20% faster to messages tagged with 'Funny' or 'Casual' tones.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <h4 className="text-sm font-medium text-white mb-2">Peak Times Shift</h4>
              <p className="text-xs text-white/60">Most active hours have shifted from 6pm to 8pm over the last 30 days.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <h4 className="text-sm font-medium text-white mb-2">Relationship Growth</h4>
              <p className="text-xs text-white/60">Consistent daily interaction users show a 40% increase in emotional depth metrics.</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
