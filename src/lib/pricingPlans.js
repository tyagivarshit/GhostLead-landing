/**
 * Pure helper to return dynamic pricing configuration and token stack features based on the total waitlist count.
 * Single source of truth for Wave 1 pricing, token allocations, modal tiers, and guarantees.
 * 
 * Wave Escalation Schedule:
 * - Wave 1 (totalCount < 30):
 *     Solo: $79 (One-time)    | 6,000 Credits (5,000 + 1,000 Wave 1 bonus)   | Next jump: "+$10 in Wave 2 ($89)"
 *     Pro: $139 (One-time)    | 16,000 Credits (15,000 + 1,000 Wave 1 bonus) | Next jump: "+$30 in Wave 2 ($169)"
 *     Agency: $269 (One-time) | 45,000 Credits (40,000 + 5,000 Wave 1 bonus) | Next jump: "+$80 in Wave 2 ($349)"
 * - Wave 2 (30 <= totalCount < 100):
 *     Solo: $89 (One-time)    | 4,000 Credits  | Next jump: "Solo Tier Decommissioned in Wave 3"
 *     Pro: $169 (One-time)    | 12,500 Credits | Next jump: "+$80 in Wave 3 ($249)"
 *     Agency: $349 (One-time) | 30,000 Credits | Next jump: "+$50 in Wave 3 ($399)"
 * - Wave 3 (100 <= totalCount < 150):
 *     Solo: Closed (Decommissioned)
 *     Pro: $249 (One-time)    | 11,000 Credits | Next jump: "Shifts to $79/mo on launch"
 *     Agency: $399 (One-time) | 27,000 Credits | Next jump: "Shifts to $159/mo on launch"
 * - Closed / SaaS (totalCount >= 150):
 *     Solo: $39 / month
 *     Pro: $79 / month
 *     Agency: $159 / month
 */

export const CREDIT_PROTECTION_GUARANTEES = [
  {
    title: 'Catch-All & Invalid Free Forever',
    description: '0 credits charged for unverified/catch-all/invalid emails',
  },
  {
    title: '2-for-1 Hard Bounce Credit Guarantee',
    description: '2 replacement credits for every 1 verified email that hard-bounces',
  },
];

export const CARD_LIFETIME_LABEL = 'Never Expire — Use at Your Own Pace';
export const CARD_FAIR_USE_NOTE = 'Daily fair-use limits apply to protect 99%+ deliverability.';

export const MODAL_TIERS = [
  { id: 'Solo', name: 'Solo', anchor: '$199', price: 79, credits: '6,000 Credits' },
  { id: 'Pro', name: 'Pro', anchor: '$349', price: 139, credits: '16,000 Credits', popular: true },
  { id: 'Agency', name: 'Agency', anchor: '$699', price: 269, credits: '45,000 Credits' },
];

/**
 * Returns dynamic pricing configuration and token stack features based on the total waitlist count.
 * @param {number} totalCount
 */
export function getPricingPlans(totalCount = 0) {
  const count = typeof totalCount === 'number' && !Number.isNaN(totalCount)
    ? Math.max(0, totalCount)
    : 0;

  // Wave 1: totalCount < 30
  if (count < 30) {
    return {
      activeWaveTag: '[Wave 1 Active]',
      isClosed: false,
      guarantees: CREDIT_PROTECTION_GUARANTEES,
      creditLabel: CARD_LIFETIME_LABEL,
      fairUseNote: CARD_FAIR_USE_NOTE,
      Starter: {
        id: 'Starter',
        tierKey: 'solo',
        name: 'Solo LTD',
        badge: 'Solo',
        price: 79,
        formattedPrice: '$79',
        anchorPrice: 199,
        formattedAnchorPrice: '$199',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Never pay monthly',
        nextJumpNotice: '+$10 in Wave 2 ($89)',
        ctaText: 'Claim Solo Slot ($79)',
        creditsText: '6,000 never-expiring credits (5,000 + 1,000 Wave 1 bonus)',
        features: [
          '6,000 Lifetime Verified Deliverable Prospects (5,000 + 1,000 Wave 1 Bonus)',
          'In-Page LinkedIn Multi-Capture (10 profiles per view)',
          '2 Concurrent Mailbox Probing Channels',
          '1,000 Daily Prospect Ingestion Limit',
          'Dynamic CSV Mapping & Ingestion Rail',
          'Native 1-Click Exports: Instantly.ai, Smartlead, Lemlist',
          'LinkedIn Human-Pacing Activity Meter',
          '1 User Seat',
        ],
      },
      Pro: {
        id: 'Pro',
        tierKey: 'pro',
        name: 'Pro LTD',
        badge: 'Pro',
        price: 139,
        formattedPrice: '$139',
        anchorPrice: 349,
        formattedAnchorPrice: '$349',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Stack credits forever',
        nextJumpNotice: '+$30 in Wave 2 ($169)',
        ctaText: 'Claim Pro Slot ($139)',
        creditsText: '16,000 never-expiring credits (15,000 + 1,000 Wave 1 bonus)',
        popular: true,
        features: [
          '16,000 Lifetime Verified Deliverable Prospects (15,000 + 1,000 Wave 1 Bonus)',
          'Everything in Solo, plus:',
          '4 Concurrent Mailbox Probing Channels',
          '4,000 Daily Prospect Ingestion Limit',
          'Background CSV Processing Queue (runs even if browser is closed)',
          'Company Email Pattern Detector ({first}.{last} heuristic)',
          'Live MX Host Telemetry (Google Workspace vs Microsoft 365)',
          '1 User Seat',
        ],
      },
      Agency: {
        id: 'Agency',
        tierKey: 'agency',
        name: 'Agency LTD',
        badge: 'Agency',
        price: 269,
        formattedPrice: '$269',
        anchorPrice: 699,
        formattedAnchorPrice: '$699',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Maximum speed & volume',
        nextJumpNotice: '+$80 in Wave 2 ($349)',
        ctaText: 'Claim Agency Slot ($269)',
        creditsText: '45,000 never-expiring credits (40,000 + 5,000 Wave 1 bonus)',
        features: [
          '45,000 Lifetime Verified Deliverable Prospects (40,000 + 5,000 Wave 1 Bonus)',
          'Everything in Pro, plus:',
          '3 Team Operator Seats Included (Unified workspace & shared credit ledger)',
          '8 Concurrent Mailbox Probing Channels (High-throughput priority queue)',
          '10,000 Daily Prospect Ingestion Limit',
          'Low-Latency Real-Time Webhooks (Zapier, Make, HubSpot sync)',
          'Programmatic Enrichment API Rail (POST /api/v1/enrich)',
        ],
      },
    };
  }

  // Wave 2: 30 <= totalCount < 100
  if (count >= 30 && count < 100) {
    return {
      activeWaveTag: '[Wave 2 Active]',
      isClosed: false,
      guarantees: CREDIT_PROTECTION_GUARANTEES,
      creditLabel: CARD_LIFETIME_LABEL,
      fairUseNote: CARD_FAIR_USE_NOTE,
      Starter: {
        id: 'Starter',
        tierKey: 'solo',
        name: 'Solo LTD',
        badge: 'Solo',
        price: 89,
        formattedPrice: '$89',
        anchorPrice: 199,
        formattedAnchorPrice: '$199',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Never pay monthly',
        nextJumpNotice: 'Solo Tier Decommissioned in Wave 3',
        ctaText: 'Claim Solo Slot ($89)',
        creditsText: '4,000 Lifetime Verified Deliverable Prospects',
        features: [
          '4,000 Lifetime Verified Deliverable Prospects (Non-expiring)',
          'In-Page LinkedIn Multi-Capture (10 profiles per view)',
          '2 Concurrent Mailbox Probing Channels',
          '1,000 Daily Prospect Ingestion Limit',
          'Dynamic CSV Mapping & Ingestion Rail',
          'Native 1-Click Exports: Instantly.ai, Smartlead, Lemlist',
          'LinkedIn Human-Pacing Activity Meter',
          '1 User Seat',
        ],
      },
      Pro: {
        id: 'Pro',
        tierKey: 'pro',
        name: 'Pro LTD',
        badge: 'Pro',
        price: 169,
        formattedPrice: '$169',
        anchorPrice: 349,
        formattedAnchorPrice: '$349',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Stack credits forever',
        nextJumpNotice: '+$80 in Wave 3 ($249)',
        ctaText: 'Claim Pro Slot ($169)',
        creditsText: '12,500 Lifetime Verified Deliverable Prospects',
        popular: true,
        features: [
          '12,500 Lifetime Verified Deliverable Prospects (Non-expiring)',
          'Everything in Solo, plus:',
          '4 Concurrent Mailbox Probing Channels',
          '4,000 Daily Prospect Ingestion Limit',
          'Background CSV Processing Queue (runs even if browser is closed)',
          'Company Email Pattern Detector ({first}.{last} heuristic)',
          'Live MX Host Telemetry (Google Workspace vs Microsoft 365)',
          '1 User Seat',
        ],
      },
      Agency: {
        id: 'Agency',
        tierKey: 'agency',
        name: 'Agency LTD',
        badge: 'Agency',
        price: 349,
        formattedPrice: '$349',
        anchorPrice: 699,
        formattedAnchorPrice: '$699',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Maximum speed & volume',
        nextJumpNotice: '+$50 in Wave 3 ($399)',
        ctaText: 'Claim Agency Slot ($349)',
        creditsText: '30,000 Lifetime Verified Deliverable Prospects',
        features: [
          '30,000 Lifetime Verified Deliverable Prospects (Non-expiring)',
          'Everything in Pro, plus:',
          '3 Team Operator Seats Included (Unified workspace & shared credit ledger)',
          '8 Concurrent Mailbox Probing Channels (High-throughput priority queue)',
          '10,000 Daily Prospect Ingestion Limit',
          'Low-Latency Real-Time Webhooks (Zapier, Make, HubSpot sync)',
          'Programmatic Enrichment API Rail (POST /api/v1/enrich)',
        ],
      },
    };
  }

  // Wave 3: 100 <= totalCount < 150
  if (count >= 100 && count < 150) {
    return {
      activeWaveTag: '[Wave 3 Active]',
      isClosed: false,
      guarantees: CREDIT_PROTECTION_GUARANTEES,
      creditLabel: CARD_LIFETIME_LABEL,
      fairUseNote: CARD_FAIR_USE_NOTE,
      Starter: {
        id: 'Starter',
        tierKey: 'solo',
        name: 'Solo LTD',
        badge: 'Solo',
        price: 89,
        formattedPrice: '$89',
        anchorPrice: 199,
        formattedAnchorPrice: '$199',
        priceSuffix: '/ lifetime',
        subtitle: 'Decommissioned in Wave 3',
        nextJumpNotice: 'Solo Tier Decommissioned',
        ctaText: 'Tier Decommissioned',
        creditsText: 'Solo Tier Decommissioned in Wave 3',
        disabled: true,
        features: [
          'Solo Tier Decommissioned in Wave 3',
        ],
      },
      Pro: {
        id: 'Pro',
        tierKey: 'pro',
        name: 'Pro LTD',
        badge: 'Pro',
        price: 249,
        formattedPrice: '$249',
        anchorPrice: 349,
        formattedAnchorPrice: '$349',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Stack credits forever',
        nextJumpNotice: 'Shifts to $79/mo on launch',
        ctaText: 'Claim Pro Slot ($249)',
        creditsText: '11,000 Lifetime Verified Deliverable Prospects',
        popular: true,
        features: [
          '11,000 Lifetime Verified Deliverable Prospects (Non-expiring)',
          'Everything in Solo, plus:',
          '4 Concurrent Mailbox Probing Channels',
          '4,000 Daily Prospect Ingestion Limit',
          'Background CSV Processing Queue (runs even if browser is closed)',
          'Company Email Pattern Detector ({first}.{last} heuristic)',
          'Live MX Host Telemetry (Google Workspace vs Microsoft 365)',
          '1 User Seat',
        ],
      },
      Agency: {
        id: 'Agency',
        tierKey: 'agency',
        name: 'Agency LTD',
        badge: 'Agency',
        price: 399,
        formattedPrice: '$399',
        anchorPrice: 699,
        formattedAnchorPrice: '$699',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Maximum speed & volume',
        nextJumpNotice: 'Shifts to $159/mo on launch',
        ctaText: 'Claim Agency Slot ($399)',
        creditsText: '27,000 Lifetime Verified Deliverable Prospects',
        features: [
          '27,000 Lifetime Verified Deliverable Prospects (Non-expiring)',
          'Everything in Pro, plus:',
          '3 Team Operator Seats Included (Unified workspace & shared credit ledger)',
          '8 Concurrent Mailbox Probing Channels (High-throughput priority queue)',
          '10,000 Daily Prospect Ingestion Limit',
          'Low-Latency Real-Time Webhooks (Zapier, Make, HubSpot sync)',
          'Programmatic Enrichment API Rail (POST /api/v1/enrich)',
        ],
      },
    };
  }

  // Closed / SaaS: totalCount >= 150
  return {
    activeWaveTag: '[SaaS Active]',
    isClosed: true,
    guarantees: CREDIT_PROTECTION_GUARANTEES,
    creditLabel: CARD_LIFETIME_LABEL,
    fairUseNote: CARD_FAIR_USE_NOTE,
    Starter: {
      id: 'Starter',
      tierKey: 'solo',
      name: 'Solo',
      badge: 'Solo',
      price: 39,
      formattedPrice: '$39',
      anchorPrice: 39,
      formattedAnchorPrice: '',
      priceSuffix: '/ month',
      subtitle: 'Standard SaaS Rate',
      nextJumpNotice: 'Standard SaaS Rate',
      ctaText: 'Select Solo ($39/mo)',
      creditsText: 'Monthly Deliverable Prospect Allocation',
      features: [
        'Monthly Deliverable Prospect Allocation',
        '2 Concurrent Mailbox Probing Channels',
        '1,000 Daily Prospect Ingestion Limit',
        'Client CSV UI & Batch Validator',
        'Chrome Extension LinkedIn Capture',
        'Built-in MX & Pattern Cache Engine',
      ],
    },
    Pro: {
      id: 'Pro',
      tierKey: 'pro',
      name: 'Pro',
      badge: 'Pro',
      price: 79,
      formattedPrice: '$79',
      anchorPrice: 79,
      formattedAnchorPrice: '',
      priceSuffix: '/ month',
      subtitle: 'Standard SaaS Rate',
      nextJumpNotice: 'Standard SaaS Rate',
      ctaText: 'Select Pro ($79/mo)',
      creditsText: 'Monthly Deliverable Prospect Allocation',
      popular: true,
      features: [
        'Monthly Deliverable Prospect Allocation',
        'Everything in Solo, plus:',
        '4 Concurrent Mailbox Probing Channels',
        '4,000 Daily Prospect Ingestion Limit',
        'Background CSV Processing Queue (runs even if browser is closed)',
        'Company Email Pattern Detector ({first}.{last} heuristic)',
        'Live MX Host Telemetry (Google Workspace vs Microsoft 365)',
        '1 User Seat',
      ],
    },
    Agency: {
      id: 'Agency',
      tierKey: 'agency',
      name: 'Agency',
      badge: 'Agency',
      price: 159,
      formattedPrice: '$159',
      anchorPrice: 159,
      formattedAnchorPrice: '',
      priceSuffix: '/ month',
      subtitle: 'Standard SaaS Rate',
      nextJumpNotice: 'Standard SaaS Rate',
      ctaText: 'Select Agency ($159/mo)',
      creditsText: 'Monthly Deliverable Prospect Allocation',
      features: [
        'Monthly Deliverable Prospect Allocation',
        'Everything in Pro, plus:',
        '3 Team Operator Seats Included (Unified workspace & shared credit ledger)',
        '8 Concurrent Mailbox Probing Channels (High-throughput priority queue)',
        '10,000 Daily Prospect Ingestion Limit',
        'Low-Latency Real-Time Webhooks (Zapier, Make, HubSpot sync)',
        'Programmatic Enrichment API Rail (POST /api/v1/enrich)',
      ],
    },
  };
}
