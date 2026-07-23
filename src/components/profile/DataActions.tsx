import React from 'react';
import { View, Text, Alert } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { DataActionRow } from './DataActionRow';
import { createStyles } from '@/theme';

export interface DataActionsProps {
  readonly onExport?: () => void;
  readonly onImport?: () => void;
}

export function DataActions({ onExport, onImport }: DataActionsProps) {
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      Alert.alert('Export Data', 'Exporting local financial records to JSON file...');
    }
  };

  const handleImport = () => {
    if (onImport) {
      onImport();
    } else {
      Alert.alert('Import Backup', 'Select a JSON backup file to restore records...');
    }
  };

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(250)} style={styles.container}>
      <Text style={styles.sectionTitle}>Your Data</Text>

      <View style={styles.groupedList}>
        <DataActionRow
          title="Export My Data"
          description="Save a copy of your financial data"
          iconName={{ ios: 'square.and.arrow.up', android: 'upload', web: 'upload' }}
          bgColor="#F0F9FF"
          iconColor="#0284C7"
          onPress={handleExport}
        />
        <DataActionRow
          title="Import Backup"
          description="Restore data from another device"
          iconName={{ ios: 'square.and.arrow.down', android: 'download', web: 'download' }}
          bgColor="#FDF2F8"
          iconColor="#DB2777"
          isLast
          onPress={handleImport}
        />
      </View>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    width: '100%',
    paddingHorizontal: t.spacing.md,
    marginBottom: t.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: t.colors.text.primary,
    marginBottom: t.spacing.xs,
    paddingHorizontal: t.spacing.xs,
  },
  groupedList: {
    width: '100%',
    backgroundColor: t.colors.card,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    overflow: 'hidden',
    ...t.shadows.xs,
  },
}));
