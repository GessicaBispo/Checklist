import { ANIMATION_DURATION } from '@/constants/profileTheme';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useProfileAnimation() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, translateY]);

    return { fadeAnim, translateY };
}
