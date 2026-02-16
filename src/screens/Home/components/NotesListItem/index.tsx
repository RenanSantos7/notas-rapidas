import { View } from 'react-native';

import useStyles from './styles';
import { NoteProps } from '@/types';
import { Surface, Text, TouchableRipple } from 'react-native-paper';
import { useTheme } from '@/contexts/themeContext';
import formatDate from '@/utils/formatDate';

interface NotesListItemProps {
	note: NoteProps;
}

export default function NotesListItem({ note }: NotesListItemProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	return (
		<TouchableRipple
			onPress={() => console.log('Pressed')}
			rippleColor='rgba(0, 0, 0, .32)'
		>
			<Surface style={styles.container} mode='flat'>
				<View>
					<Text variant='titleLarge'>{note.title}</Text>
					<Text variant='labelSmall'>
						{formatDate(note.mtime || note.ctime)}
					</Text>
				</View>
			</Surface>
		</TouchableRipple>
	);
}
