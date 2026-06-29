import React from "react";
import { Star, Crown, TrendingUp } from "lucide-react";

export default function VipUsersPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Star className="text-yellow-400" />
            VIP Users
          </h1>
          <p className="text-slate-400 mt-1">High-value interactions and top-tier relationship scores.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total VIPs", value: "24", icon: Crown, color: "text-yellow-400", bg: "bg-yellow-400/10" },
          { label: "Avg VIP Score", value: "94.5", icon: Star, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "VIP Conversion", value: "+12%", icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" }
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

      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/30 text-slate-400 text-sm">
                <th className="p-4 font-medium">VIP User</th>
                <th className="p-4 font-medium">Relationship Score</th>
                <th className="p-4 font-medium">Messages</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {[
                { name: "Elon Musk", handle: "@elon", score: 99, messages: 1240 },
                { name: "Tech Guru", handle: "@tech", score: 95, messages: 840 },
                { name: "Crypto Whale", handle: "@whale", score: 92, messages: 512 },
              ].map((user, i) => (
                <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-800/20 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(250,204,21,0.4)]">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-200 flex items-center gap-1">
                          {user.name} <Crown size={12} className="text-yellow-400" />
                        </div>
                        <div className="text-xs text-slate-500">{user.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">{user.score}</span>
                      <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400" style={{ width: `${user.score}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300 font-medium">{user.messages}</td>
                  <td className="p-4">
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition">View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
