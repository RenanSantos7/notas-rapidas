import { ReactNode } from 'react';

import { View } from 'react-native';

import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-design-icons';

import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';

interface HeaderProps {
	title: string;
	right?: ReactNode;
	canGoBack?: boolean;
}

export default function Header({
	title,
	right,
	canGoBack = false,
}: HeaderProps) {
	const { goBack } = useNavigation();
	const { theme } = useTheme();
	const styles = useStyles(theme);

	return (
		<View style={styles.container}>
			<View style={styles.left}>
				{canGoBack ? (
					<MaterialIcons
						name='arrow-left'
						color={theme.colors.onSurface}
						size={24}
						onPress={() => {
							if (canGoBack) goBack();
						}}
					/>
				) : null}
				<Text variant='headlineLarge'>{title}</Text>
			</View>
			{right ? right : null}
		</View>
	);
}
