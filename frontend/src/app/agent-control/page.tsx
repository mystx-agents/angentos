"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Play, Square, RotateCw, Pause, Activity, 
  Cpu, MemoryStick, Clock, AlertTriangle, 
  Zap, Server, Layers, Trash2
} from "lucide-react";

export default function AgentControlPage() {
  const [status, setStatus] = useState<"running" | "stopped" | "paused">("running");
  const [isRepliesPaused, setIsRepliesPaused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusColor = () => {
    switch (status) {
      case "running": return "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]";
      case "stopped": return "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]";
      case "paused": return "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "running": return "Online & Active";
      case "stopped": return "Offline";
      case "paused": return "Paused (Processing Queue Only)";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 flex items-center gap-3">
            AI Control Center
          </h1>
          <p className="text-white/60 mt-1">Command and monitor the AgentOS core</p>
        </div>
        
        <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 mr-4">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
            <span className="text-sm font-medium text-white">{getStatusText()}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
            className="h-8 w-8 p-0 text-white/60 hover:text-white rounded-full bg-white/5"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Section */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="p-6">
            <h2 className="text-lg font-medium text-white mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Core Actions
            </h2>
            
            <div className="space-y-3">
              <Button 
                onClick={() => setStatus("running")}
                disabled={status === "running"}
                className={`w-full justify-start ${status === "running" ? "opacity-50 cursor-not-allowed" : "hover:bg-emerald-500/20 hover:text-emerald-400"}`}
                variant="outline"
              >
                <Play className="w-4 h-4 mr-3" /> Start Agent
              </Button>
              <Button 
                onClick={() => setStatus("stopped")}
                disabled={status === "stopped"}
                className={`w-full justify-start ${status === "stopped" ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500/20 hover:text-red-400"}`}
                variant="outline"
              >
                <Square className="w-4 h-4 mr-3" /> Stop Agent
              </Button>
              <Button 
                onClick={() => {
                  setStatus("stopped");
                  setTimeout(() => setStatus("running"), 1500);
                }}
                className="w-full justify-start hover:bg-blue-500/20 hover:text-blue-400"
                variant="outline"
              >
                <RotateCw className="w-4 h-4 mr-3" /> Restart Agent
              </Button>
            </div>
            
            <div className="my-6 border-t border-white/10" />
            
            <h3 className="text-sm font-medium text-white/80 mb-4">Queue Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Pause Replies</p>
                  <p className="text-xs text-white/50">Stop sending outbound messages</p>
                </div>
                <Switch 
                  checked={isRepliesPaused} 
                  onCheckedChange={setIsRepliesPaused} 
                />
              </div>
              <Button 
                variant="outline"
                className="w-full justify-start text-red-400 hover:bg-red-500/20 hover:text-red-300 border-red-500/30"
              >
                <Trash2 className="w-4 h-4 mr-3" /> Clear Queue
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
            <h2 className="text-lg font-medium text-white mb-4">Current Task</h2>
            <div className="bg-black/40 p-4 rounded-lg border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <motion.div 
                  className="h-full bg-blue-500"
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                />
              </div>
              <p className="text-blue-400 font-mono text-sm mb-1">ID: TASK-8924</p>
              <p className="text-white font-medium">Processing sentiment queue</p>
              <p className="text-white/60 text-xs mt-2">Started 4m 12s ago</p>
            </div>
          </GlassCard>
        </div>

        {/* Stats Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <GlassCard className="p-5 flex items-center">
              <div className="p-3 bg-blue-500/20 rounded-xl mr-4">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Queue Length</p>
                <p className="text-2xl font-bold text-white">42 <span className="text-sm font-normal text-white/40">msgs</span></p>
              </div>
            </GlassCard>
            
            <GlassCard className="p-5 flex items-center">
              <div className="p-3 bg-purple-500/20 rounded-xl mr-4">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Uptime</p>
                <p className="text-2xl font-bold text-white">14d 6h 22m</p>
              </div>
            </GlassCard>
            
            <GlassCard className="p-5 flex items-center">
              <div className="p-3 bg-emerald-500/20 rounded-xl mr-4">
                <Activity className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Groq API Latency</p>
                <p className="text-2xl font-bold text-white">342 <span className="text-sm font-normal text-white/40">ms</span></p>
              </div>
            </GlassCard>
            
            <GlassCard className="p-5 flex items-center">
              <div className="p-3 bg-red-500/20 rounded-xl mr-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Error Rate (24h)</p>
                <p className="text-2xl font-bold text-white">0.04 <span className="text-sm font-normal text-white/40">%</span></p>
              </div>
            </GlassCard>
          </div>

          <GlassCard className="p-6">
            <h2 className="text-lg font-medium text-white mb-6 flex items-center">
              <Server className="w-5 h-5 mr-2 text-cyan-400" />
              System Resources
            </h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80 flex items-center gap-2"><Cpu className="w-4 h-4 text-white/50" /> CPU Usage</span>
                  <span className="text-white font-mono">42%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '42%' }}
                    className="h-full bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80 flex items-center gap-2"><MemoryStick className="w-4 h-4 text-white/50" /> RAM Usage (Agent)</span>
                  <span className="text-white font-mono">1.2 GB / 4.0 GB (30%)</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '30%' }}
                    className="h-full bg-purple-400 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80 flex items-center gap-2"><Zap className="w-4 h-4 text-white/50" /> Total Groq Requests (Today)</span>
                  <span className="text-white font-mono">14,239</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-400 w-[60%]" title="Success" />
                  <div className="h-full bg-yellow-400 w-[2%]" title="Warnings" />
                  <div className="h-full bg-red-400 w-[1%]" title="Errors" />
                </div>
                <div className="flex gap-4 mt-2 text-xs text-white/40">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400"/> Success (97%)</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400"/> Rate Limited (2%)</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"/> Failed (1%)</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
