import { ReactNode, useEffect } from 'react';

import { Pressable } from 'react-native';

import Animated from 'react-native-reanimated';

import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';
import useAnimations from './animations';

interface ModalProps {
	children: ReactNode;
	visible: boolean;
	close: () => void;
}

export default function Modal({ children, visible, close }: ModalProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	const { openningAnimation, closingAnimation, animStyles } = useAnimations();

	useEffect(() => {
		if (visible) {
			openningAnimation();
		} else {
			closingAnimation();
		}
	}, [visible]);

	if (!visible) return null;

	return (
		<Animated.View style={[styles.container, animStyles.container]}>
			<Pressable style={styles.shadow} onPress={close} />
			<Animated.View style={[styles.modal, animStyles.modal]}>
				{children}
			</Animated.View>
		</Animated.View>
	);
}
