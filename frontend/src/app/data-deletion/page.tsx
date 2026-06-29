import { Metadata } from "next";
import { AnimatedSection } from "../privacy/AnimatedSection";

export const metadata: Metadata = {
  title: "AgentOS User Data Deletion",
  description: "Instructions for requesting deletion of personal data from AgentOS.",
};

export default function UserDataDeletionPage() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 selection:text-blue-200">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-slate-950/70 border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              AgentOS
            </span>
          </div>
          <nav>
            <a href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
              Back to Dashboard
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-12 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

        {/* Header Section */}
        <div className="space-y-4 text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
            User Data Deletion
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium">
            Last Updated: <span className="text-slate-200">{today}</span>
          </p>
        </div>

        {/* 1. Overview */}
        <AnimatedSection delay={0.1}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">01</span>
            Overview
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            At AgentOS, you are in complete control of your digital footprint. Users can submit a formal request to completely and permanently delete their stored personal data at any time, with no hidden obligations.
          </p>
        </AnimatedSection>

        {/* 2. What Data Can Be Deleted */}
        <AnimatedSection delay={0.2}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">02</span>
            What Data Can Be Deleted
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            Upon successfully submitting a data deletion request, the following information will be completely erased from our servers:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Instagram account connection", "Conversation history", "AI memory", "Analytics", "User profile", "Access tokens", "Cached data"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-800/30 p-3 rounded-lg border border-slate-700/30">
                <svg className="w-5 h-5 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="text-slate-300 text-lg">{item}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 3. How to Request Deletion */}
        <AnimatedSection delay={0.3}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">03</span>
            How to Request Deletion
          </h2>
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30 mt-1">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-slate-200 font-semibold text-lg">Disconnect Instagram from AgentOS</h3>
                    <p className="text-slate-400">Head over to your AgentOS dashboard, navigate to the settings or connections page, and click 'Disconnect' to immediately invalidate any active connections.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/30 mt-1">
                    <span className="text-purple-400 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-slate-200 font-semibold text-lg">Send a Deletion Request</h3>
                    <p className="text-slate-400">Email our support team at <a href="mailto:support@agentos.ai" className="text-blue-400 hover:underline">support@agentos.ai</a>.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30 mt-1">
                    <span className="text-blue-400 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-slate-200 font-semibold text-lg">Include Identifiers</h3>
                    <p className="text-slate-400">Make sure to include your Instagram username and your registered AgentOS email in the email body for verification.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 4. Processing Time */}
        <AnimatedSection delay={0.4}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">04</span>
            Processing Time
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            Once your request is received and your identity is successfully verified, we will initiate the deletion protocol. Requests are typically processed and fulfilled within <strong className="text-white">30 days</strong>. You will receive an email confirmation once the process is complete.
          </p>
        </AnimatedSection>

        {/* 5. What Happens After Deletion */}
        <AnimatedSection delay={0.5}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">05</span>
            What Happens After Deletion
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            It is important to understand the consequences of initiating a complete data deletion request:
          </p>
          <ul className="list-none space-y-3 text-slate-300 text-lg">
            {[
              "Access tokens are permanently removed and API access is revoked.",
              "Your personalized AI memory matrix is completely erased.",
              "All past conversation history and dialogue context is deleted.",
              "Associated analytics and reports are removed where applicable.",
              "The action is definitive and cannot be undone."
            ].map((consequence, i) => (
              <li key={i} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {consequence}
              </li>
            ))}
          </ul>
        </AnimatedSection>

        {/* 6. Contact */}
        <AnimatedSection delay={0.6}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">06</span>
            Contact
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            If you need immediate assistance or have questions regarding our data handling policies, you can reach out directly:
          </p>
          <a href="mailto:support@agentos.ai" className="inline-flex items-center gap-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all">
            <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@agentos.ai
          </a>
        </AnimatedSection>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/50 bg-slate-950 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm font-medium">
            &copy; 2026 AgentOS. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
