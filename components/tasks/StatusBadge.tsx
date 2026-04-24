import { BASE_COLORS } from '@/styles/base';
import { TaskStatus } from '@/types/tasks';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type StatusBadgeProps = {
  status: TaskStatus;
  size?: 'sm' | 'md';
};

const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; backgroundColor: string; textColor: string }
> = {
  pending: {
    label: 'Pendente',
    backgroundColor: '#FEF3C7',
    textColor: '#92400E',
  },
  in_progress: {
    label: 'Em andamento',
    backgroundColor: BASE_COLORS.infoSoft,
    textColor: BASE_COLORS.primary,
  },
  blocked: {
    label: 'Bloqueada',
    backgroundColor: BASE_COLORS.dangerSoft,
    textColor: BASE_COLORS.danger,
  },
  completed: {
    label: 'Concluida',
    backgroundColor: BASE_COLORS.successSoft,
    textColor: BASE_COLORS.success,
  },
};

export function StatusBadge({
  status,
  size = 'md',
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <View
      style={[
        styles.badge,
        size === 'sm' ? styles.badgeSm : styles.badgeMd,
        { backgroundColor: config.backgroundColor },
      ]}
    >
      <Text
        style={[
          styles.text,
          size === 'sm' ? styles.textSm : styles.textMd,
          { color: config.textColor },
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeMd: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    fontWeight: '600',
  },
  textSm: {
    fontSize: 11,
  },
  textMd: {
    fontSize: 12,
  },
});
