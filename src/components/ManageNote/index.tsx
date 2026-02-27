import { useRef } from 'react';

import { ScrollView, TouchableHighlight, View } from 'react-native';

import { Button, Divider, List, Text } from 'react-native-paper';

import { NavigationProp, useNavigation } from '@react-navigation/native';

import { HomeStackParams } from '@/routes/home.routes';
import { NoteProps } from '@/types';
import { useDataContext } from '@/contexts/dataContext';
import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';

interface ManageNoteProps {
	note: NoteProps;
	closeModal: () => void;
}

export default function ManageNote({ note, closeModal }: ManageNoteProps) {
	const navigation = useNavigation<NavigationProp<HomeStackParams>>();
	const { deleteNote, exportNote } = useDataContext();

	const scrollRef = useRef<ScrollView>(null);

	const askedToDelete = useRef(false);

	const { theme } = useTheme();
	const styles = useStyles(theme);

	function scrollToConfirmation() {
		if (!askedToDelete.current) {
			askedToDelete.current = false;
			scrollRef.current.scrollToEnd({ animated: true });
		} else {
			askedToDelete.current = true;
			scrollRef.current.scrollTo({ x: 0, y: 0 });
		}
	}

	function handleEdit() {
		navigation.navigate('EditNote', { note });
		closeModal();
	}

	function handleShare() {
		exportNote(note);
	}

	function handleDelete() {
		deleteNote(note.id);
		closeModal();
	}

	return (
		<ScrollView
			ref={scrollRef}
			scrollEnabled={false}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			horizontal
		>
			<View style={styles.content}>
				<List.Section title='Opções' style={{ marginTop: 0 }}>
					<TouchableHighlight
						underlayColor={theme.colors.onSurfaceDisabled}
						onPress={handleEdit}
					>
						<List.Item
							title='Editar Nota'
							style={styles.listItem}
							titleStyle={styles.listItemTxt}
							left={() => <List.Icon icon='pencil' />}
						/>
					</TouchableHighlight>
				
					<TouchableHighlight
						underlayColor={theme.colors.onSurfaceDisabled}
						onPress={handleShare}
					>
						<List.Item
							title='Compartilhar Nota'
							style={styles.listItem}
							titleStyle={styles.listItemTxt}
							left={() => <List.Icon icon='share-variant' />}
						/>
					</TouchableHighlight>

					<Divider />

					<TouchableHighlight
						onPress={() => {
							scrollToConfirmation();
						}}
						underlayColor={theme.colors.errorContainer}
					>
						<List.Item
							title='Excluir Nota'
							style={styles.listItem}
							titleStyle={styles.danger}
							left={() => (
								<List.Icon
									icon='delete'
									color={theme.colors.error}
								/>
							)}
						/>
					</TouchableHighlight>
				</List.Section>
			</View>

			<View style={styles.content}>
				<Text variant='headlineSmall'>Atenção</Text>
				<Text>Tem certeza de que deseja excluir?</Text>

				<View style={styles.modalFooter}>
					<Button mode='contained' onPress={closeModal}>
						Não
					</Button>

					<Button
						mode='text'
						onPress={handleDelete}
						textColor={theme.colors.error}
					>
						Sim
					</Button>
				</View>
			</View>
		</ScrollView>
	);
}
