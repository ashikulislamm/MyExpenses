export interface Currency {
  readonly code: string;
  readonly name: string;
  readonly symbol: string;
  readonly flag: string;
}

export const DEFAULT_CURRENCY_CODE = 'BDT';

export const CURRENCY_REGISTRY: readonly Currency[] = [
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', flag: '🇦🇪' },
] as const;

const CURRENCY_MAP = new Map<string, Currency>(
  CURRENCY_REGISTRY.map((c) => [c.code, c])
);

/**
 * Gets currency object from the registry by code.
 * Defaults to BDT if code is invalid or missing.
 */
export function getCurrency(code?: string | null): Currency {
  if (!code) return CURRENCY_MAP.get(DEFAULT_CURRENCY_CODE)!;
  return CURRENCY_MAP.get(code.toUpperCase()) ?? CURRENCY_MAP.get(DEFAULT_CURRENCY_CODE)!;
}

/**
 * Returns all supported currencies in the registry.
 */
export function getAllCurrencies(): readonly Currency[] {
  return CURRENCY_REGISTRY;
}

/**
 * Formats a numeric amount with the currency symbol.
 */
export function formatCurrencyAmount(amount: number | null | undefined, currencyCode?: string): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'Not set';
  }
  const curr = getCurrency(currencyCode);
  const formattedNumber = Math.abs(amount).toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });
  return `${amount < 0 ? '-' : ''}${curr.symbol} ${formattedNumber}`;
}
