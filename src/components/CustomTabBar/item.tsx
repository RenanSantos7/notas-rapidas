import { Pressable, PressableProps, Text, View } from 'react-native';

import MaterialIcon from '@react-native-vector-icons/material-design-icons';

import { MaterialIconName } from '@/types/theme';
import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';
import Animated from 'react-native-reanimated';

interface TabBarItemProps extends PressableProps {
	icon: MaterialIconName;
	iconOnFocus?: MaterialIconName;
	isFocused: boolean;
	label: string;
}

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcon);

export default function TabItem({
	label,
	icon,
	iconOnFocus,
	isFocused,
	...props
}: TabBarItemProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	return (
		<Pressable
			android_ripple={{
				color: theme.colors.primaryContainer,
				borderless: true,
			}}
			style={styles.item}
			{...props}
		>
			<AnimatedIcon
				name={isFocused && !!iconOnFocus ? iconOnFocus : icon}
				color={
					isFocused
						? theme.colors.primary.main
						: theme.colors.text.dark
				}
				size={48}
			/>
			<View style={styles.labelContainer}>
				<Text style={styles.label}>{label}</Text>
			</View>
		</Pressable>
	);
}
