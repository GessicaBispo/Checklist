import { ThemedText } from '@/components/themed-text';
import { TASKS_COLORS, TASKS_SPACING } from '@/constants/tasksTheme';
import { BASE_COLORS, BaseStyles } from '@/styles/base';
import * as ImagePicker from 'expo-image-picker';
import { PlayCircle, X } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface VideoUploadCardProps {
  videos: ImagePicker.ImagePickerAsset[];
  onPickVideos: () => void;
  onRemoveVideo: (index: number) => void;
  title?: string;
  required?: boolean;
  buttonLabel?: string;
}

function formatFileSize(size?: number | null) {
  if (!size) {
    return 'Arquivo sem tamanho';
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function VideoUploadCard({
  videos,
  onPickVideos,
  onRemoveVideo,
  title = 'Video',
  required = false,
  buttonLabel = 'Selecionar video',
}: VideoUploadCardProps) {
  return (
    <View style={BaseStyles.card}>
      <ThemedText style={styles.title}>
        {title}
        {required ? <ThemedText style={styles.required}> *</ThemedText> : null}
      </ThemedText>

      <TouchableOpacity
        onPress={onPickVideos}
        style={[BaseStyles.dashedBox, styles.uploadBox]}
      >
        <PlayCircle size={20} color={TASKS_COLORS.textSecondary} />
        <ThemedText style={styles.uploadText}>{buttonLabel}</ThemedText>
      </TouchableOpacity>

      <View style={styles.list}>
        {videos.map((video, index) => (
          <View key={`${video.uri}-${index}`} style={styles.videoItem}>
            <View style={styles.iconWrap}>
              <PlayCircle size={20} color={TASKS_COLORS.checkboxActive} />
            </View>

            <View style={styles.videoInfo}>
              <ThemedText numberOfLines={1} style={styles.videoName}>
                {video.fileName || `Video ${index + 1}`}
              </ThemedText>
              <ThemedText style={styles.videoMeta}>
                {formatFileSize(video.fileSize)}
              </ThemedText>
            </View>

            <TouchableOpacity
              onPress={() => onRemoveVideo(index)}
              style={styles.removeButton}
            >
              <X size={16} color={TASKS_COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: TASKS_COLORS.textPrimary,
    marginBottom: TASKS_SPACING.gap,
  },
  required: {
    color: BASE_COLORS.danger,
  },
  uploadBox: {
    borderColor: TASKS_COLORS.checkbox,
  },
  uploadText: {
    fontSize: 14,
    color: TASKS_COLORS.textSecondary,
  },
  list: {
    gap: TASKS_SPACING.photoGap,
    marginTop: TASKS_SPACING.cardPadding,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: TASKS_SPACING.gap,
    backgroundColor: BASE_COLORS.neutralSoft,
    borderRadius: 10,
    padding: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: BASE_COLORS.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfo: {
    flex: 1,
  },
  videoName: {
    fontSize: 14,
    fontWeight: '600',
    color: TASKS_COLORS.textPrimary,
  },
  videoMeta: {
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
});
