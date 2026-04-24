import { ChecklistCard } from '@/components/tasks/ChecklistCard';
import { PhotoUploadCard } from '@/components/tasks/PhotoUploadCard';
import { SubmitButton } from '@/components/tasks/SubmitButton';
import { VideoUploadCard } from '@/components/tasks/VideoUploadCard';
import { TASKS_COLORS } from '@/constants/tasksTheme';
import { useChecklistManager } from '@/hooks/useChecklistManager';
import { usePhotoManager } from '@/hooks/usePhotoManager';
import { useVideoManager } from '@/hooks/useVideoManager';
import { BASE_COLORS, BaseStyles } from '@/styles/base';
import { ChecklistItem } from '@/types/tasks';
import { findTaskById, findWorkflowByTaskId } from '@/utils/tasks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlertTriangle, ArrowLeft } from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TaskExecutionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const taskId = Array.isArray(id) ? id[0] : id;

  const workflow = taskId ? findWorkflowByTaskId(taskId) : undefined;
  const task = taskId ? findTaskById(taskId) : undefined;

  const initialChecklist: ChecklistItem[] =
    task?.checklist?.map(item => ({
      text: item,
      completed: false,
    })) || [];

  const { checklist, toggleItem, isCompleted } =
    useChecklistManager(initialChecklist);
  const { photos, pickImages, removePhoto, hasPhotos } = usePhotoManager();
  const { videos, pickVideos, removeVideo, hasVideos } = useVideoManager();

  if (!task || !workflow || !taskId) {
    return (
      <View style={BaseStyles.centered}>
        <Text style={styles.emptyText}>Tarefa nao encontrada</Text>
      </View>
    );
  }

  const checklistCompleted = task.requiresChecklist ? isCompleted() : true;
  const photosCompleted = task.requiresPhoto ? hasPhotos() : true;
  const videosCompleted = task.requiresVideo ? hasVideos() : true;
  const canSubmit = checklistCompleted && photosCompleted && videosCompleted;

  const handleSubmit = () => {
    router.replace('/(tabs)/Tasks');
  };

  const handleReportIssue = () => {
    router.push({
      pathname: '/tasks/[id]/occurrence',
      params: { id: task.id },
    });
  };

  return (
    <ScrollView style={BaseStyles.container} showsVerticalScrollIndicator={false}>
      <View style={[BaseStyles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={20} color={TASKS_COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={BaseStyles.headerTitle}>Executar tarefa</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {task.name}
          </Text>
        </View>
      </View>

      <View style={BaseStyles.content}>
        <View style={[BaseStyles.card, styles.descriptionCard]}>
          <Text style={styles.descriptionText}>{task.description}</Text>
        </View>

        {task.requiresChecklist && checklist.length > 0 ? (
          <ChecklistCard
            checklist={checklist}
            onToggle={toggleItem}
            title="Checklist"
          />
        ) : null}

        {task.requiresPhoto ? (
          <PhotoUploadCard
            photos={photos}
            onPickImages={pickImages}
            onRemovePhoto={removePhoto}
            title="Fotos"
            required={!photosCompleted}
            buttonLabel="Enviar fotos"
          />
        ) : null}

        {task.requiresVideo ? (
          <VideoUploadCard
            videos={videos}
            onPickVideos={pickVideos}
            onRemoveVideo={removeVideo}
            title="Video"
            required={!videosCompleted}
            buttonLabel="Enviar video"
          />
        ) : null}

        <TouchableOpacity
          onPress={handleReportIssue}
          style={styles.issueButton}
        >
          <AlertTriangle size={18} color={BASE_COLORS.warningText} />
          <Text style={styles.issueButtonText}>Reportar ocorrencia</Text>
        </TouchableOpacity>

        <SubmitButton
          enabled={canSubmit}
          onPress={handleSubmit}
          label="Concluir tarefa"
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
  descriptionCard: {
    backgroundColor: BASE_COLORS.infoSoft,
    borderColor: '#BFDBFE',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: TASKS_COLORS.textPrimary,
  },
  issueButton: {
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BASE_COLORS.warning,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  issueButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: BASE_COLORS.warningText,
  },
});
