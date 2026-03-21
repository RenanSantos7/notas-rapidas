import { TextInputProps } from 'react-native';

import { TextInput } from 'react-native-paper';

import useStyles from './styles';
import { useTheme } from '@/contexts/themeContext';

interface TagsInputProps {
    value: TextInputProps['value'];
    onChangeText: TextInputProps['onChangeText'];
}

export default function TagsInput(props: TagsInputProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	return (
		<TextInput
			mode='outlined'
			label='Tags'
			placeholder='Separe as tags por vírgula'
			style={styles.input}
			placeholderTextColor={theme.colors.backdrop}
            right={
                <TextInput.Icon icon='tag' color={theme.colors.backdrop} />
            }
			autoCapitalize='none'
			{...props}
		/>
	);
}
