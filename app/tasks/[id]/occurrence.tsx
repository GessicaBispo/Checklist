import { TASKS_COLORS } from '@/constants/tasksTheme';
import { BASE_COLORS, BaseStyles } from '@/styles/base';
import { OccurrenceType } from '@/types/tasks';
import { findTaskById } from '@/utils/tasks';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlertTriangle, ArrowLeft, Info, Upload, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function formatFileSize(size?: number | null) {
  if (!size) {
    return 'Arquivo sem tamanho';
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function OccurrenceCreateScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const taskId = Array.isArray(id) ? id[0] : id;
  const task = taskId ? findTaskById(taskId) : undefined;

  const [type, setType] = useState<OccurrenceType>('info');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<ImagePicker.ImagePickerAsset[]>([]);

  if (!task || !taskId) {
    return (
      <View style={BaseStyles.centered}>
        <Text style={styles.emptyText}>Tarefa nao encontrada</Text>
      </View>
    );
  }

  const handleAttachmentUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setAttachments(prev => [...prev, ...result.assets]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const handleSubmit = () => {
    if (type === 'error') {
      router.replace({
        pathname: '/tasks/[id]/blocked',
        params: { id: task.id },
      });
      return;
    }

    router.replace('/(tabs)/Tasks');
  };

  return (
    <ScrollView style={BaseStyles.container} showsVerticalScrollIndicator={false}>
      <View style={[BaseStyles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={20} color={TASKS_COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={BaseStyles.headerTitle}>Reportar ocorrencia</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {task.name}
          </Text>
        </View>
      </View>

      <View style={BaseStyles.content}>
        <View style={BaseStyles.card}>
          <Text style={styles.sectionTitle}>Tipo de ocorrencia</Text>

          <View style={styles.typeGrid}>
            <TouchableOpacity
              onPress={() => setType('info')}
              style={[
                styles.typeCard,
                type === 'info' && styles.typeCardInfoActive,
              ]}
            >
              <View
                style={[
                  styles.typeIconWrap,
                  type === 'info' ? styles.typeIconInfo : styles.typeIconNeutral,
                ]}
              >
                <Info
                  size={24}
                  color={type === 'info' ? BASE_COLORS.primary : TASKS_COLORS.textSecondary}
                />
              </View>
              <Text
                style={[
                  styles.typeLabel,
                  type === 'info' && styles.typeLabelInfo,
                ]}
              >
                Informacao
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setType('error')}
              style={[
                styles.typeCard,
                type === 'error' && styles.typeCardErrorActive,
              ]}
            >
              <View
                style={[
                  styles.typeIconWrap,
                  type === 'error' ? styles.typeIconError : styles.typeIconNeutral,
                ]}
              >
                <AlertTriangle
                  size={24}
                  color={type === 'error' ? BASE_COLORS.danger : TASKS_COLORS.textSecondary}
                />
              </View>
              <Text
                style={[
                  styles.typeLabel,
                  type === 'error' && styles.typeLabelError,
                ]}
              >
                Erro / bloqueio
              </Text>
            </TouchableOpacity>
          </View>

          {type === 'error' ? (
            <View style={styles.errorHint}>
              <Text style={styles.errorHintText}>
                Ocorrencias do tipo erro bloqueiam a tarefa ate avaliacao da supervisao ou do cliente.
              </Text>
            </View>
          ) : null}
        </View>

        <View style={BaseStyles.card}>
          <Text style={styles.sectionTitle}>
            Descricao <Text style={styles.required}>*</Text>
          </Text>

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder={
              type === 'info'
                ? 'Descreva observacoes relevantes...'
                : 'Descreva o problema encontrado...'
            }
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            style={styles.textArea}
          />
        </View>

        <View style={BaseStyles.card}>
          <Text style={styles.sectionTitle}>Anexos</Text>
          <Text style={styles.sectionHint}>Opcional</Text>

          <TouchableOpacity
            onPress={handleAttachmentUpload}
            style={[BaseStyles.dashedBox, styles.uploadBox]}
          >
            <Upload size={20} color={TASKS_COLORS.textSecondary} />
            <Text style={styles.uploadText}>Enviar fotos ou videos</Text>
          </TouchableOpacity>

          <View style={styles.attachmentList}>
            {attachments.map((attachment, index) => (
              <View key={`${attachment.uri}-${index}`} style={styles.attachmentItem}>
                <View style={styles.attachmentIconWrap}>
                  <Upload size={18} color={BASE_COLORS.primary} />
                </View>

                <View style={styles.attachmentInfo}>
                  <Text numberOfLines={1} style={styles.attachmentName}>
                    {attachment.fileName || `Arquivo ${index + 1}`}
                  </Text>
                  <Text style={styles.attachmentMeta}>
                    {formatFileSize(attachment.fileSize)}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => removeAttachment(index)}
                  style={styles.removeButton}
                >
                  <X size={16} color={TASKS_COLORS.textSecondary} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!description.trim()}
          style={[
            styles.submitButton,
            !description.trim()
              ? styles.submitButtonDisabled
              : type === 'error'
                ? styles.submitButtonError
                : styles.submitButtonInfo,
          ]}
        >
          <Text
            style={[
              styles.submitButtonText,
              !description.trim() && styles.submitButtonTextDisabled,
            ]}
          >
            Enviar {type === 'error' ? 'erro' : 'informacao'}
          </Text>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TASKS_COLORS.textPrimary,
    marginBottom: 12,
  },
  sectionHint: {
    fontSize: 13,
    color: TASKS_COLORS.textSecondary,
    marginTop: -6,
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  typeCard: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#D4D4D8',
    borderRadius: 12,
    minHeight: 96,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
  },
  typeCardInfoActive: {
    borderColor: BASE_COLORS.primary,
    backgroundColor: BASE_COLORS.infoSoft,
  },
  typeCardErrorActive: {
    borderColor: BASE_COLORS.danger,
    backgroundColor: BASE_COLORS.dangerSoft,
  },
  typeIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeIconNeutral: {
    backgroundColor: BASE_COLORS.neutralSoft,
  },
  typeIconInfo: {
    backgroundColor: '#DBEAFE',
  },
  typeIconError: {
    backgroundColor: '#FEE2E2',
  },
  typeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: TASKS_COLORS.textSecondary,
    textAlign: 'center',
  },
  typeLabelInfo: {
    color: BASE_COLORS.primary,
  },
  typeLabelError: {
    color: BASE_COLORS.danger,
  },
  errorHint: {
    marginTop: 12,
    backgroundColor: BASE_COLORS.dangerSoft,
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  errorHintText: {
    fontSize: 13,
    lineHeight: 19,
    color: BASE_COLORS.danger,
  },
  required: {
    color: BASE_COLORS.danger,
  },
  textArea: {
    minHeight: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D4D4D8',
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: TASKS_COLORS.textPrimary,
  },
  uploadBox: {
    borderColor: '#D4D4D8',
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '500',
    color: TASKS_COLORS.textSecondary,
  },
  attachmentList: {
    gap: 8,
    marginTop: 16,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: BASE_COLORS.neutralSoft,
    borderRadius: 10,
    padding: 12,
  },
  attachmentIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: BASE_COLORS.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachmentInfo: {
    flex: 1,
  },
  attachmentName: {
    fontSize: 14,
    fontWeight: '600',
    color: TASKS_COLORS.textPrimary,
  },
  attachmentMeta: {
    fontSize: 12,
    color: TASKS_COLORS.textSecondary,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonInfo: {
    backgroundColor: BASE_COLORS.primary,
  },
  submitButtonError: {
    backgroundColor: BASE_COLORS.danger,
  },
  submitButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
  },
  submitButtonTextDisabled: {
    color: '#9CA3AF',
  },
});
