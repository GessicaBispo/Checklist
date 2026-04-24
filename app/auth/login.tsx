import { useAuth } from '@/hooks/useAuth';
import { BASE_COLORS } from '@/styles/base';
import { StatusBar } from 'expo-status-bar';
import { Redirect, useRouter } from 'expo-router';
import { LogIn } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canLogin = email.trim().length > 0 && password.trim().length > 0;

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/Tasks" />;
  }

  const handleLogin = () => {
    if (!canLogin) {
      return;
    }

    login();
    router.replace('/(tabs)/Tasks');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#1D4ED8" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.backgroundGlowTop} />
        <View style={styles.backgroundGlowBottom} />

        <View style={styles.content}>
          <View style={styles.hero}>
            <View style={styles.logoWrap}>
              <LogIn size={32} color={BASE_COLORS.primary} />
            </View>

            <Text style={styles.title}>Workflow Mobile</Text>
            <Text style={styles.subtitle}>
              Entre para acessar suas tarefas do dia
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="seu.email@empresa.com"
                placeholderTextColor="#BFDBFE"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={styles.input}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Digite sua senha"
                placeholderTextColor="#BFDBFE"
                secureTextEntry
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={!canLogin}
              style={[
                styles.submitButton,
                !canLogin && styles.submitButtonDisabled,
              ]}
              activeOpacity={0.9}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  !canLogin && styles.submitButtonTextDisabled,
                ]}
              >
                Entrar
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            Fale com o administrador caso precise de acesso
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1D4ED8',
  },
  container: {
    flex: 1,
    backgroundColor: '#1D4ED8',
  },
  backgroundGlowTop: {
    position: 'absolute',
    top: -80,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  backgroundGlowBottom: {
    position: 'absolute',
    bottom: 20,
    left: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(147,197,253,0.18)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoWrap: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#DBEAFE',
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 24,
    padding: 20,
    gap: 18,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DBEAFE',
  },
  input: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#FFF',
    paddingHorizontal: 16,
    fontSize: 15,
  },
  submitButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    shadowColor: '#0F172A',
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.45)',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: BASE_COLORS.primary,
  },
  submitButtonTextDisabled: {
    color: 'rgba(29,78,216,0.65)',
  },
  footerText: {
    marginTop: 24,
    fontSize: 13,
    color: '#DBEAFE',
    textAlign: 'center',
  },
});
