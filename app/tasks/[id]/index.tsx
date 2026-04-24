import { RiskBadge } from '@/components/tasks/RiskBadge';
import { StatusBadge } from '@/components/tasks/StatusBadge';
import { TASKS_COLORS } from '@/constants/tasksTheme';
import { BASE_COLORS, BaseStyles } from '@/styles/base';
import { Task } from '@/types/tasks';
import {
  findTaskById,
  findWorkflowByTaskId,
  getTaskDependencies,
} from '@/utils/tasks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
} from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ActionButton({
  label,
  onPress,
  disabled,
  status,
}: {
  label: string;
  onPress: () => void;
  disabled: boolean;
  status: Task['status'];
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.actionButton,
        status === 'completed'
          ? styles.completedButton
          : status === 'blocked'
            ? styles.blockedButton
            : !disabled
              ? styles.primaryButton
              : styles.disabledButton,
      ]}
    >
      <Text
        style={[
          styles.actionButtonText,
          disabled && styles.disabledButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function RequirementItem({ label }: { label: string }) {
  return (
    <View style={styles.requirementRow}>
      <CheckCircle2 size={16} color={TASKS_COLORS.checkboxActive} />
      <Text style={styles.requirementText}>{label}</Text>
    </View>
  );
}

export default function TaskDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const taskId = Array.isArray(id) ? id[0] : id;

  const workflow = taskId ? findWorkflowByTaskId(taskId) : undefined;
  const task = taskId ? findTaskById(taskId) : undefined;

  if (!task || !workflow || !taskId) {
    return (
      <View style={BaseStyles.centered}>
        <Text style={styles.emptyText}>Tarefa nao encontrada</Text>
      </View>
    );
  }

  const dependencies = getTaskDependencies(task, workflow);
  const canStart =
    task.status === 'pending' &&
    dependencies.every(dependency => dependency.status === 'completed');

  const actionDisabled = !canStart && task.status === 'pending';

  const handlePrimaryAction = () => {
    if (task.status === 'blocked') {
      router.push({
        pathname: '/tasks/[id]/blocked',
        params: { id: task.id },
      });
      return;
    }

    router.push({
      pathname: '/tasks/[id]/execute',
      params: { id: task.id },
    });
  };

  const actionLabel =
    task.status === 'completed'
      ? 'Tarefa concluida'
      : task.status === 'blocked'
        ? 'Ver bloqueio'
        : task.status === 'in_progress'
          ? 'Continuar tarefa'
          : canStart
            ? 'Iniciar tarefa'
            : 'Aguardando dependencias';

  return (
    <ScrollView style={BaseStyles.container} showsVerticalScrollIndicator={false}>
      <View style={[BaseStyles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={20} color={TASKS_COLORS.textPrimary} />
        </TouchableOpacity>

        <Text style={BaseStyles.headerTitle}>Detalhes da tarefa</Text>
      </View>

      <View style={BaseStyles.content}>
        <View style={BaseStyles.card}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroTitle}>{task.name}</Text>
            <Text style={styles.heroSubtitle}>{workflow.name}</Text>

            <View style={styles.badgesRow}>
              <StatusBadge status={task.status} />
              <RiskBadge level={task.riskLevel} />
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionLabel}>Descricao</Text>
            <Text style={styles.bodyText}>{task.description}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionLabel}>Requisitos</Text>
            <View style={styles.requirementsList}>
              {task.requiresChecklist ? (
                <RequirementItem label="Completar checklist" />
              ) : null}
              {task.requiresPhoto ? (
                <RequirementItem label="Enviar evidencias em foto" />
              ) : null}
              {task.requiresVideo ? (
                <RequirementItem label="Enviar evidencias em video" />
              ) : null}
            </View>
          </View>
        </View>

        {dependencies.length > 0 ? (
          <View style={BaseStyles.card}>
            <Text style={styles.sectionTitle}>Dependencias</Text>

            <View style={styles.dependenciesList}>
              {dependencies.map(dependency => (
                <View key={dependency.id} style={styles.dependencyItem}>
                  <Text style={styles.dependencyName}>{dependency.name}</Text>

                  {dependency.status === 'completed' ? (
                    <CheckCircle2 size={20} color={BASE_COLORS.success} />
                  ) : (
                    <Clock3 size={20} color={BASE_COLORS.warning} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {!canStart && task.status === 'pending' ? (
          <View style={[styles.alertCard, styles.warningCard]}>
            <AlertCircle size={20} color={BASE_COLORS.warningText} />
            <View style={styles.alertContent}>
              <Text style={styles.warningTitle}>Dependencias pendentes</Text>
              <Text style={styles.warningText}>
                Complete as tarefas dependentes antes de iniciar esta atividade.
              </Text>
            </View>
          </View>
        ) : null}

        {task.status === 'blocked' ? (
          <View style={[styles.alertCard, styles.blockedCard]}>
            <AlertCircle size={20} color={BASE_COLORS.danger} />
            <View style={styles.alertContent}>
              <Text style={styles.blockedTitle}>Tarefa bloqueada</Text>
              <Text style={styles.blockedText}>
                Esta tarefa esta bloqueada no momento. Abra os detalhes do bloqueio para entender o motivo.
              </Text>
            </View>
          </View>
        ) : null}

        <ActionButton
          label={actionLabel}
          onPress={handlePrimaryAction}
          disabled={actionDisabled}
          status={task.status}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: TASKS_COLORS.textSecondary,
  },
  heroHeader: {
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: TASKS_COLORS.textPrimary,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: TASKS_COLORS.textSecondary,
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoSection: {
    marginTop: 4,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: TASKS_COLORS.textSecondary,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: TASKS_COLORS.textPrimary,
  },
  requirementsList: {
    gap: 10,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementText: {
    fontSize: 14,
    color: TASKS_COLORS.textPrimary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TASKS_COLORS.textPrimary,
    marginBottom: 12,
  },
  dependenciesList: {
    gap: 8,
  },
  dependencyItem: {
    backgroundColor: BASE_COLORS.neutralSoft,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  dependencyName: {
    flex: 1,
    fontSize: 14,
    color: TASKS_COLORS.textPrimary,
  },
  alertCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  alertContent: {
    flex: 1,
  },
  warningCard: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: BASE_COLORS.warningText,
    marginBottom: 4,
  },
  warningText: {
    fontSize: 13,
    lineHeight: 19,
    color: BASE_COLORS.warningText,
  },
  blockedCard: {
    backgroundColor: BASE_COLORS.dangerSoft,
    borderColor: '#FECACA',
  },
  blockedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: BASE_COLORS.danger,
    marginBottom: 4,
  },
  blockedText: {
    fontSize: 13,
    lineHeight: 19,
    color: BASE_COLORS.danger,
  },
  actionButton: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: BASE_COLORS.primary,
  },
  completedButton: {
    backgroundColor: BASE_COLORS.success,
  },
  blockedButton: {
    backgroundColor: BASE_COLORS.danger,
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
});
