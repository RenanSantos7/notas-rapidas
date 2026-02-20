import { useState } from 'react';

import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';

import ScreenContainer from '@/components/ScreenContainer';
import { TextInput } from 'react-native-paper';
import { HomeStackParams } from '@/routes/home.routes';
import NoteTitle from './components/NoteTitle';
import useStyles from './styles';
import { useTheme } from '@/contexts/themeContext';
import { useDataContext } from '@/contexts/dataContext';
import TextEditor from './components/TextEditor';

export default function EditNote() {
	const navigation = useNavigation<NavigationProp<HomeStackParams>>();
	const { params } = useRoute<RouteProp<HomeStackParams, 'EditNote'>>()
	const { createNote } = useDataContext();
	const { theme } = useTheme();
	const styles = useStyles(theme);

	const [title, setTitle] = useState(() => params?.note.title ?? '');
	const [tags, setTags] = useState<string[]>(() => params?.note.tags ?? []);
	const [content, setContent] = useState(() => params?.note.content ?? '');

	function handleSave() {
		createNote({
			title,
			content,
			tags,
		});
		navigation.navigate('Home');
	}

	return (
		<ScreenContainer noPadding contentStyle={styles.container}>
			<NoteTitle title={title} setTitle={setTitle} />

			<TextInput
				mode='outlined'
				label='Tags'
				placeholder='Separe as tags por vírgula'
				style={styles.tagsInput}
				placeholderTextColor={theme.colors.backdrop}
				value={tags.join(', ')}
				onChangeText={text => setTags(text.split(', '))}
				right={
					<TextInput.Icon icon='tag' color={theme.colors.backdrop} />
				}
				autoCapitalize='none'
			/>

			<TextEditor
				value={content}
				onChange={setContent}
				onSave={handleSave}
			/>
		</ScreenContainer>
	);
}
