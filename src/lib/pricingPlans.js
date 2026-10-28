/**
 * Pure helper to return dynamic pricing configuration and token stack features based on the total waitlist count.
 * 
 * Wave Escalation Schedule:
 * - Wave 1 (totalCount < 30):
 *     Starter: $69 (One-time) | Next jump notice: "+$20 in Wave 2"
 *     Pro: $149 (One-time)     | Next jump notice: "+$40 in Wave 2"
 *     Agency: $299 (One-time)  | Next jump notice: "+$70 in Wave 2"
 * - Wave 2 (30 <= totalCount < 100):
 *     Starter: $89 (One-time) | Next jump notice: "+$20 in Wave 3"
 *     Pro: $189 (One-time)    | Next jump notice: "+$50 in Wave 3"
 *     Agency: $369 (One-time) | Next jump notice: "+$80 in Wave 3"
 * - Wave 3 (100 <= totalCount < 150):
 *     Starter: $109 (One-time) | Next jump notice: "Shifts to $39/mo on launch"
 *     Pro: $239 (One-time)     | Next jump notice: "Shifts to $79/mo on launch"
 *     Agency: $449 (One-time)  | Next jump notice: "Shifts to $159/mo on launch"
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
        nextJumpNotice: '+$20 in Wave 2',
        ctaText: 'Claim Starter Slot ($69)',
        features: [
          '12,000 Non-Expiring Verification Credits',
          '2 Concurrency Slots (Parallel processing)',
          'Max 2,500 rows / day abuse limit',
          'Client CSV UI & Batch Validator',
          'Chrome Extension LinkedIn Capture',
          'Built-in MX & Pattern Cache Engine',
        ],
      },
      Pro: {
        id: 'Pro',
        name: 'Pro LTD',
        badge: 'Pro',
        price: 149,
        formattedPrice: '$149',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Stack tokens forever',
        nextJumpNotice: '+$40 in Wave 2',
        ctaText: 'Claim Pro Slot ($149)',
        popular: true,
        features: [
          '40,000 Non-Expiring Verification Credits',
          '4 Concurrency Slots',
          'Max 8,000 rows / day abuse limit',
          'Everything in Starter, plus:',
          'Priority Drip Lane',
          'Zero-Bounce SMTP Handshake Engine',
          'Instantly & Smartlead 1-Click Sync',
        ],
      },
      Agency: {
        id: 'Agency',
        name: 'Agency LTD',
        badge: 'Agency',
        price: 299,
        formattedPrice: '$299',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Maximum speed & volume',
        nextJumpNotice: '+$70 in Wave 2',
        ctaText: 'Claim Agency Slot ($299)',
        features: [
          '90,000 Non-Expiring Verification Credits ($0.0033/credit)',
          '8 Concurrency Slots',
          'Max 20,000 rows / day abuse limit',
          'Everything in Pro, plus:',
          'Full API Rail Access & Custom Webhooks',
          '3 Team Member Seats',
          'Dedicated High-Throughput Processing Queue',
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
        nextJumpNotice: '+$20 in Wave 3',
        ctaText: 'Claim Starter Slot ($89)',
        features: [
          '12,000 Non-Expiring Verification Credits',
          '2 Concurrency Slots (Parallel processing)',
          'Max 2,500 rows / day abuse limit',
          'Client CSV UI & Batch Validator',
          'Chrome Extension LinkedIn Capture',
          'Built-in MX & Pattern Cache Engine',
        ],
      },
      Pro: {
        id: 'Pro',
        name: 'Pro LTD',
        badge: 'Pro',
        price: 189,
        formattedPrice: '$189',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Stack tokens forever',
        nextJumpNotice: '+$50 in Wave 3',
        ctaText: 'Claim Pro Slot ($189)',
        popular: true,
        features: [
          '40,000 Non-Expiring Verification Credits',
          '4 Concurrency Slots',
          'Max 8,000 rows / day abuse limit',
          'Everything in Starter, plus:',
          'Priority Drip Lane',
          'Zero-Bounce SMTP Handshake Engine',
          'Instantly & Smartlead 1-Click Sync',
        ],
      },
      Agency: {
        id: 'Agency',
        name: 'Agency LTD',
        badge: 'Agency',
        price: 369,
        formattedPrice: '$369',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Maximum speed & volume',
        nextJumpNotice: '+$80 in Wave 3',
        ctaText: 'Claim Agency Slot ($369)',
        features: [
          '90,000 Non-Expiring Verification Credits ($0.0033/credit)',
          '8 Concurrency Slots',
          'Max 20,000 rows / day abuse limit',
          'Everything in Pro, plus:',
          'Full API Rail Access & Custom Webhooks',
          '3 Team Member Seats',
          'Dedicated High-Throughput Processing Queue',
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
        price: 109,
        formattedPrice: '$109',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Never pay monthly',
        nextJumpNotice: 'Shifts to $39/mo on launch',
        ctaText: 'Claim Starter Slot ($109)',
        features: [
          '12,000 Non-Expiring Verification Credits',
          '2 Concurrency Slots (Parallel processing)',
          'Max 2,500 rows / day abuse limit',
          'Client CSV UI & Batch Validator',
          'Chrome Extension LinkedIn Capture',
          'Built-in MX & Pattern Cache Engine',
        ],
      },
      Pro: {
        id: 'Pro',
        name: 'Pro LTD',
        badge: 'Pro',
        price: 239,
        formattedPrice: '$239',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Stack tokens forever',
        nextJumpNotice: 'Shifts to $79/mo on launch',
        ctaText: 'Claim Pro Slot ($239)',
        popular: true,
        features: [
          '40,000 Non-Expiring Verification Credits',
          '4 Concurrency Slots',
          'Max 8,000 rows / day abuse limit',
          'Everything in Starter, plus:',
          'Priority Drip Lane',
          'Zero-Bounce SMTP Handshake Engine',
          'Instantly & Smartlead 1-Click Sync',
        ],
      },
      Agency: {
        id: 'Agency',
        name: 'Agency LTD',
        badge: 'Agency',
        price: 449,
        formattedPrice: '$449',
        priceSuffix: '/ lifetime',
        subtitle: 'One-time payment • Maximum speed & volume',
        nextJumpNotice: 'Shifts to $159/mo on launch',
        ctaText: 'Claim Agency Slot ($449)',
        features: [
          '90,000 Non-Expiring Verification Credits ($0.0033/credit)',
          '8 Concurrency Slots',
          'Max 20,000 rows / day abuse limit',
          'Everything in Pro, plus:',
          'Full API Rail Access & Custom Webhooks',
          '3 Team Member Seats',
          'Dedicated High-Throughput Processing Queue',
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
      subtitle: 'One-time payment • Never pay monthly',
      nextJumpNotice: 'Standard SaaS Rate',
      ctaText: 'Select Starter ($39/mo)',
      features: [
        '12,000 Non-Expiring Verification Credits',
        '2 Concurrency Slots (Parallel processing)',
        'Max 2,500 rows / day abuse limit',
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
      subtitle: 'One-time payment • Stack tokens forever',
      nextJumpNotice: 'Standard SaaS Rate',
      ctaText: 'Select Pro ($79/mo)',
      popular: true,
      features: [
        '40,000 Non-Expiring Verification Credits',
        '4 Concurrency Slots',
        'Max 8,000 rows / day abuse limit',
        'Everything in Starter, plus:',
        'Priority Drip Lane',
        'Zero-Bounce SMTP Handshake Engine',
        'Instantly & Smartlead 1-Click Sync',
      ],
    },
    Agency: {
      id: 'Agency',
      name: 'Agency',
      badge: 'Agency',
      price: 159,
      formattedPrice: '$159',
      priceSuffix: '/ month',
      subtitle: 'One-time payment • Maximum speed & volume',
      nextJumpNotice: 'Standard SaaS Rate',
      ctaText: 'Select Agency ($159/mo)',
      features: [
        '90,000 Non-Expiring Verification Credits ($0.0033/credit)',
        '8 Concurrency Slots',
        'Max 20,000 rows / day abuse limit',
        'Everything in Pro, plus:',
        'Full API Rail Access & Custom Webhooks',
        '3 Team Member Seats',
        'Dedicated High-Throughput Processing Queue',
      ],
    },
  };
}
