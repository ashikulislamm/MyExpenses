import { Platform } from 'react-native';

const DB_NAME = 'myexpenses.db';

let dbInstance: any = null;

export function getDatabase(): any {
  if (Platform.OS === 'web') {
    // Web platform returns null to use clean AsyncStorage / Memory fallback
    return null;
  }

  if (!dbInstance) {
    try {
      // Dynamically require expo-sqlite on native platforms only
      const SQLite = require('expo-sqlite');
      dbInstance = SQLite.openDatabaseSync(DB_NAME);
    } catch {
      dbInstance = null;
    }
  }

  return dbInstance;
}
