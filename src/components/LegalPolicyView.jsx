/**
 * Apple-Inspired Minimalist Legal Policy View.
 * Unified Terms of Service and Privacy Policy in an ultra-clean, crisp card aesthetic.
 */
export function LegalPolicyView() {
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
            Terms of Service & Privacy Policy
          </h1>
          
          <p className="text-xs text-[#86868b] mt-2 font-normal">
            Effective: October 2026 • GhostLead Platform Terms
          </p>
          
          <p className="text-[14px] leading-relaxed text-[#424245] font-normal mt-4">
            This agreement sets forth the terms governing your access to and use of GhostLead services, applications, and APIs. By creating an account or utilizing the Service, you agree to these unified terms and our data protection standards.
          </p>
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
              Access to verification capabilities is provisioned through credit tokens and account tiers. Token allocations, concurrency slots, and query throughput are governed strictly by your selected plan parameters. Users agree to operate within the established rate limits and volume allocations designated for their account tier.
            </p>
          </div>

          {/* 1.4 Payment & Refund Policy */}
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              1.4 Payment Terms & Refund Policy
            </h3>
            <p>
              All purchases and token allocations are final and non-refundable unless explicitly mandated by applicable law. Service fees are billed according to published rates at the time of purchase.
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
          <div className="text-[14px] leading-relaxed text-[#424245] font-normal space-y-2">
            <h3 className="text-sm font-semibold text-[#1d1d1f] mt-4 mb-1">
              1.7 Third-Party Trademarks
            </h3>
            <p>
              GhostLead operates independently. All third-party product names, logos, and trademarks referenced on the site or in product documentation remain the property of their respective holders and do not indicate endorsement or sponsorship.
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

      </article>
    </div>
  );
}

export default LegalPolicyView;
