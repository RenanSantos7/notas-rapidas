import { FlatList, View } from 'react-native';

import { NoteProps } from '@/types';
import NotesListItem from '../NotesListItem';
import useStyles from './styles';
import { useTheme } from '@/contexts/themeContext';

interface NotesListProps {
	data: NoteProps[];
}

export default function NotesList({ data }: NotesListProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	return (
		<FlatList
			data={data}
            style={styles.list}
			renderItem={({ item }: { item: NoteProps }) => (
				<NotesListItem note={item} />
			)}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListFooterComponent={() => <View style={{ height: 80 }} />}
		/>
	);
}
