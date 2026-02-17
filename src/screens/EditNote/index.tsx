import { useState } from 'react';

import { useNavigation, NavigationProp } from '@react-navigation/native';

import ScreenContainer from '@/components/ScreenContainer';
import { FAB, TextInput } from 'react-native-paper';
import { HomeStackParams } from '@/routes/home.routes';
import NoteTitle from './components/NoteTitle';
import useStyles from './styles';
import { useTheme } from '@/contexts/themeContext';
import { useDataContext } from '@/contexts/dataContext';

export default function EditNote() {
	const navigation = useNavigation<NavigationProp<HomeStackParams>>();
	const { createNote } = useDataContext();
	const { theme } = useTheme();
	const styles = useStyles(theme);

	const [title, setTitle] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	const [content, setContent] = useState('');

	function handleSave() {
		createNote({
			title,
			content,
			tags,
		});
		navigation.navigate('Home');
	}

	return (
		<ScreenContainer>
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
			/>

			<FAB
				icon='content-save'
				variant='primary'
				onPress={handleSave}
				style={{
					position: 'absolute',
					margin: 16,
					right: 20,
					bottom: 40,
				}}
			/>
		</ScreenContainer>
	);
}
