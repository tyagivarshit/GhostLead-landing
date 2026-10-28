import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  ArrowLeft, 
  Scale, 
  Database, 
  Clock
} from 'lucide-react';

/**
 * Airtight, Zero-Liability Legal Policy View.
 * Contains exhaustive Terms of Service and Privacy Policy adhering strictly to protective legal clauses.
 * 
 * @param {{
 *   initialTab?: 'terms' | 'privacy',
 *   onNavigateHome: (hash?: string) => void
 * }} props
 */
export function LegalPolicyView({ initialTab = 'terms', onNavigateHome }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="w-full max-w-5xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
        <button
          type="button"
          onClick={() => onNavigateHome()}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all text-xs sm:text-sm font-semibold cursor-pointer shadow-xs active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>← Back to Home</span>
        </button>

        {/* Status Indicators */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            Effective: October 2026
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-300">
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            Binding Legal Contract
          </span>
        </div>
      </div>

      {/* Main Glassmorphic Legal Card */}
      <div className="rounded-3xl bg-slate-950/95 border border-slate-800/90 shadow-2xl p-6 sm:p-10 lg:p-12 text-slate-300 relative overflow-hidden backdrop-blur-2xl">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Header Title Section */}
        <div className="relative z-10 border-b border-slate-800/80 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-700/40 text-indigo-300 text-xs font-bold mb-4">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            GhostLead Compliance & Governance
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Terms of Service & Privacy Policy
          </h1>
          <p className="mt-3.5 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Please review these terms and privacy disclosures thoroughly before using GhostLead or acquiring verification credit tokens. By accessing the site, running mailbox queries, or reserving a Lifetime Deal slot, you irrevocably agree to these terms.
          </p>

          {/* Tab Switcher */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Privacy Policy & Zero-Database Architecture
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="relative z-10 space-y-12 text-sm sm:text-base leading-relaxed">

          {activeTab === 'terms' && (
            <motion.div
              key="terms-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-10"
            >
              {/* SECTION 1: STRICT ZERO-REFUND POLICY */}
              <section className="space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-rose-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                        1. Strict Zero-Refund Policy (100% Final & Non-Refundable)
                      </h2>
                      <p className="mt-2 text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                        Due to the technical reality that email mailbox verification immediately and irreversibly consumes real-time Port 25 network bandwidth, dedicated cloud compute, and outbound IP reputation resources, <strong>ALL SALES (INCLUDING LIFETIME DEAL TOKEN STACKS, ADDITIONAL CREDIT BATCHES, AND MONTHLY SAAS TIERS) ARE 100% FINAL AND STRICTLY NON-REFUNDABLE UNDER ALL CIRCUMSTANCES.</strong>
                      </p>
                      <p className="mt-2 text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                        GhostLead incurs direct, unrecoverable infrastructure costs at the moment credits or token allocations are provisioned. Once an order is processed or verification operations commence, zero refunds, reversals, or credit charge adjustments will be granted.
                      </p>
                      <p className="mt-2 text-xs sm:text-sm text-rose-300 font-semibold leading-relaxed">
                        <strong>Chargebacks & Fraud Protection:</strong> Initiating an unauthorized chargeback, payment dispute, or fraudulent claim through a card issuer or banking partner constitutes a material breach of this Agreement. Any chargeback will result in immediate and permanent account termination, forfeiture of all remaining non-expiring credit tokens, and placement on commercial risk prevention blacklists.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 2: TOKEN LIFECYCLE & FAIR USAGE */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>2. Token Lifecycle, Concurrency & Fair Usage Policy</span>
                </h2>
                
                <div className="space-y-3 pl-4 border-l-2 border-indigo-500/30">
                  <p>
                    Verification tokens represent digital access entitlements to the GhostLead live SMTP validation engine:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                        Lifetime Deals (Waves 1, 2, 3)
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2">Non-Expiring Token Stacks</h3>
                      <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                        <li>Credits never expire; valid perpetually until exhausted.</li>
                        <li>Strictly bound by tier concurrency slots (Starter: 2 slots, Pro: 4 slots, Agency: 8 slots).</li>
                        <li>Bound by daily abuse caps (Starter: 2,500/day, Pro: 8,000/day, Agency: 20,000/day) resetting at 00:00 UTC.</li>
                        <li>Early founders may top up additional tokens at locked founder rates.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Standard Monthly SaaS Tiers
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2">Monthly Recurring Quota</h3>
                      <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                        <li>Monthly quota resets at the end of each 30-day billing cycle.</li>
                        <li>Zero rollover or credit carryover to subsequent months.</li>
                        <li>Unused monthly verification capacity expires automatically.</li>
                        <li>Subscription cancelable anytime before next billing cycle.</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400">
                    <strong>Hard Cap Sunset Provision:</strong> GhostLead Lifetime Deal availability is strictly capped to the first 150 accounts across Waves 1 to 3. Once account #150 is reached, all Lifetime Deal offers sunset permanently, and the platform transitions exclusively to recurring monthly subscription pricing ($39/mo, $79/mo, $159/mo). Existing LTD founders retain their non-expiring status indefinitely.
                  </p>
                </div>
              </section>

              {/* SECTION 3: ABUSE & DELIVERABILITY DISCLAIMER */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>3. Abuse & Deliverability Disclaimer</span>
                </h2>
                
                <div className="space-y-3 pl-4 border-l-2 border-indigo-500/30">
                  <p>
                    GhostLead operates purely as an objective, technical mailbox diagnostic tool evaluating domain DNS, MX records, and recipient SMTP server handshake responses at the time of query.
                  </p>
                  
                  <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs sm:text-sm text-indigo-200">
                    <p className="font-semibold text-white mb-1">No Inboxing Guarantee:</p>
                    <p>
                      GhostLead does not and cannot guarantee email inbox placement, deliverability, or open rates. Deliverability is dictated by factors entirely outside our control, including sender domain age, DNS authentication records (SPF, DKIM, DMARC), email content, spam triggers, sender IP warming neglect, and recipient email security software (e.g. Mimecast, Proofpoint, Barracuda).
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400">
                    <strong>Prohibited Abuse & Automated Flooding:</strong> GhostLead may not be used to launch dictionary attacks, harvest spam traps, or spam unverified lists against public email systems. Any user attempting to bypass concurrency controls or script automated floods exceeding daily abuse caps will experience immediate rate-limiting and account forfeiture without notice or refund.
                  </p>
                </div>
              </section>

              {/* SECTION 4: THIRD-PARTY DISCLAIMER */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>4. Third-Party Trademarks & Independence Disclaimer</span>
                </h2>
                
                <div className="space-y-3 pl-4 border-l-2 border-indigo-500/30">
                  <p className="text-xs sm:text-sm text-slate-300">
                    <strong>GhostLead is an independent software tool.</strong> GhostLead is not affiliated, associated, authorized, endorsed by, or in any way officially connected with LinkedIn Corporation, Microsoft Corporation, Smartlead, Instantly.ai, Google LLC, or any of their respective subsidiaries or affiliates.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400">
                    The name "LinkedIn" as well as related names, marks, emblems, and images are registered trademarks of their respective owners. The use in this service of any trade name, trademark, or service mark is for identification and reference purposes only and does not imply any association with the trademark holder.
                  </p>
                </div>
              </section>

              {/* SECTION 5: LIMITATION OF LIABILITY */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>5. Limitation of Liability & Indemnification</span>
                </h2>
                
                <div className="space-y-3 pl-4 border-l-2 border-indigo-500/30 text-xs sm:text-sm text-slate-400">
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, GHOSTLEAD AND ITS OPERATORS, AFFILIATES, OFFICERS, AND CONTRACTORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF REVENUE, LOSS OF PROFITS, DOMAIN BLACKLISTING, ACCOUNT TERMINATION BY THIRD-PARTY OUTREACH TOOLS, OR LOSS OF DATA.
                  </p>
                  <p>
                    IN NO EVENT SHALL GHOSTLEAD'S AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THIS AGREEMENT OR THE USE OF THE SERVICE EXCEED THE ACTUAL AMOUNT PAID BY THE USER TO GHOSTLEAD IN THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE CLAIM (OR THE PURCHASE PRICE OF THE APPLICABLE SINGLE LIFETIME DEAL TIER).
                  </p>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'privacy' && (
            <motion.div
              key="privacy-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-10"
            >
              {/* PRIVACY HIGHLIGHT: ZERO-DATABASE CONTACT ARCHITECTURE */}
              <section className="space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 text-emerald-200">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                        Zero-Database Contact Architecture (GDPR & CCPA by Design)
                      </h2>
                      <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                        <strong>GhostLead strictly adheres to a Zero-Database Contact Architecture.</strong> We do NOT scrape, harvest, store, trade, resell, or build centralized databases containing personal lead contacts, employee directories, or customer lists.
                      </p>
                      <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                        Every single verification operation executes via real-time, stateless network protocols (DNS query, MX routing, and live SMTP handshake) with the target server. The verification outcome (e.g. Valid, Risky, Catch-All) is streamed directly to the user's active client session and is immediately expunged from volatile server memory.
                      </p>
                      <p className="mt-2 text-xs sm:text-sm text-emerald-300 font-semibold leading-relaxed">
                        Uploaded CSV files, contact email targets, and validation logs are never saved, stored, or indexed on GhostLead storage drives.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION: DATA WE COLLECT */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>1. Information We Collect</span>
                </h2>
                
                <div className="space-y-3 pl-4 border-l-2 border-indigo-500/30 text-xs sm:text-sm text-slate-300">
                  <p>
                    Because we do not store customer leads or prospect records, our data collection is limited exclusively to functional account administration:
                  </p>
                  <ul className="space-y-2 list-disc pl-5 text-slate-400">
                    <li>
                      <strong className="text-slate-200">Account Credentials & Work Email:</strong> Your registered work email address for reservation token tracking, wave notifications, and authentication.
                    </li>
                    <li>
                      <strong className="text-slate-200">Billing Metadata:</strong> Token balances, concurrency slots, transaction IDs, and wave affiliation. Payment card numbers are processed directly by our PCI-DSS compliant payment gateway and are never touched or stored by GhostLead.
                    </li>
                    <li>
                      <strong className="text-slate-200">Telemetry & Abuse Counter:</strong> Aggregate daily usage counters (e.g. number of rows verified today) used strictly to enforce daily abuse limits and prevent denial-of-service floods.
                    </li>
                  </ul>
                </div>
              </section>

              {/* SECTION: PURPOSE OF PROCESSING */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>2. How We Use Information</span>
                </h2>
                
                <div className="space-y-3 pl-4 border-l-2 border-indigo-500/30 text-xs sm:text-sm text-slate-400">
                  <p>We process your administrative data solely to:</p>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>Provision, maintain, and secure your access to verification tokens.</li>
                    <li>Notify you regarding your Wave reservation spot prior to public launch.</li>
                    <li>Prevent fraud, abusive high-volume list bombing, and unauthorized chargebacks.</li>
                    <li>Comply with valid statutory legal obligations and law enforcement requests.</li>
                  </ul>
                </div>
              </section>

              {/* SECTION: ZERO THIRD-PARTY SALE */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>3. No Sale or Commercialization of Data</span>
                </h2>
                
                <div className="space-y-3 pl-4 border-l-2 border-indigo-500/30 text-xs sm:text-sm text-slate-400">
                  <p>
                    We have never sold, rented, or commercialized any user data or lead verification queries to data brokers, advertising networks, or third-party intelligence services. We will never do so in the future.
                  </p>
                </div>
              </section>

              {/* SECTION: DATA SECURITY & RETENTION */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>4. Data Security & Ephemeral Processing</span>
                </h2>
                
                <div className="space-y-3 pl-4 border-l-2 border-indigo-500/30 text-xs sm:text-sm text-slate-400">
                  <p>
                    All communication between your browser, the Chrome Extension, and GhostLead verification nodes is encrypted using TLS 1.3 / AES-256. Because mailbox verification is ephemeral and stateless, target recipient emails cease to exist on our servers the second the socket connection closes.
                  </p>
                </div>
              </section>
            </motion.div>
          )}

        </div>

        {/* Bottom Navigation & Contact Line */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>GhostLead Zero-Liability Infrastructure • Version 2.4</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateHome()}
              className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              Return to Home Page →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LegalPolicyView;
