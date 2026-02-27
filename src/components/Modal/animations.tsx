import {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from 'react-native-reanimated';

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
			transform: [{
				translateY: dialogTranslateY.value
			}],
		})),
	};

	const config = {
		duration: 300,
		easing: Easing.inOut(Easing.quad),
	};

	function openningAnimation() {
		containerOpacity.value = withTiming(1, config);
		dialogOpacity.value = withDelay(200, withTiming(1, config));
		dialogTranslateY.value = withDelay(200, withTiming(0, config));
	}

	function closingAnimation() {
		containerOpacity.value = withTiming(orgOpacity, config);
		dialogOpacity.value = withDelay(200, withTiming(orgOpacity, config));
		dialogTranslateY.value = withDelay(
			200,
			withTiming(orgDialogTranslateY, config)
		);
	}

	return {
		openningAnimation,
		closingAnimation,
		animStyles,
	};
}
