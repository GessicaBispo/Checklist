import { useAuth } from '@/hooks/useAuth';
import { BaseStyles } from '@/styles/base';
import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function LeaveScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    router.replace('/auth/login');
  }, [logout, router]);

  return (
    <View style={[BaseStyles.centered, styles.container]}>
      <View style={styles.iconWrap}>
        <LogOut size={28} color="#B45309" />
      </View>
      <Text style={styles.title}>Saindo da conta</Text>
      <Text style={styles.subtitle}>Redirecionando para o login...</Text>
      <ActivityIndicator size="small" color="#B45309" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBEB',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#B45309',
  },
  loader: {
    marginTop: 16,
  },
});
