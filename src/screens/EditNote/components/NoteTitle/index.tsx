import { View, TextInput, TextInputProps } from 'react-native';

import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';

interface NoteTitleProps extends TextInputProps {
    title: string;
    setTitle: (text: string) => void;

};

export default function NoteTitle(props: NoteTitleProps) {
    const { theme } = useTheme();
    const styles = useStyles(theme);

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Nome da Nota'
                value={props.title}
                onChangeText={props.setTitle}
                style={styles.input}
                placeholderTextColor={theme.colors.onSurfaceDisabled}
            />
        </View>
    );
};
