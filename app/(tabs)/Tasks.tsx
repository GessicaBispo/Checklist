import { RiskBadge } from '@/components/tasks/RiskBadge';
import { StatusBadge } from '@/components/tasks/StatusBadge';
import { TASKS_COLORS } from '@/constants/tasksTheme';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { BaseStyles } from '@/styles/base';
import { TaskStatus } from '@/types/tasks';
import { getMyTasks } from '@/utils/tasks';
import { useRouter } from 'expo-router';
import { AlertTriangle, ChevronRight } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TaskFilter = 'all' | TaskStatus;

export default function TasksListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const currentUser = useCurrentUser();
  const [filter, setFilter] = useState<TaskFilter>('all');

  const myTasks = useMemo(() => getMyTasks(currentUser), [currentUser]);

  const filteredTasks = useMemo(() => {
    if (filter === 'all') {
      return myTasks;
    }

    return myTasks.filter(task => task.status === filter);
  }, [filter, myTasks]);

  const statusCounts = useMemo(
    () => ({
      pending: myTasks.filter(task => task.status === 'pending').length,
      in_progress: myTasks.filter(task => task.status === 'in_progress').length,
      blocked: myTasks.filter(task => task.status === 'blocked').length,
      completed: myTasks.filter(task => task.status === 'completed').length,
    }),
    [myTasks]
  );

  const filters: { key: TaskFilter; label: string }[] = [
    { key: 'all', label: 'Todas' },
    { key: 'pending', label: `Pendentes (${statusCounts.pending})` },
    { key: 'in_progress', label: `Ativas (${statusCounts.in_progress})` },
    { key: 'blocked', label: `Bloqueadas (${statusCounts.blocked})` },
    { key: 'completed', label: `Concluidas (${statusCounts.completed})` },
  ];

  return (
    <ScrollView style={BaseStyles.container} showsVerticalScrollIndicator={false}>
      <View style={[BaseStyles.header, { paddingTop: insets.top + 16 }]}>
        <View>
          <Text style={BaseStyles.screenTitle}>Minhas tarefas</Text>
          <Text style={styles.headerSubtitle}>{currentUser.name}</Text>
        </View>
      </View>

      <View style={styles.filtersWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map(({ key, label }) => {
            const isActive = filter === key;

            return (
              <TouchableOpacity
                key={key}
                onPress={() => setFilter(key)}
                style={[
                  styles.filterChip,
                  isActive && styles.filterChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={BaseStyles.content}>
        {filteredTasks.map(task => (
          <TouchableOpacity
            key={task.id}
            onPress={() =>
              router.push({
                pathname: '/tasks/[id]',
                params: { id: task.id },
              })
            }
            style={[BaseStyles.card, styles.taskCard]}
          >
            <View style={styles.taskTop}>
              <View style={styles.taskContent}>
                <Text style={styles.taskName}>{task.name}</Text>
                <Text style={styles.workflowName}>{task.workflowName}</Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
              </View>

              <ChevronRight size={20} color={TASKS_COLORS.textGray} />
            </View>

            <View style={styles.badgesRow}>
              <StatusBadge status={task.status} size="sm" />
              <RiskBadge level={task.riskLevel} size="sm" />

              {task.status === 'blocked' ? (
                <View style={styles.attentionBadge}>
                  <AlertTriangle size={12} color="#DC2626" />
                  <Text style={styles.attentionText}>Requer atencao</Text>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}

        {filteredTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhuma tarefa encontrada</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerSubtitle: {
    fontSize: 13,
    color: TASKS_COLORS.textSecondary,
    marginTop: 4,
  },
  filtersWrap: {
    backgroundColor: TASKS_COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: TASKS_COLORS.border,
    paddingVertical: 10,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: TASKS_COLORS.checkboxActive,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: TASKS_COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFF',
  },
  taskCard: {
    gap: 12,
  },
  taskTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '600',
    color: TASKS_COLORS.textPrimary,
    marginBottom: 4,
  },
  workflowName: {
    fontSize: 13,
    color: TASKS_COLORS.textSecondary,
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: TASKS_COLORS.textSecondary,
    lineHeight: 20,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  attentionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF2F2',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  attentionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DC2626',
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: TASKS_COLORS.textSecondary,
  },
});
