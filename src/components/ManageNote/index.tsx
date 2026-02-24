import { useRef, useState } from 'react';

import { ScrollView, TouchableHighlight, View, ViewStyle } from 'react-native';

import { Button, Divider, List, Modal, Text } from 'react-native-paper';

import { NavigationProp, useNavigation } from '@react-navigation/native';

import { HomeStackParams } from '@/routes/home.routes';
import { NoteProps } from '@/types';
import { useDataContext } from '@/contexts/dataContext';
import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';

interface ManageNoteProps {
	note: NoteProps;
	visible: boolean;
	dismiss: () => void;
	containerStyle?: ViewStyle;
}

export default function ManageNote({ note, ...props }: ManageNoteProps) {
	const navigation = useNavigation<NavigationProp<HomeStackParams>>();
	const { deleteNote } = useDataContext();

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

	return (
		<Modal
			visible={props.visible}
			onDismiss={props.dismiss}
			contentContainerStyle={[styles.container, props.containerStyle]}
		>
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
							onPress={() => {
								navigation.navigate('EditNote', { note });
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
								scrollToConfirmation();
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
				</View>

				<View style={styles.content}>
					<Text variant='headlineSmall'>Atenção</Text>
					<Text>Tem certeza de que deseja excluir?</Text>

					<View style={styles.modalFooter}>
						<Button mode='text' onPress={props.dismiss}>
							Não
						</Button>

						<Button
							mode='contained-tonal'
							onPress={() => deleteNote(note.id)}
						>
							Sim
						</Button>
					</View>
				</View>
			</ScrollView>
		</Modal>
	);
}
