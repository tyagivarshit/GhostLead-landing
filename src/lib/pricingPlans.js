/**
 * Pure helper to return dynamic pricing configuration and token stack features based on the total waitlist count.
 * 
 * Wave Escalation Schedule:
 * - Wave 1 (totalCount < 30):
 *     Starter: $69 (One-time) | Next jump notice: "+$20 in Wave 2 ($89)"
 *     Pro: $129 (One-time)    | Next jump notice: "+$40 in Wave 2 ($169)"
 *     Agency: $249 (One-time) | Next jump notice: "+$100 in Wave 2 ($349)"
 * - Wave 2 (30 <= totalCount < 100):
 *     Starter: $89 (One-time) | Next jump notice: "Starter Tier Decommissioned in Wave 3"
 *     Pro: $169 (One-time)    | Next jump notice: "+$80 in Wave 3 ($249)"
 *     Agency: $349 (One-time) | Next jump notice: "+$50 in Wave 3 ($399)"
 * - Wave 3 (100 <= totalCount < 150):
 *     Starter: Closed (Decommissioned)
 *     Pro: $249 (One-time)     | Next jump notice: "Shifts to $79/mo on launch"
 *     Agency: $399 (One-time)  | Next jump notice: "Shifts to $159/mo on launch"
 * - Closed / SaaS (totalCount >= 150):
 *     Starter: $39 / month
 *     Pro: $79 / month
 *     Agency: $159 / month
 * 
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
      Starter: {
        id: 'Starter',
        name: 'Starter LTD',
        badge: 'Starter',
        price: 69,
        formattedPrice: '$69',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Never pay monthly',
        nextJumpNotice: '+$20 in Wave 2 ($89)',
        ctaText: 'Claim Starter Slot ($69)',
        features: [
          '5,000 Lifetime Verified Deliverable Prospects (Non-expiring)',
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
        name: 'Pro LTD',
        badge: 'Pro',
        price: 129,
        formattedPrice: '$129',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Stack credits forever',
        nextJumpNotice: '+$40 in Wave 2 ($169)',
        ctaText: 'Claim Pro Slot ($129)',
        popular: true,
        features: [
          '15,000 Lifetime Verified Deliverable Prospects (Non-expiring)',
          'Everything in Starter, plus:',
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
        name: 'Agency LTD',
        badge: 'Agency',
        price: 249,
        formattedPrice: '$249',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Maximum speed & volume',
        nextJumpNotice: '+$100 in Wave 2 ($349)',
        ctaText: 'Claim Agency Slot ($249)',
        features: [
          '35,000 Lifetime Verified Deliverable Prospects (Non-expiring)',
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
      Starter: {
        id: 'Starter',
        name: 'Starter LTD',
        badge: 'Starter',
        price: 89,
        formattedPrice: '$89',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Never pay monthly',
        nextJumpNotice: 'Starter Tier Decommissioned in Wave 3',
        ctaText: 'Claim Starter Slot ($89)',
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
        name: 'Pro LTD',
        badge: 'Pro',
        price: 169,
        formattedPrice: '$169',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Stack credits forever',
        nextJumpNotice: '+$80 in Wave 3 ($249)',
        ctaText: 'Claim Pro Slot ($169)',
        popular: true,
        features: [
          '12,500 Lifetime Verified Deliverable Prospects (Non-expiring)',
          'Everything in Starter, plus:',
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
        name: 'Agency LTD',
        badge: 'Agency',
        price: 349,
        formattedPrice: '$349',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Maximum speed & volume',
        nextJumpNotice: '+$50 in Wave 3 ($399)',
        ctaText: 'Claim Agency Slot ($349)',
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
      Starter: {
        id: 'Starter',
        name: 'Starter LTD',
        badge: 'Starter',
        price: 89,
        formattedPrice: '$89',
        priceSuffix: '/ lifetime',
        subtitle: 'Decommissioned in Wave 3',
        nextJumpNotice: 'Starter Tier Decommissioned',
        ctaText: 'Tier Decommissioned',
        disabled: true,
        features: [
          'Starter Tier Decommissioned in Wave 3',
        ],
      },
      Pro: {
        id: 'Pro',
        name: 'Pro LTD',
        badge: 'Pro',
        price: 249,
        formattedPrice: '$249',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Stack credits forever',
        nextJumpNotice: 'Shifts to $79/mo on launch',
        ctaText: 'Claim Pro Slot ($249)',
        popular: true,
        features: [
          '11,000 Lifetime Verified Deliverable Prospects (Non-expiring)',
          'Everything in Starter, plus:',
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
        name: 'Agency LTD',
        badge: 'Agency',
        price: 399,
        formattedPrice: '$399',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Maximum speed & volume',
        nextJumpNotice: 'Shifts to $159/mo on launch',
        ctaText: 'Claim Agency Slot ($399)',
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
    Starter: {
      id: 'Starter',
      name: 'Starter',
      badge: 'Starter',
      price: 39,
      formattedPrice: '$39',
      priceSuffix: '/ month',
      subtitle: 'Standard SaaS Rate',
      nextJumpNotice: 'Standard SaaS Rate',
      ctaText: 'Select Starter ($39/mo)',
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
      name: 'Pro',
      badge: 'Pro',
      price: 79,
      formattedPrice: '$79',
      priceSuffix: '/ month',
      subtitle: 'Standard SaaS Rate',
      nextJumpNotice: 'Standard SaaS Rate',
      ctaText: 'Select Pro ($79/mo)',
      popular: true,
      features: [
        'Monthly Deliverable Prospect Allocation',
        'Everything in Starter, plus:',
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
      name: 'Agency',
      badge: 'Agency',
      price: 159,
      formattedPrice: '$159',
      priceSuffix: '/ month',
      subtitle: 'Standard SaaS Rate',
      nextJumpNotice: 'Standard SaaS Rate',
      ctaText: 'Select Agency ($159/mo)',
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
