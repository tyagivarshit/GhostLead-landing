/**
 * Single source of truth for the Data Desk (/agency) offer.
 * Used by the standalone /agency view to prevent drift.
 */

export const DFY_COPY = {
  pillars: [
    {
      step: '1',
      title: 'Custom ICP & Intent Sourcing',
      description:
        'We don\'t pull generic databases. We filter by hiring signals, funding, tech stack, and exact decision-maker titles.',
    },
    {
      step: '2',
      title: 'Live-SMTP Verified (<1% Bounce)',
      description:
        'Every email passes our multi-signal verification and catch-all filter. 2-for-1 credit replacement on any hard bounce.',
    },
    {
      step: '3',
      title: 'Ready-to-Send AI Icebreakers',
      description:
        'Each lead comes with a researched, 1-line personalized opening hook formatted directly for Instantly, Smartlead, or HubSpot.',
    },
  ],
  pilotPromise: {
    title: 'Zero-Risk Pilot Promise',
    description:
      'Not sure about data quality? Tell us your target niche and we’ll send 50 live-verified leads + custom AI openers for free within 24 hours—before you pay a single dollar.',
  },
  secondaryLink: {
    text: 'Prefer to run the engine yourself? Grab our Founding Member Lifetime Deal above ↑ starting at $79 one-time.',
  },
};

export const DFY_TIERS = [
  {
    id: 'starter',
    name: 'Starter Data Engine',
    price: 750,
    priceFormatted: '$750',
    billingPeriod: '/ month',
    badge: 'No long-term contract',
    subtitle: 'Best for solo founders & boutique agencies testing outbound.',
    bullets: [
      '1,000 Live-Verified Leads / mo (250 delivered every Monday)',
      '0 Catch-Alls Included (<1% hard bounce guarantee)',
      'Clean CSV Export (Instantly / Smartlead / Lemlist ready)',
      '2-for-1 Bounce Replacement SLA',
    ],
    ctaText: 'Request 50 Free Sample Leads →',
    volumeOption: '1,000 leads/mo ($750)',
    waitlistTier: 'dfy_starter',
    popular: false,
  },
  {
    id: 'growth',
    name: 'Growth Outbound Fuel',
    price: 1250,
    priceFormatted: '$1,250',
    billingPeriod: '/ month',
    badge: 'Saves $1,500+/mo vs hiring a VA + Clay/Apollo',
    subtitle: 'Built for scaling B2B agencies & SaaS teams running daily campaigns.',
    bullets: [
      '2,500 Live-Verified Leads / mo (Weekly or bi-weekly drops)',
      '2,500 Custom 1-Line AI Icebreakers (Researched per prospect)',
      'Intent & Hiring Signal Filtering (Active buyers only)',
      'Direct CRM / Webhook Sync + Dedicated Slack Channel',
      '2-for-1 Bounce Replacement SLA',
    ],
    ctaText: 'Claim Free 50-Lead Custom Pilot →',
    volumeOption: '2,500 leads/mo ($1,250)',
    waitlistTier: 'dfy_growth',
    popular: true,
    popularBadge: 'MOST POPULAR',
  },
  {
    id: 'scale',
    name: 'Scale Pipeline Partner',
    price: 2200,
    priceFormatted: '$2,200',
    billingPeriod: '/ month',
    badge: 'Only 2 spots open this month',
    subtitle: 'High-volume white-label data infrastructure for multi-client agencies.',
    bullets: [
      '6,000 Live-Verified Leads / mo across up to 3 ICPs',
      'Custom AI Icebreakers + Company Pain-Point Notes',
      'Verified LinkedIn Profile URLs + Direct Dials (where available)',
      '24-Hour Priority Turnaround + Bi-weekly strategy sync',
    ],
    ctaText: 'Book 10-Min Pipeline Call →',
    volumeOption: '6,000+ leads/mo ($2,200)',
    waitlistTier: 'dfy_scale',
    popular: false,
  },
];

export const DFY_VOLUME_OPTIONS = [
  '1,000 leads/mo ($750)',
  '2,500 leads/mo ($1,250)',
  '6,000+ leads/mo ($2,200)',
];

/**
 * Trust & Deliverability proof claims built directly from claims
 * already present on GhostLead landing page (no new fabricated numbers).
 */
export const DFY_PROOF_POINTS = [
  {
    title: 'Live-SMTP Mailbox Handshake',
    description: 'Every inbox checked directly against destination mail servers in real time under 1.2s.',
  },
  {
    title: '0 Catch-Alls & Bounce Screening',
    description: 'Risky and unverifiable catch-alls screened out before list delivery so your domains stay pristine.',
  },
  {
    title: '2-for-1 Hard Bounce Guarantee',
    description: 'If a verified email ever results in a hard bounce, receive 2 replacement credits automatically.',
  },
  {
    title: 'Instant Outreach CSV Ready',
    description: 'Delivered pre-formatted for Instantly, Smartlead, Lemlist, and CRM webhooks with personalized openers.',
  },
];
