import { TASKS_COLORS } from '@/constants/tasksTheme';
import { BASE_COLORS, BaseStyles } from '@/styles/base';
import { findTaskById, getOpenTaskErrors } from '@/utils/tasks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlertTriangle, ArrowLeft, Clock3 } from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default function BlockedTaskScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const taskId = Array.isArray(id) ? id[0] : id;

  const task = taskId ? findTaskById(taskId) : undefined;
  const taskOccurrences = taskId ? getOpenTaskErrors(taskId) : [];

  if (!task || !taskId) {
    return (
      <View style={BaseStyles.centered}>
        <Text style={styles.emptyText}>Tarefa nao encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={BaseStyles.container} showsVerticalScrollIndicator={false}>
      <View style={[BaseStyles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={20} color={TASKS_COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={BaseStyles.headerTitle}>Tarefa bloqueada</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {task.name}
          </Text>
        </View>
      </View>

      <View style={BaseStyles.content}>
        <View style={styles.statusCard}>
          <View style={styles.statusIconWrap}>
            <AlertTriangle size={32} color={BASE_COLORS.danger} />
          </View>
          <Text style={styles.statusTitle}>Execucao interrompida</Text>
          <Text style={styles.statusText}>
            Esta tarefa nao pode seguir ate que as ocorrencias registradas sejam resolvidas.
          </Text>
        </View>

        <View style={BaseStyles.card}>
          <View style={styles.waitingIconWrap}>
            <Clock3 size={24} color={BASE_COLORS.warningText} />
          </View>
          <Text style={styles.waitingTitle}>Aguardando resolucao</Text>
          <Text style={styles.waitingText}>
            Voce sera avisado quando o problema for resolvido e a tarefa puder continuar.
          </Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Ocorrencias reportadas</Text>

          <View style={styles.occurrenceList}>
            {taskOccurrences.map(occurrence => (
              <View key={occurrence.id} style={styles.occurrenceCard}>
                <View style={styles.occurrenceIcon}>
                  <AlertTriangle size={18} color={BASE_COLORS.danger} />
                </View>

                <View style={styles.occurrenceContent}>
                  <Text style={styles.occurrenceType}>ERRO</Text>
                  <Text style={styles.occurrenceDescription}>
                    {occurrence.description}
                  </Text>
                  <Text style={styles.occurrenceAuthor}>
                    Reportado por {occurrence.employeeName}
                  </Text>
                  <Text style={styles.occurrenceDate}>
                    {formatDate(occurrence.createdAt)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>O que fazer agora?</Text>

          <View style={styles.instructionsList}>
            <View style={styles.instructionRow}>
              <View style={styles.bullet} />
              <Text style={styles.instructionText}>
                Fale com a supervisao se precisar de contexto adicional.
              </Text>
            </View>
            <View style={styles.instructionRow}>
              <View style={styles.bullet} />
              <Text style={styles.instructionText}>
                Aguarde a confirmacao de que o problema foi resolvido.
              </Text>
            </View>
            <View style={styles.instructionRow}>
              <View style={styles.bullet} />
              <Text style={styles.instructionText}>
                Siga com outras tarefas disponiveis enquanto isso.
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.replace('/(tabs)/Tasks')}
          style={styles.backToListButton}
        >
          <Text style={styles.backToListText}>Voltar para a lista</Text>
        </TouchableOpacity>
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
  headerText: {
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 13,
    color: TASKS_COLORS.textSecondary,
    marginTop: 2,
  },
  emptyText: {
    fontSize: 14,
    color: TASKS_COLORS.textSecondary,
  },
  statusCard: {
    backgroundColor: BASE_COLORS.dangerSoft,
    borderColor: '#FECACA',
    borderWidth: 2,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  statusIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#991B1B',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#B91C1C',
    textAlign: 'center',
  },
  waitingIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  waitingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TASKS_COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  waitingText: {
    fontSize: 14,
    lineHeight: 20,
    color: TASKS_COLORS.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TASKS_COLORS.textPrimary,
    marginBottom: 12,
  },
  occurrenceList: {
    gap: 12,
  },
  occurrenceCard: {
    backgroundColor: TASKS_COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: BASE_COLORS.danger,
    flexDirection: 'row',
    gap: 12,
  },
  occurrenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
  },
  occurrenceContent: {
    flex: 1,
  },
  occurrenceType: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: '700',
    color: '#B91C1C',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    marginBottom: 8,
  },
  occurrenceDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: TASKS_COLORS.textPrimary,
    marginBottom: 8,
  },
  occurrenceAuthor: {
    fontSize: 13,
    color: TASKS_COLORS.textSecondary,
  },
  occurrenceDate: {
    fontSize: 12,
    color: TASKS_COLORS.textGray,
    marginTop: 4,
  },
  instructionsCard: {
    backgroundColor: BASE_COLORS.infoSoft,
    borderColor: '#BFDBFE',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A8A',
    marginBottom: 12,
  },
  instructionsList: {
    gap: 10,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BASE_COLORS.primary,
    marginTop: 7,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#1D4ED8',
  },
  backToListButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: BASE_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backToListText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
  },
});
