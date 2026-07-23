import { CURRENCY_REGISTRY } from '@/shared/constants/currencies';
import { CreateUserProfileInput, UpdateUserProfileInput } from '../types/profile.types';

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: Record<string, string>;
}

export function validateName(name?: string): string | null {
  if (!name || !name.trim()) {
    return 'Name is required';
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (trimmed.length > 50) {
    return 'Name must not exceed 50 characters';
  }
  return null;
}

export function validateMonthlyBudget(budget?: number | null): string | null {
  if (budget === null || budget === undefined) {
    return null;
  }
  if (typeof budget !== 'number' || isNaN(budget)) {
    return 'Monthly budget must be a valid number';
  }
  if (budget < 0) {
    return 'Monthly budget cannot be negative';
  }
  return null;
}

export function validateCurrencyCode(code?: string): string | null {
  if (!code || !code.trim()) {
    return 'Currency code is required';
  }
  const exists = CURRENCY_REGISTRY.some((c) => c.code === code.toUpperCase());
  if (!exists) {
    return 'Selected currency is not supported';
  }
  return null;
}

export function validateMonthStartDay(day?: number): string | null {
  if (day === undefined || day === null) {
    return null;
  }
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    return 'Month start day must be between 1 and 31';
  }
  return null;
}

export function validateCreateProfileInput(input: CreateUserProfileInput): ValidationResult {
  const errors: Record<string, string> = {};

  const nameError = validateName(input.name);
  if (nameError) errors.name = nameError;

  const currencyError = validateCurrencyCode(input.currencyCode);
  if (currencyError) errors.currencyCode = currencyError;

  const budgetError = validateMonthlyBudget(input.monthlyBudget);
  if (budgetError) errors.monthlyBudget = budgetError;

  const dayError = validateMonthStartDay(input.monthStartDay);
  if (dayError) errors.monthStartDay = dayError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateUpdateProfileInput(input: UpdateUserProfileInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.name !== undefined) {
    const nameError = validateName(input.name);
    if (nameError) errors.name = nameError;
  }

  if (input.currencyCode !== undefined) {
    const currencyError = validateCurrencyCode(input.currencyCode);
    if (currencyError) errors.currencyCode = currencyError;
  }

  if (input.monthlyBudget !== undefined) {
    const budgetError = validateMonthlyBudget(input.monthlyBudget);
    if (budgetError) errors.monthlyBudget = budgetError;
  }

  if (input.monthStartDay !== undefined) {
    const dayError = validateMonthStartDay(input.monthStartDay);
    if (dayError) errors.monthStartDay = dayError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
