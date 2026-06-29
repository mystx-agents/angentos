import { Metadata } from "next";
import { AnimatedSection } from "../privacy/AnimatedSection";

export const metadata: Metadata = {
  title: "AgentOS Terms of Service",
  description: "Terms of Service for AgentOS AI Instagram Management Platform.",
};

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium">
            Last Updated: <span className="text-slate-200">{today}</span>
          </p>
        </div>

        {/* 1. Acceptance of Terms */}
        <AnimatedSection delay={0.1}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">01</span>
            Acceptance of Terms
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            By accessing or using AgentOS, you explicitly agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the service. These terms establish a legally binding agreement between you and AgentOS.
          </p>
        </AnimatedSection>

        {/* 2. About AgentOS */}
        <AnimatedSection delay={0.15}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">02</span>
            About AgentOS
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            AgentOS is an advanced, AI-powered Instagram conversation management platform. We are built strictly using Meta's Official Graph APIs, empowering creators and businesses to analyze, automate, and manage their audience interactions securely and efficiently.
          </p>
        </AnimatedSection>

        {/* 3. User Responsibilities */}
        <AnimatedSection delay={0.2}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">03</span>
            User Responsibilities
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            As a user of our platform, you agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 text-lg ml-4 marker:text-blue-500">
            <li>Provide accurate and complete information during registration.</li>
            <li>Protect your account credentials from unauthorized access.</li>
            <li>Use the service lawfully and ethically.</li>
            <li>Follow Meta Developer Policies and Instagram Platform Rules.</li>
            <li>Follow Instagram's official Terms of Service.</li>
            <li>Not abuse the system or bypass rate limits.</li>
          </ul>
        </AnimatedSection>

        {/* 4. Acceptable Use */}
        <AnimatedSection delay={0.25}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">04</span>
            Acceptable Use
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            You must not engage in any of the following activities on our platform:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Send spam", "Harass people", "Attempt fraud", "Upload malware", "Exploit bugs", "Reverse engineer the platform", "Attempt prompt injection or jailbreak the AI", "Attempt unauthorized access"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-800/30 p-3 rounded-lg border border-slate-700/30">
                <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-slate-300 text-lg">{item}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 5. AI Responses */}
        <AnimatedSection delay={0.3}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">05</span>
            AI Responses
          </h2>
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl space-y-4">
            <p className="text-slate-200 font-medium text-lg border-l-4 border-blue-500 pl-4">
              AI-generated replies are automated and rely on large language models.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 text-lg ml-4 marker:text-blue-400">
              <li>Users remain solely responsible for conversations sent through their accounts.</li>
              <li>AI responses may occasionally be inaccurate or hallucinate information.</li>
              <li>Users should monitor and review important messages when appropriate.</li>
            </ul>
          </div>
        </AnimatedSection>

        {/* 6. Instagram Integration */}
        <AnimatedSection delay={0.35}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">06</span>
            Instagram API Compliance
          </h2>
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6">
            <p className="text-slate-200 leading-relaxed text-lg mb-4 font-semibold">
              AgentOS strictly operates within the boundaries of Meta's Developer Policies.
            </p>
            <ul className="space-y-3 text-slate-300 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span> AgentOS only uses Meta's Official Graph APIs.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span> No scraping.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span> No credential harvesting.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span> No password collection.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span> No bypassing Instagram security.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span> No unofficial automation.
              </li>
            </ul>
          </div>
        </AnimatedSection>

        {/* 7. Account Suspension */}
        <AnimatedSection delay={0.4}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">07</span>
            Account Suspension
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            We reserve the right to suspend or terminate accounts immediately and without prior notice if we detect:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Illegal activity", "Abuse", "Policy violations", "Security threats"].map((reason, i) => (
              <div key={i} className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl text-center">
                <span className="text-slate-200 font-medium">{reason}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 8. Privacy */}
        <AnimatedSection delay={0.45}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">08</span>
            Privacy
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            Your privacy is extremely important to us. Personal information is handled strictly in accordance with our <a href="/privacy" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">Privacy Policy</a>. By using AgentOS, you consent to our collection and use of personal data as outlined in that document.
          </p>
        </AnimatedSection>

        {/* 9. Intellectual Property */}
        <AnimatedSection delay={0.5}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">09</span>
            Intellectual Property
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            The AgentOS software, branding, user interfaces, source code, AI workflows, and all associated material are the exclusive intellectual property of AgentOS. Users are granted a limited, non-exclusive, non-transferable license to use the service strictly in accordance with these Terms.
          </p>
        </AnimatedSection>

        {/* 10. Limitation of Liability */}
        <AnimatedSection delay={0.55}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">10</span>
            Limitation of Liability
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            AgentOS is provided on an "as is" and "as available" basis without guarantees of uninterrupted service, accuracy, or reliability. In no event shall AgentOS or its operators be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services.
          </p>
        </AnimatedSection>

        {/* 11. Termination */}
        <AnimatedSection delay={0.6}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">11</span>
            Termination
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            Users may stop using the service and disconnect their accounts at any time. AgentOS reserves the right to terminate access to the platform without notice if you are found to be in violation of these Terms of Service or Meta Developer Policies.
          </p>
        </AnimatedSection>

        {/* 12. Governing Law */}
        <AnimatedSection delay={0.65}>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">12</span>
            Governing Law
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            These Terms of Service, and any disputes arising out of your use of AgentOS, shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </p>
        </AnimatedSection>

        {/* 13. Contact */}
        <AnimatedSection delay={0.7}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-sm font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">13</span>
            Contact
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            If you have any questions or require support regarding these Terms of Service, please contact us:
          </p>
          <a href="mailto:support@agentos.ai" className="inline-flex items-center gap-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all">
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
