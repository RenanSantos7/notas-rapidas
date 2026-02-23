import { useMemo, useState } from 'react';

import { View } from 'react-native';

import { Divider, Searchbar, Text } from 'react-native-paper';
import { useDataContext } from '@/contexts/dataContext';
import { useTheme } from '@/contexts/themeContext';
import Header from '@/components/Header';
import NotesList from '@/components/NotesList';
import ScreenContainer from '@/components/ScreenContainer';
import useStyles from './styles';

export default function Search() {
	const { theme } = useTheme();
	const { notes } = useDataContext();
	const styles = useStyles(theme);

	const [query, setQuery] = useState('');

	const filteredNotesByTitle = useMemo(() => {
		if (!query) return [];

		return notes.filter(note =>
			note.title.toLowerCase().includes(query.toLowerCase()),
		);
	}, [notes, query]);

	const filteredNotesByContent = useMemo(() => {
		if (!query) return [];

		const titleIds = new Set(filteredNotesByTitle.map(note => note.id));

		return notes.filter(
			note =>
				!titleIds.has(note.id) &&
				note.content.toLowerCase().includes(query.toLowerCase()),
		);
	}, [filteredNotesByTitle, notes, query]);

	return (
		<ScreenContainer>
			<Header title='Pesquisar' />

			<Searchbar
				value={query}
				onChangeText={setQuery}
				placeholder='Pesquise por nome ou conteúdo da nota'
			/>

			<View style={styles.resultsContainer}>
				<NotesList
					data={filteredNotesByTitle}
					voidMessage={{
						message: 'Nenhuma nota encontrada.',
						whereShow: !!query,
					}}
				/>

				{filteredNotesByContent?.length ? (
					<View>
						{filteredNotesByTitle.length ? <Divider /> : null}
						<Text>{`Notas com ${query}`}</Text>
						<NotesList
							data={filteredNotesByContent}
							voidMessage={{
								message: 'Nenhuma nota encontrada.',
								whereShow: !!query,
							}}
						/>
					</View>
				) : null}
			</View>
		</ScreenContainer>
	);
}
