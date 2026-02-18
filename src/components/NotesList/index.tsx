import { FlatList, View } from 'react-native';

import { Text } from 'react-native-paper';

import { NoteProps } from '@/types';
import { useTheme } from '@/contexts/themeContext';
import NotesListItem from './item';
import useStyles from './styles';

interface NotesListProps {
	data: NoteProps[];
	voidMessage?: string | { whereShow: boolean; message: string };
}

export default function NotesList({ data, voidMessage }: NotesListProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	const showVoidMessage =
		(typeof voidMessage === 'string' && voidMessage != '') ||
		(typeof voidMessage === 'object' &&
			voidMessage?.whereShow &&
			voidMessage?.message);

	if (showVoidMessage) {
		return (
			<View style={styles.voidListContainer}>
				<Text>
					{typeof voidMessage == 'string'
						? voidMessage
						: voidMessage.message}
				</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={data}
			contentContainerStyle={styles.list}
			renderItem={({ item }: { item: NoteProps }) => (
				<NotesListItem note={item} />
			)}
			ListFooterComponent={() => <View style={{ height: 80 }} />}
		/>
	);
}
