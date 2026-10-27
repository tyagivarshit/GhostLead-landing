/**
 * Pure helper to calculate current active wave and slot metrics.
 * 
 * Logic:
 * - If totalCount < 30: Wave 1 (0 to 29), maxSlots = 30, 70% Off Lifetime Access
 * - If totalCount >= 30 && < 100: Wave 2 (0 to 69), maxSlots = 70, 50% Off Lifetime Access
 * - If totalCount >= 100 && < 150: Wave 3 (0 to 49), maxSlots = 50, Final Wave: 30% Off Lifetime
 * - If totalCount >= 150: isClosed = true, soldOutMessage set
 * 
 * @param {number} totalCount
 * @returns {{
 *   waveName: string,
 *   currentSlots: number,
 *   maxSlots: number,
 *   discountLabel: string,
 *   isClosed: boolean,
 *   soldOutMessage?: string
 * }}
 */
export function calculateWaveMetrics(totalCount = 0) {
  const count = typeof totalCount === 'number' && !Number.isNaN(totalCount)
    ? Math.max(0, totalCount)
    : 0;

  if (count < 30) {
    return {
      waveName: 'Wave 1',
      currentSlots: count,
      maxSlots: 30,
      discountLabel: '70% Off Lifetime Access',
      isClosed: false,
    };
  }

  if (count >= 30 && count < 100) {
    return {
      waveName: 'Wave 2',
      currentSlots: count - 30,
      maxSlots: 70,
      discountLabel: '50% Off Lifetime Access',
      isClosed: false,
    };
  }

  if (count >= 100 && count < 150) {
    return {
      waveName: 'Wave 3',
      currentSlots: count - 100,
      maxSlots: 50,
      discountLabel: 'Final Wave: 30% Off Lifetime',
      isClosed: false,
    };
  }

  return {
    waveName: 'Wave 3',
    currentSlots: 50,
    maxSlots: 50,
    discountLabel: 'Final Wave: 30% Off Lifetime',
    isClosed: true,
    soldOutMessage: 'All Lifetime Access (LTD) slots have been claimed! Join standard launch waitlist.',
  };
}

export const getWaveMetrics = calculateWaveMetrics;
