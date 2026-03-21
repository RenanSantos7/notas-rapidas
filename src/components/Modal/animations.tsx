import {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from 'react-native-reanimated';

import { ANIMATIONS_CONFIG } from '@/constants/animations';

export default function useAnimations() {
	const orgDialogTranslateY = 100;
	const orgOpacity = 0;

	const containerOpacity = useSharedValue(orgOpacity);
	const dialogOpacity = useSharedValue(orgOpacity);
	const dialogTranslateY = useSharedValue(orgDialogTranslateY);

	const animStyles = {
		container: useAnimatedStyle(() => ({
			opacity: containerOpacity.value,
		})),
		modal: useAnimatedStyle(() => ({
			opacity: dialogOpacity.value,
			transform: [
				{
					translateY: dialogTranslateY.value,
				},
			],
		})),
	};

	function openningAnimation() {
		containerOpacity.value = withTiming(1, ANIMATIONS_CONFIG);
		dialogOpacity.value = withDelay(200, withTiming(1, ANIMATIONS_CONFIG));
		dialogTranslateY.value = withDelay(
			200,
			withTiming(0, ANIMATIONS_CONFIG),
		);
	}

	function closingAnimation() {
		containerOpacity.value = withTiming(orgOpacity, ANIMATIONS_CONFIG);
		dialogOpacity.value = withDelay(
			200,
			withTiming(orgOpacity, ANIMATIONS_CONFIG),
		);
		dialogTranslateY.value = withDelay(
			200,
			withTiming(orgDialogTranslateY, ANIMATIONS_CONFIG),
		);
	}

	return {
		openningAnimation,
		closingAnimation,
		animStyles,
	};
}
