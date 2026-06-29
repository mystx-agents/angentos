import React from "react";
import { Server, Cpu, HardDrive, Network, Database } from "lucide-react";

export default function SystemPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Server className="text-blue-400" />
            System Resources
          </h1>
          <p className="text-slate-400 mt-1">Live monitoring of servers, memory, and database health.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "CPU Usage", value: "32%", icon: Cpu, color: "text-green-400", bg: "bg-green-400/10" },
          { label: "RAM Usage", value: "2.4 GB", icon: HardDrive, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Network I/O", value: "45 MB/s", icon: Network, color: "text-purple-400", bg: "bg-purple-400/10" },
          { label: "Database Load", value: "14%", icon: Database, color: "text-emerald-400", bg: "bg-emerald-400/10" }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-xl flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Infrastructure Status</h2>
        <div className="space-y-4">
          {[
            { service: "PostgreSQL Database", status: "Healthy", uptime: "99.99%" },
            { service: "Redis Cache Layer", status: "Healthy", uptime: "100%" },
            { service: "Agent Brain API", status: "Healthy", uptime: "99.98%" },
            { service: "Meta Webhook Listener", status: "Healthy", uptime: "100%" },
            { service: "Groq LLM Connection", status: "Degraded", uptime: "98.5%" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
              <span className="text-slate-200 font-medium">{item.service}</span>
              <div className="flex items-center gap-6">
                <span className="text-slate-400 text-sm">{item.uptime}</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                  item.status === 'Healthy' 
                  ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                  : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
