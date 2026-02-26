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

function EmptyList({ message }: { message: NotesListProps['voidMessage'] }) {
	const { theme } = useTheme();
	const styles = useStyles(theme);
	const showVoidMessage =
		(typeof message === 'string' && message != '') ||
		(typeof message === 'object' && message?.whereShow && message?.message);

	if (showVoidMessage) {
		return (
			<View style={styles.voidListContainer}>
				<Text style={styles.voidListMessage}>
					{typeof message == 'string' ? message : message.message}
				</Text>
			</View>
		);
	}
}

export default function NotesGrid({ data, voidMessage }: NotesListProps) {
	const { isLargerScreen, screenWidth, theme } = useTheme();
	const nCol = isLargerScreen ? 3 : 2;
	const styles = useStyles(theme, screenWidth);

	return (
		<FlatList
			data={data}
			contentContainerStyle={styles.list}
			renderItem={({ item }: { item: NoteProps }) => (
				<NotesListItem note={item} />
			)}
			ListFooterComponent={() => <View style={{ height: 80 }} />}
			ListEmptyComponent={() => <EmptyList message={voidMessage} />}
			numColumns={nCol}
			key={`col-${nCol}`}
			columnWrapperStyle={styles.row}
		/>
	);
}
