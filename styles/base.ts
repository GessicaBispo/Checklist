import { StyleSheet } from 'react-native';

export const BASE_COLORS = {
  white: '#FFF',
  background: '#FAFAFA',
  surface: '#FFF',
  border: '#E5E5E5',
  textPrimary: '#171717',
  textSecondary: '#525252',
  textMuted: '#A3A3A3',
  neutralSoft: '#F5F5F5',
  primary: '#2563EB',
  success: '#059669',
  successSoft: '#ECFDF5',
  infoSoft: '#EFF6FF',
  danger: '#DC2626',
  dangerSoft: '#FEF2F2',
  warning: '#F59E0B',
  warningText: '#B45309',
  disabled: '#CCC',
  badgeBg: '#DBEAFE',
  badgeText: '#1D4ED8',
  overlay: 'rgba(0,0,0,0.7)',
} as const;

export const BASE_SPACING = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
} as const;

export const BASE_RADII = {
  sm: 6,
  md: 10,
  lg: 12,
  full: 999,
} as const;

export const BASE_SIZES = {
  checkbox: 22,
  iconSm: 14,
  iconMd: 20,
  iconLg: 24,
  avatar: 64,
  statIcon: 48,
  photoBox: 100,
  uploadBoxHeight: 90,
} as const;

export const BASE_TYPOGRAPHY = {
  caption: 12,
  bodySmall: 13,
  body: 14,
  bodyLarge: 15,
  heading: 16,
  title: 20,
} as const;

export const BaseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE_COLORS.background,
  },
  screen: {
    flex: 1,
    backgroundColor: BASE_COLORS.background,
  },
  content: {
    padding: BASE_SPACING.md,
    gap: BASE_SPACING.sm,
  },
  card: {
    backgroundColor: BASE_COLORS.surface,
    padding: BASE_SPACING.md,
    borderRadius: BASE_RADII.lg,
    borderWidth: 1,
    borderColor: BASE_COLORS.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: BASE_SPACING.sm,
    padding: BASE_SPACING.md,
    backgroundColor: BASE_COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.border,
  },
  screenTitle: {
    fontSize: BASE_TYPOGRAPHY.title,
    fontWeight: '700',
    color: BASE_COLORS.textPrimary,
  },
  headerTitle: {
    fontSize: BASE_TYPOGRAPHY.heading,
    fontWeight: '600',
    color: BASE_COLORS.textPrimary,
  },
  sectionTitle: {
    fontSize: BASE_TYPOGRAPHY.heading,
    fontWeight: '600',
    color: BASE_COLORS.textPrimary,
    marginBottom: BASE_SPACING.sm,
  },
  section: {
    marginBottom: BASE_SPACING.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: BASE_SPACING.xs,
  },
  taskCard: {
    marginBottom: BASE_SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskInfo: {
    flex: 1,
    marginRight: BASE_SPACING.sm,
  },
  taskName: {
    fontSize: BASE_TYPOGRAPHY.bodyLarge,
    fontWeight: '600',
    color: BASE_COLORS.textPrimary,
    marginBottom: BASE_SPACING.xxs,
  },
  taskDescription: {
    fontSize: BASE_TYPOGRAPHY.bodySmall,
    color: BASE_COLORS.textSecondary,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: BASE_SPACING.sm,
  },
  performanceIcon: {
    width: BASE_SIZES.statIcon,
    height: BASE_SIZES.statIcon,
    borderRadius: BASE_RADII.lg,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.infoSoft,
  },
  performanceValue: {
    fontSize: BASE_TYPOGRAPHY.title,
    fontWeight: '700',
    color: BASE_COLORS.textPrimary,
  },
  performanceLabel: {
    fontSize: BASE_TYPOGRAPHY.bodySmall,
    color: BASE_COLORS.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: BASE_SPACING.sm,
    marginTop: BASE_SPACING.md,
  },
  dashedBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: BASE_COLORS.border,
    borderRadius: BASE_RADII.lg,
    minHeight: BASE_SIZES.uploadBoxHeight,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  primaryButton: {
    backgroundColor: BASE_COLORS.success,
    padding: BASE_SPACING.md,
    borderRadius: BASE_RADII.lg,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    backgroundColor: BASE_COLORS.disabled,
  },
  primaryButtonText: {
    color: BASE_COLORS.white,
    fontWeight: '600',
    fontSize: BASE_TYPOGRAPHY.bodyLarge,
  },
});
