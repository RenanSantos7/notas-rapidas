import { useState } from 'react';

import { Alert } from 'react-native';

import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from '@react-navigation/native';

import { HomeStackParams } from '@/routes/home.routes';
import { useTheme } from '@/contexts/themeContext';
import { useDataContext } from '@/contexts/dataContext';
import NoteTitle from './components/NoteTitle';
import ScreenContainer from '@/components/ScreenContainer';
import TextEditor from './components/TextEditor';
import isEmptyObj from '@/utils/isEmptyObj';
import useStyles from './styles';
import TagsInput from './components/TagsInput';

export default function EditNote() {
	const navigation = useNavigation<NavigationProp<HomeStackParams>>();
	const { params } = useRoute<RouteProp<HomeStackParams, 'EditNote'>>();
	const { createNote, editNote } = useDataContext();
	const { theme } = useTheme();
	const styles = useStyles(theme);

	const [title, setTitle] = useState(() => params?.note.title ?? '');
	const [tags, setTags] = useState<string[]>(() => params?.note.tags ?? []);
	const [content, setContent] = useState(() => params?.note.content ?? '');

	function handleSave() {
		if (!title.trim()) {
			Alert.alert('Título não pode ficar vazio');
			return;
		}

		const isEditing = !isEmptyObj(params?.note);

		if (isEditing) {
			editNote({
				...params.note,
				title,
				tags,
				content,
			});
		} else {
			createNote({
				title,
				content,
				tags,
			});
		}

		navigation.navigate('Home');
	}

	function handleChangeTitle(text: string) {
		const invalidCharsRegex = /[<>:"/\\|?*\u0000-\u001F]/g;
		const sanitized = text
			.replace(invalidCharsRegex, '')
			.replace(/\s+/g, ' ')
			.trim();

		setTitle(sanitized);
	}

	return (
		<ScreenContainer noPadding contentStyle={styles.container}>
			<NoteTitle title={title} setTitle={handleChangeTitle} />

			<TagsInput
				value={tags.join(', ')}
				onChangeText={text => setTags(text.split(', '))}
			/>

			<TextEditor
				value={content}
				onChange={setContent}
				onSave={handleSave}
			/>
		</ScreenContainer>
	);
}
