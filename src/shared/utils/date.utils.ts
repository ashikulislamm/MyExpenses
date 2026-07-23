export interface FinancialPeriod {
  readonly startDate: Date;
  readonly endDate: Date;
  readonly label: string;
}

/**
 * Returns ordinal string for a day number (e.g. 1 -> "1st", 25 -> "25th").
 */
export function formatOrdinalDay(day: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = day % 100;
  return day + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Calculates the start date of the financial month for a given reference date and monthStartDay.
 */
export function getFinancialMonthStart(referenceDate: Date = new Date(), monthStartDay: number = 1): Date {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const day = referenceDate.getDate();

  // Clamp monthStartDay to valid days for the month
  const clampedStartDay = Math.min(monthStartDay, 28);

  if (day >= clampedStartDay) {
    // Current financial month started in this calendar month
    return new Date(year, month, clampedStartDay, 0, 0, 0, 0);
  } else {
    // Current financial month started in the previous calendar month
    return new Date(year, month - 1, clampedStartDay, 0, 0, 0, 0);
  }
}

/**
 * Calculates the end date of the financial month for a given reference date and monthStartDay.
 */
export function getFinancialMonthEnd(referenceDate: Date = new Date(), monthStartDay: number = 1): Date {
  const startDate = getFinancialMonthStart(referenceDate, monthStartDay);
  const nextMonthStart = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    startDate.getDate(),
    0,
    0,
    0,
    0
  );
  // End date is 1 millisecond before next month start
  return new Date(nextMonthStart.getTime() - 1);
}

/**
 * Returns full financial period details including start, end, and formatted label.
 */
export function getFinancialPeriod(referenceDate: Date = new Date(), monthStartDay: number = 1): FinancialPeriod {
  const startDate = getFinancialMonthStart(referenceDate, monthStartDay);
  const endDate = getFinancialMonthEnd(referenceDate, monthStartDay);

  const startMonthStr = startDate.toLocaleString('en-US', { month: 'short' });
  const endMonthStr = endDate.toLocaleString('en-US', { month: 'short' });

  const label = monthStartDay === 1
    ? `${startMonthStr} ${startDate.getFullYear()}`
    : `${startDate.getDate()} ${startMonthStr} - ${endDate.getDate()} ${endMonthStr}`;

  return {
    startDate,
    endDate,
    label,
  };
}

/**
 * Alias helper for current period.
 */
export function getCurrentFinancialMonth(monthStartDay: number = 1): FinancialPeriod {
  return getFinancialPeriod(new Date(), monthStartDay);
}
