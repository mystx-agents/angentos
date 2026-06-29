import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentOS | Core System",
  description: "AI Operating System Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0f1c] text-slate-200 selection:bg-blue-500/30 selection:text-blue-200 min-h-screen flex`}>
        <Providers>
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0a0f1c]/50 relative">
              {/* Background glowing effects */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto w-full h-full">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
