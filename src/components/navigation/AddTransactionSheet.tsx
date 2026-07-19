import React, { useCallback, useRef } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  Animated as RNAnimated,
} from 'react-native';
import { SymbolView, SymbolViewProps } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from '@/theme';

interface ActionItem {
  readonly id: string;
  readonly iosSymbol: string;
  readonly androidSymbol: string;
  readonly title: string;
  readonly color: string;
}

export interface AddTransactionSheetProps {
  readonly visible: boolean;
  readonly onClose: () => void;
}

const ACTION_ITEMS: ActionItem[] = [
  {
    id: 'expense',
    iosSymbol: 'arrow.up.circle',
    androidSymbol: 'arrow_upward',
    title: 'Expense',
    color: '#DC2626',
  },
  {
    id: 'income',
    iosSymbol: 'arrow.down.circle',
    androidSymbol: 'arrow_downward',
    title: 'Income',
    color: '#16A34A',
  },
  {
    id: 'transfer',
    iosSymbol: 'arrow.left.arrow.right',
    androidSymbol: 'swap_horiz',
    title: 'Transfer',
    color: '#2563EB',
  },
];

function ActionRow({
  item,
  onPress,
  index,
}: {
  item: ActionItem;
  onPress: (id: string) => void;
  index: number;
}) {
  return (
    <Pressable
      onPress={() => onPress(item.id)}
      accessibilityLabel={item.title}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.actionRow,
        index < ACTION_ITEMS.length - 1 && styles.actionRowBorder,
        pressed && styles.actionRowPressed,
      ]}
    >
      <View style={styles.actionIconContainer}>
        <SymbolView
          name={{ ios: item.iosSymbol, android: item.androidSymbol, web: item.androidSymbol } as SymbolViewProps['name']}
          size={22}
          tintColor={item.color}
          weight="medium"
        />
      </View>
      <Text style={styles.actionTitle}>{item.title}</Text>
    </Pressable>
  );
}

export function AddTransactionSheet({ visible, onClose }: AddTransactionSheetProps) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new RNAnimated.Value(0)).current;
  const fadeAnim = useRef(new RNAnimated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      RNAnimated.parallel([
        RNAnimated.timing(slideAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        RNAnimated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      RNAnimated.parallel([
        RNAnimated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        RNAnimated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim]);

  const handleAction = useCallback((_id: string) => {
    onClose();
  }, [onClose]);

  const sheetTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <RNAnimated.View
        style={[
          styles.backdrop,
          { opacity: fadeAnim },
        ]}
      >
        <Pressable
          style={styles.backdropPressable}
          onPress={onClose}
          accessibilityLabel="Close"
          accessibilityRole="button"
        />
      </RNAnimated.View>

      <RNAnimated.View
        style={[
          styles.sheet,
          {
            paddingBottom: insets.bottom + 8,
            transform: [{ translateY: sheetTranslateY }],
          },
        ]}
      >
        <View style={styles.handleRow}>
          <View style={styles.handle} />
        </View>

        <Text style={styles.title}>Record Transaction</Text>

        <View style={styles.actionsContainer}>
          {ACTION_ITEMS.map((item, index) => (
            <ActionRow
              key={item.id}
              item={item}
              onPress={handleAction}
              index={index}
            />
          ))}
        </View>

        <Pressable
          onPress={onClose}
          accessibilityLabel="Cancel"
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.cancelButton,
            pressed && styles.cancelButtonPressed,
          ]}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </RNAnimated.View>
    </Modal>
  );
}

const styles = createStyles((t) => ({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    zIndex: 0,
  },
  backdropPressable: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: t.colors.card,
    borderTopLeftRadius: t.radius.xxl,
    borderTopRightRadius: t.radius.xxl,
    paddingHorizontal: t.spacing.xxl,
    paddingTop: t.spacing.md,
    zIndex: 1,
  },
  handleRow: {
    alignItems: 'center',
    paddingBottom: t.spacing.lg,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: t.colors.border,
    opacity: 0.8,
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    color: t.colors.text.primary,
    textAlign: 'center',
    letterSpacing: -0.2,
    marginBottom: t.spacing.xxl,
  },
  actionsContainer: {
    backgroundColor: t.colors.backgroundSecondary,
    borderRadius: t.radius.md,
    overflow: 'hidden',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: t.spacing.lg,
    paddingHorizontal: t.spacing.lg,
    gap: t.spacing.lg,
    minHeight: 56,
  },
  actionRowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: t.colors.border,
  },
  actionRowPressed: {
    backgroundColor: t.colors.surface,
  },
  actionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: t.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    color: t.colors.text.primary,
    letterSpacing: -0.1,
  },
  cancelButton: {
    marginTop: t.spacing.md,
    marginBottom: t.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: t.spacing.lg,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.backgroundSecondary,
    minHeight: 56,
  },
  cancelButtonPressed: {
    backgroundColor: t.colors.surface,
  },
  cancelText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    color: t.colors.text.secondary,
    letterSpacing: -0.1,
  },
}));
