import {
  BASE_COLORS,
  BASE_RADII,
  BASE_SIZES,
  BASE_SPACING,
} from '@/styles/base';

export const PROFILE_COLORS = {
  avatar: BASE_COLORS.primary,
  completed: BASE_COLORS.success,
  completedBg: BASE_COLORS.successSoft,
  pending: BASE_COLORS.primary,
  pendingBg: BASE_COLORS.infoSoft,
  blocked: BASE_COLORS.danger,
  blockedBg: BASE_COLORS.dangerSoft,
  border: BASE_COLORS.border,
  background: BASE_COLORS.surface,
  text: '#737373',
  badgeBg: BASE_COLORS.badgeBg,
  badgeText: BASE_COLORS.badgeText,
  gray: BASE_COLORS.textMuted,
};

export const PROFILE_SPACING = {
  card: BASE_SPACING.md,
  header: BASE_SPACING.lg,
  gap: BASE_SPACING.sm,
  padding: BASE_SPACING.md,
};

export const PROFILE_SIZES = {
  avatar: BASE_SIZES.avatar,
  avatarRadius: BASE_SIZES.avatar / 2,
  statIcon: BASE_SIZES.statIcon,
  performanceIcon: BASE_SIZES.statIcon,
  statIconRadius: BASE_RADII.md,
  performanceIconRadius: BASE_RADII.lg,
};

export const ANIMATION_DURATION = 400;
