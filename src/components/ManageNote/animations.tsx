import {
    useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import { ANIMATIONS_CONFIG } from '@/constants/animations';

export default function useAnimations() {
    const orgHeight = 200;

    const modalHeight = useSharedValue(orgHeight);

    const animStyles = {
        container: useAnimatedStyle(() => ({
            height: modalHeight.value
        }))
    }

    function decreaseHeight() {
        modalHeight.value = withTiming(120, ANIMATIONS_CONFIG);
    }

    function normalizeHeight() {
        modalHeight.value = withTiming(orgHeight, ANIMATIONS_CONFIG)
    }

    return {
        animStyles,
        decreaseHeight,
        normalizeHeight
    };
}