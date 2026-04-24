import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AlertTriangle,
  Briefcase,
  CheckCircle2,
  Clock,
  Mail,
  TrendingUp,
} from 'lucide-react-native';

import { StatCard } from '@/components/profile/StatCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  PROFILE_COLORS,
  PROFILE_SIZES,
  PROFILE_SPACING,
} from '@/constants/profileTheme';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useProfileAnimation } from '@/hooks/useProfileAnimation';
import { BASE_COLORS, BaseStyles } from '@/styles/base';
import { Stat } from '@/types/profile';
import { getInitials } from '@/utils/string';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const currentUser = useCurrentUser();
  const { fadeAnim, translateY } = useProfileAnimation();

  const stats: Stat[] = [
    {
      label: 'Completed',
      value: currentUser.tasksCompleted,
      icon: CheckCircle2,
      color: PROFILE_COLORS.completed,
      bg: PROFILE_COLORS.completedBg,
    },
    {
      label: 'Pending',
      value: currentUser.tasksPending,
      icon: Clock,
      color: PROFILE_COLORS.pending,
      bg: PROFILE_COLORS.pendingBg,
    },
    {
      label: 'Blocked',
      value: currentUser.tasksBlocked,
      icon: AlertTriangle,
      color: PROFILE_COLORS.blocked,
      bg: PROFILE_COLORS.blockedBg,
    },
  ];

  const initials = getInitials(currentUser.name);

  return (
    <ThemedView style={BaseStyles.container}>
      <View style={[BaseStyles.header, { paddingTop: insets.top + 16 }]}>
        <ThemedText style={BaseStyles.screenTitle}>Perfil</ThemedText>
      </View>

      <View style={BaseStyles.content}>
        <Animated.View
          style={[
            BaseStyles.card,
            { opacity: fadeAnim, transform: [{ translateY }] },
          ]}
        >
          <View style={styles.identityRow}>
            <View style={styles.avatar}>
              <ThemedText style={styles.avatarText}>{initials}</ThemedText>
            </View>

            <View style={styles.userMeta}>
              <ThemedText style={styles.name}>{currentUser.name}</ThemedText>

              <View style={styles.badge}>
                <ThemedText style={styles.badgeText}>
                  {currentUser.role}
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <Mail size={20} color={PROFILE_COLORS.gray} />
              <ThemedText>{currentUser.email}</ThemedText>
            </View>

            <View style={styles.infoRow}>
              <Briefcase size={20} color={PROFILE_COLORS.gray} />
              <ThemedText>{currentUser.role}</ThemedText>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            BaseStyles.card,
            { opacity: fadeAnim, transform: [{ translateY }] },
          ]}
        >
          <View style={BaseStyles.performanceHeader}>
            <View style={styles.performanceIcon}>
              <TrendingUp size={24} color={PROFILE_COLORS.pending} />
            </View>

            <View>
              <ThemedText style={styles.performanceValue}>
                {currentUser.performance}%
              </ThemedText>
              <ThemedText style={styles.performanceLabel}>
                Performance Score
              </ThemedText>
            </View>
          </View>

          <View style={BaseStyles.statsRow}>
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </View>
        </Animated.View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: PROFILE_SPACING.gap,
    marginBottom: PROFILE_SPACING.card,
  },
  avatar: {
    width: PROFILE_SIZES.avatar,
    height: PROFILE_SIZES.avatar,
    borderRadius: PROFILE_SIZES.avatarRadius,
    backgroundColor: PROFILE_COLORS.avatar,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: BASE_COLORS.white,
    fontSize: 22,
    fontWeight: '600',
  },
  userMeta: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  badge: {
    backgroundColor: PROFILE_COLORS.badgeBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: PROFILE_COLORS.badgeText,
    fontSize: 12,
    fontWeight: '500',
  },
  infoList: {
    gap: PROFILE_SPACING.gap,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  performanceIcon: {
    width: PROFILE_SIZES.performanceIcon,
    height: PROFILE_SIZES.performanceIcon,
    borderRadius: PROFILE_SIZES.performanceIconRadius,
    backgroundColor: PROFILE_COLORS.pendingBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 28,
    fontWeight: '600',
  },
  performanceLabel: {
    fontSize: 12,
    color: PROFILE_COLORS.text,
  },
});
