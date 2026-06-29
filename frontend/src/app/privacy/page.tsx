import { Metadata } from "next";
import { AnimatedSection } from "./AnimatedSection";

export const metadata: Metadata = {
  title: "AgentOS Privacy Policy",
  description: "Privacy Policy for AgentOS AI Instagram Management Platform.",
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium">
            Last Updated: <span className="text-slate-200">{today}</span>
          </p>
        </div>

        {/* 1. Introduction */}
        <AnimatedSection delay={0.1}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">01</span>
            Introduction
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            Welcome to AgentOS. We operate an AI-powered Instagram management platform designed to help professionals and creators seamlessly manage, analyze, and engage with their audience. This Privacy Policy explains how we collect, use, and protect your data when you use our services.
          </p>
        </AnimatedSection>

        {/* 2. Information We Collect */}
        <AnimatedSection delay={0.2}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">02</span>
            Information We Collect
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            To provide our services effectively, we collect the following types of information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 text-lg ml-4 marker:text-purple-500">
            <li>Instagram account information</li>
            <li>Public profile information</li>
            <li>Conversation metadata</li>
            <li>Analytics</li>
            <li>User settings</li>
            <li>Login information</li>
            <li>Access tokens (encrypted)</li>
          </ul>
          <div className="mt-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-start gap-3">
            <svg className="w-6 h-6 text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-slate-200 font-medium text-lg">
              Important: We never store your passwords. Authentication is handled securely through official OAuth flows.
            </p>
          </div>
        </AnimatedSection>

        {/* 3. How We Use Information */}
        <AnimatedSection delay={0.3}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">03</span>
            How We Use Information
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            The data we collect is strictly used to improve and operate the AgentOS ecosystem, including:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["AI replies", "Conversation memory", "Analytics", "Dashboard", "Notifications", "Security", "Performance improvements"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-800/30 p-3 rounded-lg border border-slate-700/30">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                <span className="text-slate-300 text-lg">{item}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 4. Data Security */}
        <AnimatedSection delay={0.4}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">04</span>
            Data Security
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            Security is deeply embedded into our architecture. We employ state-of-the-art mechanisms to ensure your data remains protected:
          </p>
          <ul className="list-none space-y-3 text-slate-300 text-lg">
            {[
              "AES/Fernet encryption for all sensitive tokens",
              "HTTPS forced across all internal and external communications",
              "Secure authentication",
              "JWT (JSON Web Tokens) for session management",
              "Strict role-based access control",
              "Regular security updates and vulnerability patching"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-purple-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </AnimatedSection>

        {/* 5. Instagram API Compliance */}
        <AnimatedSection delay={0.5}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">05</span>
            Instagram API Compliance
          </h2>
          <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-6">
            <p className="text-slate-200 leading-relaxed text-lg mb-4 font-semibold">
              AgentOS strictly operates within the boundaries of Meta's Developer Policies.
            </p>
            <ul className="space-y-3 text-slate-300 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span> AgentOS only uses Meta's Official Instagram Graph API.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span> No scraping.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span> No automation outside Meta policies.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span> No password collection.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span> No bypassing Instagram security.
              </li>
            </ul>
          </div>
        </AnimatedSection>

        {/* 6. Third-Party Services */}
        <AnimatedSection delay={0.6}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">06</span>
            Third-Party Services
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            We partner with reliable third-party infrastructure and service providers to deliver the AgentOS experience:
          </p>
          <div className="flex flex-wrap gap-3">
            {["Meta", "Groq", "PostgreSQL", "Redis", "Railway", "Vercel"].map((service) => (
              <span key={service} className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm font-medium">
                {service}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* 7. Data Retention */}
        <AnimatedSection delay={0.7}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">07</span>
            Data Retention
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            We retain your data only for as long as your account is active or as needed to provide you services. Users maintain full control over their data footprint and may request complete deletion of their stored data at any time through their account settings or by contacting our support team.
          </p>
        </AnimatedSection>

        {/* 8. User Rights */}
        <AnimatedSection delay={0.8}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">08</span>
            User Rights
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            As a user of AgentOS, you possess the following rights regarding your data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Request deletion", desc: "Permanently erase your data." },
              { title: "Export data", desc: "Download a copy of your information." },
              { title: "Disconnect Instagram", desc: "Revoke API access instantly." },
              { title: "Contact support", desc: "Reach out for data inquiries." }
            ].map((right, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <h3 className="text-slate-200 font-semibold text-lg mb-1">{right.title}</h3>
                <p className="text-slate-400 text-sm">{right.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 9. Contact */}
        <AnimatedSection delay={0.9}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">09</span>
            Contact
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            If you have any questions, concerns, or requests related to this Privacy Policy, please reach out to us at:
          </p>
          <a href="mailto:support@agentos.ai" className="inline-flex items-center gap-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all">
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@agentos.ai
          </a>
        </AnimatedSection>

        {/* 10. Updates */}
        <AnimatedSection delay={1.0}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">10</span>
            Updates
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page and updating the "Last Updated" date.
          </p>
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
