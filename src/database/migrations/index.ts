import { getDatabase } from '../client/db';
import { CREATE_USER_PROFILE_TABLE_SQL } from '../schema/profile.schema';

/**
 * Initializes the SQLite database and creates all tables.
 * Safe to execute multiple times (idempotent).
 */
export function initDatabase(): void {
  const db = getDatabase();
  if (!db) return;

  try {
    db.execSync(CREATE_USER_PROFILE_TABLE_SQL);
  } catch (error) {
    console.error('Failed to initialize SQLite database:', error);
  }
}
