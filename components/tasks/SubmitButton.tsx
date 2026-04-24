import { ThemedText } from '@/components/themed-text';
import { BaseStyles } from '@/styles/base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface SubmitButtonProps {
  enabled: boolean;
  onPress: () => void;
  label?: string;
}

export function SubmitButton({
  enabled,
  onPress,
  label = 'Finalizar',
}: SubmitButtonProps) {
  return (
    <TouchableOpacity
      disabled={!enabled}
      onPress={onPress}
      style={[
        BaseStyles.primaryButton,
        !enabled && BaseStyles.primaryButtonDisabled,
      ]}
    >
      <ThemedText style={BaseStyles.primaryButtonText}>{label}</ThemedText>
    </TouchableOpacity>
  );
}
