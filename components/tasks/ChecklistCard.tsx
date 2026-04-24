import { ThemedText } from '@/components/themed-text';
import {
  TASKS_COLORS,
  TASKS_SIZES,
  TASKS_SPACING,
} from '@/constants/tasksTheme';
import { BASE_COLORS, BaseStyles } from '@/styles/base';
import { ChecklistItem } from '@/types/tasks';
import { Check } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ChecklistCardProps {
  checklist: ChecklistItem[];
  onToggle: (index: number) => void;
  title?: string;
}

export function ChecklistCard({
  checklist,
  onToggle,
  title,
}: ChecklistCardProps) {
  return (
    <View style={BaseStyles.card}>
      {title ? (
        <ThemedText style={styles.title}>{title}</ThemedText>
      ) : null}

      {checklist.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onToggle(index)}
          style={styles.checkItem}
        >
          <View
            style={[
              styles.checkbox,
              item.completed && styles.checkboxActive,
            ]}
          >
            {item.completed && (
              <Check size={TASKS_SIZES.checkIcon} color={BASE_COLORS.white} />
            )}
          </View>

          <ThemedText
            style={[
              styles.checkText,
              item.completed && styles.checkedText,
            ]}
          >
            {item.text}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: TASKS_COLORS.textPrimary,
    marginBottom: TASKS_SPACING.gap,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: TASKS_SPACING.itemGap,
    marginBottom: TASKS_SPACING.itemGap,
  },
  checkbox: {
    width: TASKS_SIZES.checkbox,
    height: TASKS_SIZES.checkbox,
    borderWidth: TASKS_SIZES.checkboxBorder,
    borderColor: TASKS_COLORS.checkbox,
    borderRadius: TASKS_SIZES.checkboxRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: TASKS_COLORS.checkboxActive,
    borderColor: TASKS_COLORS.checkboxActive,
  },
  checkText: {
    flex: 1,
    fontSize: 14,
    color: TASKS_COLORS.textPrimary,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
});
