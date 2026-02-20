import { View } from 'react-native';

import {
	useNavigation,
	NavigationProp,
	useRoute,
	RouteProp,
} from '@react-navigation/native';

import { FAB, Text } from 'react-native-paper';
import { HomeStackParams } from '@/routes/home.routes';
import { useTheme } from '@/contexts/themeContext';
import Content from './components/Content';
import Header from '@/components/Header';
import ScreenContainer from '@/components/ScreenContainer';
import formatDate from '@/utils/formatDate';
import useStyles from './styles';

export default function NoteDisplay() {
	const navigation = useNavigation<NavigationProp<HomeStackParams>>();
	const { params } = useRoute<RouteProp<HomeStackParams, 'NoteDisplay'>>();
	const { note } = params;
	const { theme } = useTheme();
	const styles = useStyles(theme);

	return (
		<ScreenContainer
			contentStyle={{ paddingBottom: 0 }}
			fabOptions={{
				icon: 'pencil',
				action: () => navigation.navigate('EditNote', { note })
			}}
		>
			<Header title={note.title} canGoBack={navigation.canGoBack()} />
			<View style={styles.metadata}>
				<Text>{formatDate(note.ctime || note.mtime)}</Text>
			</View>

			<Content text={note.content} />
		</ScreenContainer>
	);
}
