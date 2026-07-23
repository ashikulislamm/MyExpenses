import { getDatabase } from '@/database/client/db';
import { UserProfile, CreateUserProfileInput, UpdateUserProfileInput } from '../types/profile.types';
import { validateCreateProfileInput, validateUpdateProfileInput } from '../validation/profile.validation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WEB_PROFILE_STORAGE_KEY = '@myexpenses/web_user_profile';

function mapRowToUserProfile(row: any): UserProfile {
  return {
    id: row.id,
    name: row.name,
    avatarUri: row.avatar_uri ?? null,
    currencyCode: row.currency_code,
    monthStartDay: Number(row.month_start_day),
    monthlyBudget: row.monthly_budget !== null && row.monthly_budget !== undefined ? Number(row.monthly_budget) : null,
    budgetCycle: row.budget_cycle as any,
    trackingSince: row.tracking_since,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const ProfileRepository = {
  async getProfile(): Promise<UserProfile | null> {
    const db = getDatabase();
    if (!db) {
      // Fallback for Web/Memory
      const json = await AsyncStorage.getItem(WEB_PROFILE_STORAGE_KEY);
      return json ? JSON.parse(json) : null;
    }

    try {
      const row = db.getFirstSync('SELECT * FROM user_profile LIMIT 1;');
      if (!row) return null;
      return mapRowToUserProfile(row);
    } catch {
      return null;
    }
  },

  async createProfile(input: CreateUserProfileInput): Promise<UserProfile> {
    const validation = validateCreateProfileInput(input);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      throw new Error(firstError);
    }

    const now = new Date().toISOString();
    const trackingSinceMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      name: input.name.trim(),
      avatarUri: input.avatarUri ?? null,
      currencyCode: input.currencyCode.toUpperCase(),
      monthStartDay: input.monthStartDay ?? 1,
      monthlyBudget: input.monthlyBudget ?? null,
      budgetCycle: input.budgetCycle ?? 'monthly',
      trackingSince: trackingSinceMonth,
      createdAt: now,
      updatedAt: now,
    };

    const db = getDatabase();
    if (!db) {
      await AsyncStorage.setItem(WEB_PROFILE_STORAGE_KEY, JSON.stringify(profile));
      return profile;
    }

    db.runSync(
      `INSERT INTO user_profile (
        id, name, avatar_uri, currency_code, month_start_day, monthly_budget, budget_cycle, tracking_since, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        profile.id,
        profile.name,
        profile.avatarUri,
        profile.currencyCode,
        profile.monthStartDay,
        profile.monthlyBudget,
        profile.budgetCycle,
        profile.trackingSince,
        profile.createdAt,
        profile.updatedAt,
      ]
    );

    return profile;
  },

  async updateProfile(input: UpdateUserProfileInput): Promise<UserProfile> {
    const current = await this.getProfile();
    if (!current) {
      return this.createProfile({
        name: input.name ?? 'User Profile',
        currencyCode: input.currencyCode ?? 'BDT',
        monthlyBudget: input.monthlyBudget !== undefined ? input.monthlyBudget : null,
        monthStartDay: input.monthStartDay ?? 1,
        budgetCycle: input.budgetCycle ?? 'monthly',
        avatarUri: input.avatarUri ?? null,
      });
    }

    const validation = validateUpdateProfileInput(input);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      throw new Error(firstError);
    }

    const updated: UserProfile = {
      ...current,
      name: input.name !== undefined ? input.name.trim() : current.name,
      avatarUri: input.avatarUri !== undefined ? input.avatarUri : current.avatarUri,
      currencyCode: input.currencyCode !== undefined ? input.currencyCode.toUpperCase() : current.currencyCode,
      monthStartDay: input.monthStartDay !== undefined ? input.monthStartDay : current.monthStartDay,
      monthlyBudget: input.monthlyBudget !== undefined ? input.monthlyBudget : current.monthlyBudget,
      budgetCycle: input.budgetCycle !== undefined ? input.budgetCycle : current.budgetCycle,
      updatedAt: new Date().toISOString(),
    };

    const db = getDatabase();
    if (!db) {
      await AsyncStorage.setItem(WEB_PROFILE_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    }

    db.runSync(
      `UPDATE user_profile SET
        name = ?, avatar_uri = ?, currency_code = ?, month_start_day = ?, monthly_budget = ?, budget_cycle = ?, updated_at = ?
      WHERE id = ?;`,
      [
        updated.name,
        updated.avatarUri,
        updated.currencyCode,
        updated.monthStartDay,
        updated.monthlyBudget,
        updated.budgetCycle,
        updated.updatedAt,
        updated.id,
      ]
    );

    return updated;
  },

  async updateName(name: string): Promise<UserProfile> {
    return this.updateProfile({ name });
  },

  async updateAvatar(avatarUri: string | null): Promise<UserProfile> {
    return this.updateProfile({ avatarUri });
  },

  async updateCurrency(currencyCode: string): Promise<UserProfile> {
    return this.updateProfile({ currencyCode });
  },

  async updateMonthlyBudget(monthlyBudget: number | null): Promise<UserProfile> {
    return this.updateProfile({ monthlyBudget });
  },

  async updateMonthStartDay(monthStartDay: number): Promise<UserProfile> {
    return this.updateProfile({ monthStartDay });
  },

  async updateBudgetCycle(budgetCycle: 'weekly' | 'monthly' | 'yearly'): Promise<UserProfile> {
    return this.updateProfile({ budgetCycle });
  },

  async deleteProfile(): Promise<void> {
    const db = getDatabase();
    if (!db) {
      await AsyncStorage.removeItem(WEB_PROFILE_STORAGE_KEY);
      return;
    }

    db.runSync('DELETE FROM user_profile;');
  },
};
