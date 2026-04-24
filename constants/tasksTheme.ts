import {
  BASE_COLORS,
  BASE_RADII,
  BASE_SIZES,
  BASE_SPACING,
} from '@/styles/base';

export const TASKS_COLORS = {
  background: BASE_COLORS.background,
  card: BASE_COLORS.surface,
  border: BASE_COLORS.border,
  checkbox: '#D4D4D4',
  checkboxActive: BASE_COLORS.primary,
  textPrimary: BASE_COLORS.textPrimary,
  textSecondary: BASE_COLORS.textSecondary,
  textGray: BASE_COLORS.textMuted,
  successButton: BASE_COLORS.success,
  warningBorder: BASE_COLORS.warning,
  warningText: BASE_COLORS.warningText,
  disabledButton: BASE_COLORS.disabled,
};

export const TASKS_SPACING = {
  header: BASE_SPACING.md,
  content: BASE_SPACING.md,
  cardPadding: BASE_SPACING.md,
  gap: BASE_SPACING.sm,
  itemGap: 10,
  photoGap: BASE_SPACING.xs,
  button: BASE_SPACING.md,
};

export const TASKS_SIZES = {
  checkbox: BASE_SIZES.checkbox,
  checkboxRadius: BASE_RADII.sm,
  checkboxBorder: 2,
  checkIcon: BASE_SIZES.iconSm,
  cardRadius: BASE_RADII.lg,
  photoBox: BASE_SIZES.photoBox,
  photoRadius: BASE_RADII.md,
  headerRadius: BASE_RADII.lg,
  button: BASE_SPACING.md,
};

export const TASKS_ANIMATION = {
  checkDuration: 200,
};
