import { View } from 'react-native';

import useStyles from './styles';
import { NoteProps } from '@/types';
import { Surface, Text, TouchableRipple } from 'react-native-paper';
import limitString from '@/utils/limitString';
import { useTheme } from '@/contexts/themeContext';

interface NotesListItemProps {
    note: NoteProps;
};

export default function NotesListItem({ note }: NotesListItemProps) {
    const { theme } = useTheme();
    const styles = useStyles(theme);

    return (
        <TouchableRipple
            onPress={() => { }}
            rippleColor={theme.colors.surfaceVariant}
        >
            <Surface style={styles.container} mode='flat'>
                <Text variant='titleLarge'>{note.title}</Text>
                <Text variant='bodySmall'>{limitString(note.content, 100)}</Text>
            </Surface>
        </TouchableRipple>
    );
};
