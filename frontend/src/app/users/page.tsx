import React from "react";
import { Users as UsersIcon, Search, Filter } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <UsersIcon className="text-blue-400" />
            Users Management
          </h1>
          <p className="text-slate-400 mt-1">Manage all registered AgentOS users and Instagram contacts.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition">
            <Filter size={18} className="text-slate-300" />
          </button>
        </div>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/30 text-slate-400 text-sm">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Messages</th>
                <th className="p-4 font-medium">Last Active</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {[
                { name: "John Doe", handle: "@johndoe", status: "Active", messages: 142, active: "2 mins ago" },
                { name: "Alice Smith", handle: "@alice", status: "Active", messages: 89, active: "1 hr ago" },
                { name: "Bob Johnson", handle: "@bob", status: "Offline", messages: 12, active: "1 day ago" },
                { name: "Emma Wilson", handle: "@emma", status: "Active", messages: 432, active: "Just now" },
              ].map((user, i) => (
                <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-800/20 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-200">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      user.status === 'Active' 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                      : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 font-medium">{user.messages}</td>
                  <td className="p-4 text-slate-400 text-sm">{user.active}</td>
                  <td className="p-4">
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition">View</button>
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
