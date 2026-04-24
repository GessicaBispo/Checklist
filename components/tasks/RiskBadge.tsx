import { RiskLevel } from '@/types/tasks';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type RiskBadgeProps = {
  level: RiskLevel;
  size?: 'sm' | 'md';
};

const RISK_CONFIG: Record<
  RiskLevel,
  { label: string; backgroundColor: string; textColor: string }
> = {
  low: {
    label: 'Risco baixo',
    backgroundColor: '#ECFDF5',
    textColor: '#047857',
  },
  medium: {
    label: 'Risco medio',
    backgroundColor: '#FEF3C7',
    textColor: '#B45309',
  },
  high: {
    label: 'Risco alto',
    backgroundColor: '#FEF2F2',
    textColor: '#B91C1C',
  },
};

export function RiskBadge({
  level,
  size = 'md',
}: RiskBadgeProps) {
  const config = RISK_CONFIG[level];

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
