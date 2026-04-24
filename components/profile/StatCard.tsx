import { ThemedText } from '@/components/themed-text';
import { PROFILE_SIZES } from '@/constants/profileTheme';
import { Stat } from '@/types/profile';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface StatCardProps {
    stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
    const Icon = stat.icon;

    return (
        <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: stat.bg }]}>
                <Icon size={24} color={stat.color} />
            </View>
            <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
            <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statIcon: {
        width: PROFILE_SIZES.statIcon,
        height: PROFILE_SIZES.statIcon,
        borderRadius: PROFILE_SIZES.statIconRadius,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '600',
    },
    statLabel: {
        fontSize: 12,
        color: '#737373',
    },
});
