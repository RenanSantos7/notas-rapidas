import { View } from 'react-native';

import { Text } from 'react-native-paper';

import useStyles from './styles';
import { useTheme } from '@/contexts/themeContext';
import { ReactNode } from 'react';

interface HeaderProps {
	title: string;
	rightComponent?: ReactNode;
}

export default function Header(props: HeaderProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	return (
		<View style={styles.container}>
			<Text variant='headlineLarge'>{props.title}</Text>
			{props.rightComponent ? props.rightComponent : null}
		</View>
	);
}
