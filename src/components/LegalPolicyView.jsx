import { ShieldCheck, ArrowUpRight } from 'lucide-react';

/**
 * Apple-Inspired Minimalist Legal Policy View.
 * Unified Terms of Service, Privacy Policy, and Refund Policy.
 */
export function LegalPolicyView() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fbfbfd] text-[#1d1d1f] pt-32 pb-24 px-4 sm:px-6 flex justify-center antialiased relative bg-[radial-gradient(circle_at_top,_rgba(240,240,245,0.8),_transparent_70%)]">
      
      {/* Central Legal Container (Apple Glass / Crisp Card) */}
      <article className="w-full max-w-3xl bg-white/80 backdrop-blur-2xl border border-black/[0.06] rounded-[28px] p-8 sm:p-14 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),0_0_1px_1px_rgba(0,0,0,0.03)] relative">
        
        {/* Document Header */}
        <header className="mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-black/[0.04] text-[#6e6e73] border border-black/[0.04] mb-5">
            Legal & Compliance
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
            Terms of Service, Privacy & Refund Policy
          </h1>
          
          <p className="text-xs text-[#86868b] mt-2 font-normal">
            Effective: November 2026 • GhostLead Platform Terms
          </p>
          
          <p className="text-[14px] leading-relaxed text-[#424245] font-normal mt-4">
            This agreement sets forth the governing terms for access to and use of GhostLead services, data validation tools, Chrome extensions, and APIs. By creating an account, reserving a tier, or purchasing verification credits, you agree to these unified terms, data protection standards, and refund policies.
          </p>

          {/* Quick Jump Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-black/[0.05]">
            <button
              type="button"
              onClick={() => scrollTo('terms')}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            >
              Terms of Service ↓
            </button>
            <button
              type="button"
              onClick={() => scrollTo('privacy')}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            >
              Privacy Policy ↓
            </button>
            <button
              type="button"
              onClick={() => scrollTo('refund')}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/60 transition-colors cursor-pointer"
            >
              Refund Policy ↓
            </button>
          </div>
        </header>

        {/* Section Divider */}
        <div className="border-b border-black/[0.06] my-8" />

        {/* ========================================================= */}
        {/* PART I: TERMS OF SERVICE                                  */}
        {/* ========================================================= */}
        <section id="terms" className="scroll-mt-36">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1d1d1f] tracking-tight mb-3">
            1. Terms of Service
          </h2>

          {/* 1.1 Acceptance */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              1.1 Acceptance of Terms
            </h3>
            <p>
              By accessing the GhostLead platform, acquiring verification tokens, or using any associated features, you enter into a legally binding agreement with GhostLead. If acting on behalf of an enterprise or organization, you warrant that you possess full authorization to bind that entity.
            </p>
          </div>

          {/* 1.2 Service Description */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              1.2 Description of Service
            </h3>
            <p>
              GhostLead provides digital email verification and deliverability diagnostic utilities designed to assist organizations in evaluating email address validity and domain technical configurations. Services are delivered electronically through web consoles, browser utilities, and programmatic APIs.
            </p>
          </div>

          {/* 1.3 Account Tiers & Token Usage */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              1.3 Account Tiers & Fair Usage
            </h3>
            <p>
              Access to verification capabilities is provisioned through credit tokens and account tiers. Token allocations, concurrency slots, and query throughput are governed strictly by your selected plan parameters. Lifetime Deal (LTD) tokens never expire. Users agree to operate within published daily fair-use limits to protect 99%+ deliverability and global mail network reputation.
            </p>
          </div>

          {/* 1.4 Payment Terms, DFY Retainers & Refund Policy */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
              1.4 Payment Terms, DFY Retainers &amp; Refund Policy
            </h3>
            <p>
              All Lifetime Deal (LTD) purchases are covered by our 14-Day Satisfaction Guarantee, provided fewer than 100 verification credits have been consumed from your account. Once 100 or more credits are used, digital compute and SMTP verification capacity are deemed delivered and the purchase becomes final, remaining fully protected under our 2-for-1 Hard Bounce Credit Replacement Guarantee.
            </p>
            <p>
              Done-For-You (DFY) Data Desk monthly retainers are billed in advance on a recurring monthly basis and may be canceled at any time prior to the next billing cycle via email to contact@ghostlead.co. Because DFY deliverables involve custom manual research and immediate data compilation, no partial or retroactive refunds are issued once a monthly lead batch has been delivered.
            </p>
          </div>

          {/* 1.5 Acceptable Use Policy */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              1.5 Acceptable Use Policy
            </h3>
            <p>
              Customers agree to utilize the platform strictly for legitimate, lawful business communications. You agree not to use the Service for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#424245]">
              <li>Transmission of unsolicited bulk emails in violation of applicable anti-spam legislation (such as CAN-SPAM, CASL, or GDPR).</li>
              <li>Directory harvesting, dictionary attacks, or malicious server scanning.</li>
              <li>Attempting to bypass concurrency throttles or technical access limitations.</li>
              <li>Reselling, sublicensing, or distributing the Service without prior written consent.</li>
            </ul>
            <p className="mt-2">
              GhostLead reserves the right to suspend or restrict accounts that violate these acceptable use standards.
            </p>
          </div>

          {/* 1.6 Limitation of Liability */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              1.6 Limitation of Liability
            </h3>
            <p>
              To the maximum extent permitted by applicable law, GhostLead and its operators shall not be liable for any indirect, incidental, special, or consequential damages, including loss of profits, revenue, or business data. In no event shall GhostLead's cumulative aggregate liability exceed the total amounts paid by the customer for the Service in the three (3) months immediately preceding the event giving rise to liability.
            </p>
          </div>

          {/* 1.7 Third-Party Trademarks */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              1.7 Third-Party Trademarks
            </h3>
            <p>
              GhostLead operates independently. All third-party product names, logos, and trademarks referenced on the site or in product documentation remain the property of their respective holders and do not indicate endorsement or sponsorship.
            </p>
          </div>

          {/* 1.8 Third-Party Platform Compliance (Browser Extension) */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              1.8 Third-Party Platform Compliance (Browser Extension)
            </h3>
            <p>
              GhostLead&apos;s browser extension operates strictly as a user-directed productivity utility. You are solely responsible for complying with the Terms of Service and acceptable use rules of any third-party websites or professional networks (including LinkedIn) you access while using the extension. GhostLead assumes no liability for third-party account warnings or restrictions resulting from user-initiated browsing activity.
            </p>
          </div>

          {/* 1.9 Governing Law & Dispute Resolution */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              1.9 Governing Law &amp; Dispute Resolution
            </h3>
            <p>
              These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
            </p>
          </div>
        </section>

        {/* Section Divider */}
        <div className="border-b border-black/[0.06] my-8" />

        {/* ========================================================= */}
        {/* PART II: PRIVACY POLICY                                   */}
        {/* ========================================================= */}
        <section id="privacy" className="scroll-mt-36">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1d1d1f] tracking-tight mb-3">
            2. Privacy Policy
          </h2>

          {/* 2.1 Information We Collect */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              2.1 Information We Collect
            </h3>
            <p>
              We collect information strictly necessary to provide and administer the Service, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#424245]">
              <li><strong className="text-[#1d1d1f]">Account Information:</strong> Name, work email address, and authentication credentials provided during sign-up.</li>
              <li><strong className="text-[#1d1d1f]">Billing Records:</strong> Transaction identifiers, plan tier records, and payment confirmation metadata processed by certified payment gateways.</li>
              <li><strong className="text-[#1d1d1f]">Operational Telemetry:</strong> Aggregate verification volumes, token balances, and system health counters necessary to deliver platform stability.</li>
            </ul>
          </div>

          {/* 2.2 Use of Information */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              2.2 How We Use Information
            </h3>
            <p>
              Information collected is used exclusively for legitimate business and operational purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#424245]">
              <li>Executing email validation and deliverability diagnostic operations.</li>
              <li>Managing account token balances, plan tiers, and concurrency limits.</li>
              <li>Delivering operational communications, system notices, and support assistance.</li>
              <li>Preventing unauthorized abuse, fraudulent activity, and service interruptions.</li>
            </ul>
          </div>

          {/* 2.3 Data Retention & Third Parties */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              2.3 Data Retention & Third Parties
            </h3>
            <p>
              We do not sell, rent, or trade customer information or verification query records to third parties. Data is processed solely to fulfill customer requests and maintain account integrity. Verification queries are processed ephemerally and are not retained to build secondary lead directories or public databases.
            </p>
            <p className="mt-2">
              Account records are retained only for as long as necessary to maintain active service, comply with statutory tax and accounting obligations, and resolve legal disputes.
            </p>
          </div>

          {/* 2.4 Data Security */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              2.4 Data Security
            </h3>
            <p>
              We maintain industry-standard administrative, technical, and physical safeguards (including encrypted transit via TLS) to protect information against unauthorized disclosure, alteration, or loss.
            </p>
          </div>

          {/* 2.5 Inquiries & Updates */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              2.5 Inquiries & Policy Updates
            </h3>
            <p>
              We may update this policy periodically to reflect operational or regulatory developments. Continued platform access following any updates constitutes acceptance of the modified terms. For inquiries regarding our privacy standards, please contact our support team.
            </p>
          </div>
        </section>

        {/* Section Divider */}
        <div className="border-b border-black/[0.06] my-8" />

        {/* ========================================================= */}
        {/* PART III: REFUND POLICY (LIFETIME DEAL & TOP-UP)          */}
        {/* ========================================================= */}
        <section id="refund" className="scroll-mt-36">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-200/60 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Credit Protection Policy
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-[#1d1d1f] tracking-tight mb-3">
            3. Lifetime Deal (LTD) & Credit Refund Policy
          </h2>

          {/* Notice Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-slate-900 mb-6 space-y-2">
            <p className="font-semibold text-sm">
              All Lifetime Deal purchases are covered by our 14-Day Satisfaction Guarantee (&lt;100 credits used) and our 2-for-1 Hard Bounce Credit Replacement Guarantee. Contact: <a href="mailto:contact@ghostlead.co" className="underline font-bold text-blue-600">contact@ghostlead.co</a>.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              We offer a 14-day refund window on initial Lifetime Deal purchases provided fewer than 100 verification credits have been consumed. If 100 or more credits have been consumed or 14 calendar days have passed, purchases are deemed delivered and non-refundable, remaining fully covered under our 2-for-1 Hard Bounce Credit Replacement Guarantee.
            </p>
          </div>

          {/* 3.1 14-Day Limited Refund Window & Final Sale Threshold */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              3.1 14-Day Limited Refund Window &amp; Final Sale Threshold
            </h3>
            <p>
              We offer a 14-day refund window on initial Lifetime Deal (Solo, Pro, Agency) purchases strictly for customers who have used fewer than 100 credits. If you have consumed 100 or more credits, or if 14 calendar days have passed since purchase, all sales are final and non-refundable. Optional credit top-up packs are non-refundable once credited to your ledger. To request an eligible refund under the 100-credit threshold, contact <a href="mailto:contact@ghostlead.co" className="text-blue-600 underline">contact@ghostlead.co</a> with your order ID.
            </p>
          </div>

          {/* 3.2 2-for-1 Hard Bounce Replacement Guarantee */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              3.2 2-for-1 Hard Bounce Credit Replacement Guarantee
            </h3>
            <p>
              We stand behind the deliverability of verified emails. In addition to our satisfaction guarantee, GhostLead provides a 2-for-1 credit guarantee:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#424245]">
              <li>
                If any email address verified as <strong>valid/deliverable</strong> by GhostLead results in a documented hard bounce during outreach sent within 14 days of verification, GhostLead will grant <strong>two (2) replacement credits</strong> for every one (1) bounced address back to your active ledger.
              </li>
              <li>
                Soft bounces resulting from mailbox-full errors, temporary server downtimes, sending IP blacklisting, or aggressive campaign volume are not classified as hard bounces.
              </li>
            </ul>
          </div>

          {/* 3.3 Zero Charge for Catch-All & Invalid Emails */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              3.3 Catch-All & Invalid Emails Free Forever
            </h3>
            <p>
              GhostLead guarantees a zero-waste credit ledger. You are only charged credits for verified, 100% deliverable addresses. Any lead identified as a catch-all domain, unverified mailbox, disposable address, or invalid syntax is processed completely free of charge (0 credits charged).
            </p>
          </div>

          {/* 3.4 How to Submit a Guarantee Claim */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-2">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              3.4 Requesting Credit Adjustments
            </h3>
            <p>
              To request replacement credits under the 2-for-1 Hard Bounce Credit Replacement Guarantee, simply export your bounce log from your sending provider (e.g., Instantly, Smartlead, Lemlist) and forward it to our deliverability team:
            </p>
            <div className="mt-3 p-3 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Support & Guarantee Desk: contact@ghostlead.co
              </span>
              <a
                href="mailto:contact@ghostlead.co?subject=2-for-1%20Bounce%20Guarantee%20Claim"
                className="text-xs font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
              >
                Submit Request <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Credit replacements are processed within 1–2 business days directly into your account balance.
            </p>
          </div>
        </section>

      </article>
    </div>
  );
}

export default LegalPolicyView;
