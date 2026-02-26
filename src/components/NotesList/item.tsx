import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Surface, Text, TouchableRipple } from 'react-native-paper';

import { NoteProps } from '@/types';
import { useAlertContext } from '@/contexts/alertContext';
import { useTheme } from '@/contexts/themeContext';
import formatDate from '@/utils/formatDate';
import useStyles from './styles';
import ManageNote from '../ManageNote';

interface NotesListItemProps {
	note: NoteProps;
}

export default function NotesListItem({ note }: NotesListItemProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	const { useModal } = useAlertContext();

	const { navigate } = useNavigation();

	return (
		<TouchableRipple
			onPress={() =>
				navigate('HomeStack', {
					screen: 'NoteDisplay',
					params: { note },
				})
			}
			onLongPress={() => {
				useModal(<ManageNote note={note} />);
			}}
			rippleColor='rgba(0, 0, 0, .32)'
		>
			<Surface style={styles.card} mode='flat'>
				<View>
					<Text variant='titleMedium'>{note.title}</Text>
					<Text variant='labelSmall'>
						{formatDate(note.mtime || note.ctime)}
					</Text>
				</View>
			</Surface>
		</TouchableRipple>
	);
}
