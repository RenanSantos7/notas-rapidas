import { View, Text, TextInput, TextInputProps } from 'react-native';

import useStyles from './styles';
import { Dispatch, SetStateAction } from 'react';
import { useTheme } from '@/contexts/themeContext';

interface NoteTitleProps extends TextInputProps {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;

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
                placeholderTextColor={theme.colors.backdrop}
            />
        </View>
    );
};
