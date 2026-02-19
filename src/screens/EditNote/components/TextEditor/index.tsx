import { useState, useRef, Dispatch, SetStateAction } from 'react';

import { View, TextInput, TextInputSelectionChangeEvent } from 'react-native';

import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';
import convertHtmlToMd from '@/utils/htmlToMd';
import Toolbar from './toolbar';
import { Divider } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

interface TextEditorProps {
	value: string;
	onChange: (text: string) => void;
}

interface SelecionProps {
	start: number;
	end: number;
}

export default function TextEditor(props: TextEditorProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	const [selection, setSelection] = useState<SelecionProps>({
		start: 0,
		end: 0,
	});

	const editorRef = useRef(null);

	function handleSelectionChange(event: TextInputSelectionChangeEvent): void {
		setSelection(event.nativeEvent.selection);
	}

	function wrapSelection(prefix: string, suffix: string = prefix) {
		const { start, end } = selection;

		if (start === null || end === null) return;

		const before = props.value.slice(0, start);
		const selected = props.value.slice(start, end);
		const after = props.value.slice(end);

		const newText = `${before}${prefix}${selected}${suffix}${after}`;
		const cursorPos =
			start + prefix.length + selected.length + suffix.length;

		props.onChange(newText);
		setSelection({ start: cursorPos, end: cursorPos });
	}

	function toggleHeading(level: 1 | 2 | 3 | 4 | 5 | 6 = 1): void {
		const { start } = selection;
		const text = props.value;

		const lineStart = text.lastIndexOf('\n', start - 1) + 1;
		const before = text.slice(0, lineStart);
		const line = text.slice(lineStart, start).trim();
		const after = text.slice(start);

		const prefix = line.startsWith('#'.repeat(level) + ' ')
			? ''
			: '#'.repeat(level) + ' ';
		const newLine = `${prefix}${line}`;
		const newText = `${before}${newLine}${after}`;

		props.onChange(newText);

		const newCursor = lineStart + newLine.length;
		setSelection({ start: newCursor, end: newCursor });
	}

	return (
		<View style={styles.container}>
			<Divider />
			<TextInput
				style={styles.input}
				textAlignVertical='top'
				value={props.value}
				onChangeText={props.onChange}
				ref={editorRef}
				multiline
				autoCorrect={false}
				autoCapitalize='none'
				selection={selection}
				selectTextOnFocus={false}
				spellCheck={false}
				onSelectionChange={handleSelectionChange}
			/>
			<Toolbar
				actions={{
					bold: () => wrapSelection('**'),
					italic: () => wrapSelection('*'),
					h1: () => wrapSelection('# ', ''),
					h2: () => wrapSelection('## ', '\n'),
				}}
			/>
		</View>
	);
}
