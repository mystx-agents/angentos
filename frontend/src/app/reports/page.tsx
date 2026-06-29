"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Printer, FileJson, FileSpreadsheet, Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ReportsPage() {
  const [reportType, setReportType] = useState<"daily" | "weekly" | "monthly">("weekly");

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

  const mockReports = [
    { id: 1, name: "Agent Performance Summary", date: "2026-06-28", type: "PDF", size: "2.4 MB" },
    { id: 2, name: "User Interaction Logs", date: "2026-06-27", type: "CSV", size: "15.1 MB" },
    { id: 3, name: "System Resource Usage", date: "2026-06-26", type: "JSON", size: "1.2 MB" },
    { id: 4, name: "API Latency Metrics", date: "2026-06-25", type: "CSV", size: "3.5 MB" },
    { id: 5, name: "Weekly Executive Brief", date: "2026-06-24", type: "PDF", size: "1.8 MB" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Reports
          </h1>
          <p className="text-white/60 mt-1">Generate and export system reports</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => setReportType("daily")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${reportType === "daily" ? "bg-blue-500 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
          >
            Daily
          </button>
          <button 
            onClick={() => setReportType("weekly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${reportType === "weekly" ? "bg-purple-500 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setReportType("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${reportType === "monthly" ? "bg-pink-500 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-12 bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all">
          <FileText className="w-4 h-4" /> Export as PDF
        </Button>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-12 bg-white/5 hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/50 transition-all">
          <FileSpreadsheet className="w-4 h-4" /> Export as CSV
        </Button>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-12 bg-white/5 hover:bg-yellow-500/20 hover:text-yellow-400 hover:border-yellow-500/50 transition-all">
          <FileJson className="w-4 h-4" /> Export as JSON
        </Button>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-12 bg-white/5 hover:bg-purple-500/20 hover:text-purple-400 hover:border-purple-500/50 transition-all">
          <Printer className="w-4 h-4" /> Print Report
        </Button>
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Generated Reports</h2>
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
            View All <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-sm">
                <th className="pb-3 font-medium px-4">Report Name</th>
                <th className="pb-3 font-medium px-4">Date Generated</th>
                <th className="pb-3 font-medium px-4">Format</th>
                <th className="pb-3 font-medium px-4">Size</th>
                <th className="pb-3 font-medium px-4 text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {mockReports.map((report) => (
                <motion.tr 
                  key={report.id} 
                  variants={itemVariants}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 text-white font-medium flex items-center gap-3">
                    {report.type === 'PDF' && <FileText className="w-4 h-4 text-red-400" />}
                    {report.type === 'CSV' && <FileSpreadsheet className="w-4 h-4 text-green-400" />}
                    {report.type === 'JSON' && <FileJson className="w-4 h-4 text-yellow-400" />}
                    {report.name}
                  </td>
                  <td className="py-4 px-4 text-white/60 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> {report.date}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-2 py-1 rounded-md bg-white/10 ${
                      report.type === 'PDF' ? 'text-red-400' :
                      report.type === 'CSV' ? 'text-green-400' :
                      'text-yellow-400'
                    }`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/60 text-sm">{report.size}</td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20">
                      <Download className="w-4 h-4 mr-2" /> Download
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </GlassCard>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-medium text-white mb-4">Scheduled Reports</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <div>
                <p className="text-sm font-medium text-white">Weekly Performance Summary</p>
                <p className="text-xs text-white/50">Every Monday at 00:00 UTC</p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">PDF</span>
                <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">CSV</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <div>
                <p className="text-sm font-medium text-white">Daily Error Logs</p>
                <p className="text-xs text-white/50">Every day at 23:59 UTC</p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">JSON</span>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4 border-dashed border-white/20 text-white/60 hover:text-white">
            + Add Scheduled Report
          </Button>
        </GlassCard>

        <GlassCard className="p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20">
          <h3 className="text-lg font-medium text-white mb-2">Custom Report Builder</h3>
          <p className="text-sm text-white/60 mb-6">Create a highly customized report by selecting specific metrics, date ranges, and grouping options.</p>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Metrics to Include</label>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 cursor-pointer hover:bg-blue-500/40 transition-colors">Messages</span>
                <span className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 cursor-pointer hover:bg-purple-500/40 transition-colors">API Latency</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/60 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">Errors</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/60 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">Memory Usage</span>
              </div>
            </div>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
            Configure Custom Report
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}
