import { View, Text, Pressable } from 'react-native';

import useStyles from './styles';
import { useTheme } from '@/contexts/themeContext';

interface HeaderProps {
	title: string;
	onSearch: (query: string) => void;
}

export default function Header(props: HeaderProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{props.title}</Text>
		</View>
	);
}
