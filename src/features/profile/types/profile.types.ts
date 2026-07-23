export type BudgetCycle = 'weekly' | 'monthly' | 'yearly';

export interface UserProfile {
  readonly id: string;
  readonly name: string;
  readonly avatarUri: string | null;
  readonly currencyCode: string;
  readonly monthStartDay: number;
  readonly monthlyBudget: number | null;
  readonly budgetCycle: BudgetCycle;
  readonly trackingSince: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateUserProfileInput {
  readonly name: string;
  readonly currencyCode: string;
  readonly monthlyBudget?: number | null;
  readonly monthStartDay?: number;
  readonly budgetCycle?: BudgetCycle;
  readonly avatarUri?: string | null;
}

export interface UpdateUserProfileInput {
  readonly name?: string;
  readonly avatarUri?: string | null;
  readonly currencyCode?: string;
  readonly monthlyBudget?: number | null;
  readonly monthStartDay?: number;
  readonly budgetCycle?: BudgetCycle;
}
