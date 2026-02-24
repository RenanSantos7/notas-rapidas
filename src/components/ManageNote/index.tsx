import { Pressable, TouchableHighlight, ViewStyle } from 'react-native';

import { Divider, List, Modal, Text } from 'react-native-paper';

import useStyles from './styles';
import { useDataContext } from '@/contexts/dataContext';
import { useTheme } from '@/contexts/themeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NoteProps } from '@/types';
import { HomeStackParams } from '@/routes/home.routes';
import { useEffect } from 'react';

interface ManageNoteProps {
	note: NoteProps;
	visible: boolean;
	dismiss: () => void;
	containerStyle?: ViewStyle;
}

export default function ManageNote({ note, ...props }: ManageNoteProps) {
	const navigation = useNavigation<NavigationProp<HomeStackParams>>();
	const { deleteNote } = useDataContext();

	const { theme } = useTheme();
	const styles = useStyles(theme);

	useEffect(() => {
		if (note) console.log(`[ManageNote]: note: ${JSON.stringify(note)}`);
	}, [note]);

	return (
		<Modal
			visible={props.visible}
			onDismiss={props.dismiss}
			contentContainerStyle={[styles.container, props.containerStyle]}
		>
			<List.Section title='Opções'>
                <TouchableHighlight
                    underlayColor={theme.colors.onSurfaceDisabled}
                    onPress={() => {
                        navigation.navigate('EditNote', { note })
                        props.dismiss();
                    }}
				>
					<List.Item
						title='Editar Nota'
						style={styles.listItem}
						titleStyle={styles.listItemTxt}
						left={() => <List.Icon icon='pencil' />}
					/>
				</TouchableHighlight>

				<Divider />

				<TouchableHighlight
					onPress={() => {
						console.log('deletar');
                        // deleteNote(note.id)
                        props.dismiss();
                    }}
                    underlayColor={theme.colors.errorContainer}
                    /* android_ripple={{
                        color: theme.colors.onError,
                        foreground: true,
                        radius: 128,
                        borderless: false,
                    }} */
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
		</Modal>
	);
}
