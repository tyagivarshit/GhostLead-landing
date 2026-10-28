/**
 * Unified Legal Policy & Terms of Service View.
 * Professional, generic B2B document combining Terms of Service and Privacy Policy.
 */
export function LegalPolicyView() {
  return (
    <div className="max-w-3xl mx-auto py-24 px-6 text-slate-300 font-sans">
      
      {/* Clean Document Container */}
      <article className="rounded-3xl bg-slate-950/90 border border-slate-800/80 p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Document Header */}
        <header className="relative z-10 border-b border-slate-800/80 pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs font-semibold mb-3">
            <span>GhostLead Legal & Compliance</span>
            <span>•</span>
            <span>Last updated: October 2026</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Service & Privacy Policy
          </h1>
          
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            This agreement governs your access to and use of GhostLead services, websites, and associated applications. By accessing or using the Service, you agree to be bound by these unified terms and our data protection standards.
          </p>
        </header>

        {/* Document Content */}
        <div className="relative z-10 space-y-12 text-sm sm:text-base leading-relaxed">

          {/* ========================================================= */}
          {/* PART I: TERMS OF SERVICE                                  */}
          {/* ========================================================= */}
          <section id="terms" className="scroll-mt-32 space-y-8">
            <div className="border-b border-slate-800/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Part I
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Terms of Service
              </h2>
            </div>

            {/* 1. Acceptance of Terms */}
            <div className="space-y-2.5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono text-sm">1.1</span>
                <span>Acceptance of Terms</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                By creating an account, acquiring verification credits, or using the GhostLead platform, you enter into a binding agreement with GhostLead. If you are accepting these terms on behalf of an organization, you represent that you have the requisite authority to bind that entity.
              </p>
            </div>

            {/* 2. Service Provision & Description */}
            <div className="space-y-2.5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono text-sm">1.2</span>
                <span>Description of Service</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                GhostLead provides digital email verification and deliverability diagnostic tools designed to help organizations validate prospective email address quality and domain configurations. Services are delivered electronically through web interfaces, browser extensions, and API endpoints.
              </p>
            </div>

            {/* 3. Account Tiers & Token Usage */}
            <div className="space-y-2.5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono text-sm">1.3</span>
                <span>Account Tiers & Credit Usage</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Service access is provisioned through verification credits and account tiers. Token usage, parallel processing capacity, and concurrency are governed strictly by your selected account tier and plan limits. Users agree to operate within the established rate limits and volume parameters allocated to their subscription or lifetime access package.
              </p>
            </div>

            {/* 4. Payment & Refund Terms */}
            <div className="space-y-2.5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono text-sm">1.4</span>
                <span>Payment & Refund Policy</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Fees for paid tiers, token packages, and subscription renewals are stated on the platform pricing page. All purchases and token allocations are final and non-refundable unless explicitly mandated by applicable law. In the event of a disputed billing record, customers are encouraged to contact customer support for prompt resolution.
              </p>
            </div>

            {/* 5. Acceptable Use Policy */}
            <div className="space-y-2.5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono text-sm">1.5</span>
                <span>Acceptable Use & Fair Practices</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Customers agree to utilize the Service strictly for lawful and legitimate commercial operations. You may not utilize GhostLead for:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-sm">
                <li>Transmission of unsolicited bulk emails in violation of international anti-spam legislation (such as the CAN-SPAM Act, CASL, or GDPR).</li>
                <li>Dictionary attacks, directory harvesting, or malicious probing of mail infrastructures.</li>
                <li>Attempting to circumvent account limits, concurrency slots, or technical access barriers.</li>
                <li>Reselling or sublicensing the platform without explicit written authorization.</li>
              </ul>
              <p className="text-slate-400 text-sm leading-relaxed mt-2">
                GhostLead reserves the right to restrict or suspend access to accounts that demonstrate abusive or unlawful usage patterns.
              </p>
            </div>

            {/* 6. Limitation of Liability */}
            <div className="space-y-2.5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono text-sm">1.6</span>
                <span>Limitation of Liability</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                To the maximum extent permitted by applicable law, GhostLead and its operators shall not be liable for any indirect, incidental, special, or consequential damages, including loss of profits, revenue, or business opportunities. In no circumstance shall GhostLead's cumulative liability exceed the total amount paid by the customer for the Service during the three (3) months immediately preceding the event giving rise to liability.
              </p>
            </div>

            {/* 7. Third-Party Trademarks */}
            <div className="space-y-2.5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono text-sm">1.7</span>
                <span>Third-Party Trademarks</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                GhostLead is an independent software provider. Any third-party product names, logos, or trademarks referenced within our service or marketing materials are the property of their respective owners and do not imply endorsement, partnership, or affiliation.
              </p>
            </div>
          </section>

          {/* ========================================================= */}
          {/* PART II: PRIVACY POLICY                                   */}
          {/* ========================================================= */}
          <section id="privacy" className="scroll-mt-32 space-y-8 pt-6 border-t border-slate-800/80">
            <div className="border-b border-slate-800/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Part II
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Privacy Policy
              </h2>
            </div>

            {/* 1. Information We Collect */}
            <div className="space-y-2.5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono text-sm">2.1</span>
                <span>Information We Collect</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We collect personal information necessary to deliver and manage the Service, including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-sm">
                <li><strong className="text-slate-200">Account Details:</strong> Name, work email address, and account credentials provided during registration.</li>
                <li><strong className="text-slate-200">Transaction & Billing Records:</strong> Purchase history, plan selections, and payment confirmation metadata handled via secure third-party payment processors.</li>
                <li><strong className="text-slate-200">Usage Telemetry:</strong> Aggregate query volumes, feature interaction counts, and account credit balance data for operational maintenance.</li>
              </ul>
            </div>

            {/* 2. Use of Information */}
            <div className="space-y-2.5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono text-sm">2.2</span>
                <span>How We Use Information</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Information collected is used strictly for legitimate business and service operational purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-sm">
                <li>Providing email verification and diagnostic functionality.</li>
                <li>Managing token balances, account tiers, and feature entitlements.</li>
                <li>Communicating administrative notifications, system updates, and customer support responses.</li>
                <li>Ensuring platform integrity, preventing unauthorized activity, and maintaining service reliability.</li>
              </ul>
            </div>

            {/* 3. Data Retention & Third Parties */}
            <div className="space-y-2.5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono text-sm">2.3</span>
                <span>Data Retention & Third Parties</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We do not sell, rent, or trade user data or verification query records to third parties. Data is processed solely to fulfill customer requests and maintain account integrity. Verification queries are processed ephemerally and are not retained for building centralized lead directories or secondary marketing lists.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Customer account records are retained only for as long as necessary to maintain active accounts, fulfill contractual obligations, resolve disputes, and comply with applicable statutory retention requirements.
              </p>
            </div>

            {/* 4. Data Security */}
            <div className="space-y-2.5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono text-sm">2.4</span>
                <span>Data Security</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We implement industry-standard encryption protocols (including HTTPS/TLS) and organizational safeguards to protect customer data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            {/* 5. Policy Updates & Inquiries */}
            <div className="space-y-2.5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono text-sm">2.5</span>
                <span>Inquiries & Updates</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We may periodically update this policy to reflect operational, legal, or regulatory changes. Continued use of the platform following any modifications constitutes acceptance of the revised terms. For inquiries regarding our privacy or compliance policies, please reach out via our official contact channels.
              </p>
            </div>
          </section>

        </div>

      </article>
    </div>
  );
}

export default LegalPolicyView;
