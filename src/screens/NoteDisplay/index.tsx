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
import Header from '@/components/Header';
import ScreenContainer from '@/components/ScreenContainer';
import formatDate from '@/utils/formatDate';
import useStyles from './styles';
import Markdown from 'react-native-markdown-display';

export default function NoteDisplay() {
	const { navigate } = useNavigation<NavigationProp<HomeStackParams>>();
	const { params } = useRoute<RouteProp<HomeStackParams, 'NoteDisplay'>>();
	const { note } = params;
	const { theme } = useTheme();
	const styles = useStyles(theme);

	return (
		<ScreenContainer>
			<Header title={note.title} />
			<View style={styles.container}>
				<View style={styles.metadata}>
					<Text>{formatDate(note.ctime || note.mtime)}</Text>
				</View>

				<Markdown>{note.content}</Markdown>
			</View>

			<FAB
				icon='plus'
				variant='primary'
				onPress={() => navigate('EditNote')}
				style={{
					position: 'absolute',
					margin: 16,
					right: 20,
					bottom: 120,
				}}
			/>
		</ScreenContainer>
	);
}
