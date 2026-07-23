export const CREATE_USER_PROFILE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS user_profile (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  avatar_uri TEXT,
  currency_code TEXT NOT NULL DEFAULT 'BDT',
  month_start_day INTEGER NOT NULL DEFAULT 1,
  monthly_budget REAL,
  budget_cycle TEXT NOT NULL DEFAULT 'monthly',
  tracking_since TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
`;
