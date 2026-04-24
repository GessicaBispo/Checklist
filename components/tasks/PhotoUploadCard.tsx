import { ThemedText } from '@/components/themed-text';
import {
  TASKS_COLORS,
  TASKS_SIZES,
  TASKS_SPACING,
} from '@/constants/tasksTheme';
import { BASE_COLORS, BaseStyles } from '@/styles/base';
import * as ImagePicker from 'expo-image-picker';
import { Upload, X } from 'lucide-react-native';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface PhotoUploadCardProps {
  photos: ImagePicker.ImagePickerAsset[];
  onPickImages: () => void;
  onRemovePhoto: (index: number) => void;
  title?: string;
  required?: boolean;
  buttonLabel?: string;
}

export function PhotoUploadCard({
  photos,
  onPickImages,
  onRemovePhoto,
  title = 'Fotos',
  required = false,
  buttonLabel = 'Selecionar fotos',
}: PhotoUploadCardProps) {
  return (
    <View style={BaseStyles.card}>
      <ThemedText style={styles.title}>
        {title}
        {required ? <ThemedText style={styles.required}> *</ThemedText> : null}
      </ThemedText>

      <TouchableOpacity
        onPress={onPickImages}
        style={[BaseStyles.dashedBox, styles.uploadBox]}
      >
        <Upload size={20} color={TASKS_COLORS.textSecondary} />
        <ThemedText style={styles.uploadText}>{buttonLabel}</ThemedText>
      </TouchableOpacity>

      <View style={styles.row}>
        {photos.map((photo, index) => (
          <View key={index} style={styles.photoContainer}>
            <Image
              source={{ uri: photo.uri }}
              style={styles.image}
            />

            <TouchableOpacity
              onPress={() => onRemovePhoto(index)}
              style={styles.removeBtn}
            >
              <X size={14} color={BASE_COLORS.white} />
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: TASKS_SPACING.photoGap,
    marginTop: TASKS_SPACING.cardPadding,
  },
  photoContainer: {
    width: TASKS_SIZES.photoBox,
    height: TASKS_SIZES.photoBox,
    borderRadius: TASKS_SIZES.photoRadius,
    overflow: 'hidden',
    backgroundColor: BASE_COLORS.neutralSoft,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: BASE_COLORS.overlay,
    borderRadius: 12,
    padding: 4,
  },
});
