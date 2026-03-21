import { useState, useRef } from 'react';

import { View, TextInput, TextInputSelectionChangeEvent } from 'react-native';

import { Divider } from 'react-native-paper';
import {
	KeyboardAwareScrollView,
	KeyboardStickyView,
} from 'react-native-keyboard-controller';

import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';
import Toolbar from './toolbar';

interface TextEditorProps {
	value: string;
	onChange: (text: string) => void;
	onSave: () => void;
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
		const start = selection?.start ?? null;
		const end = selection?.end ?? null;
		if (!props.value) return;
		if (start === null || end === null) return;

		const before = props.value.slice(0, start);
		const selected = props.value.slice(start, end);
		const after = props.value.slice(end);

		const newText = `${before}${prefix}${selected}${suffix}${after}`;
		const cursorPos =
			start === end
				? start + prefix.length
				: start + prefix.length + selected.length + suffix.length;

		props.onChange(newText);
		setSelection({ start: cursorPos, end: cursorPos });
	}

	function wrapSelectionBlock(prefix: string, suffix: string = prefix) {
		if (!props.value) return;
		const start = selection?.start ?? null;
		const end = selection?.end ?? null;
		if (start === null || end === null) return;

		const text = props.value;

		const lineStart = text.lastIndexOf('\n', start - 1) + 1;
		const nextLineIndex = text.indexOf('\n', end);
		const lineEnd = nextLineIndex === -1 ? text.length : nextLineIndex;

		const before = text.slice(0, lineStart);
		const blockContent = text.slice(lineStart, lineEnd);
		const after = text.slice(lineEnd);

		const newBlock = `${prefix}\n${blockContent}\n${suffix}`;
		const newText = `${before}${newBlock}${after}`;

		props.onChange(newText);

		const newCursorPos = lineStart + newBlock.length;
		setSelection({ start: newCursorPos, end: newCursorPos });
	}

	function handleList(prefix: string | 0) {
		if (!props.value) return;
		const start = selection?.start ?? null;
		const end = selection?.end ?? null;
		if (start === null || end === null) return;

		const text = props.value;

		const startIndex = text.lastIndexOf('\n', start - 1) + 1;
		const nextLineIndex = text.indexOf('\n', end);
		const endIndex = nextLineIndex === -1 ? text.length : nextLineIndex;

		const before = text.slice(0, startIndex);
		const selectedBlock = text.slice(startIndex, endIndex);
		const after = text.slice(endIndex);

		let lines = selectedBlock.split('\n');
		const prefixWithSpace = `${prefix} `;

		const allHavePrefix = lines.every(line =>
			line.startsWith(prefixWithSpace),
		);

		if (allHavePrefix) {
			lines = lines.map(line => line.slice(prefixWithSpace.length));
		} else {
			lines = lines.map(line =>
				line.startsWith(prefixWithSpace)
					? line
					: `${prefixWithSpace}${line}`,
			);
		}

		const newBlock = lines.join('\n');
		const newText = `${before}${newBlock}${after}`;

		props.onChange(newText);

		const newCursorPos = startIndex + newBlock.length;
		setSelection({ start: newCursorPos, end: newCursorPos });
	}

	function insertBeforeLine(prefix: string | 0): void {
		if (!props.value) return;
		const start = selection?.start || null;
		const end = selection?.end || null;
		if (start === null || end === null) return;

		const text = props.value;
		const blockStart = text.lastIndexOf('\n', start - 1) + 1;
		const before = text.slice(0, blockStart);
		const lines = text.slice(blockStart, start).trim();
		const after = text.slice(start);

		prefix = lines.startsWith(prefix + ' ') ? '' : prefix + ' ';
		const newLine = `${prefix}${lines}`;
		const newText = `${before}${newLine}${after}`;

		props.onChange(newText);

		const newCursor = blockStart + newLine.length;
		setSelection({ start: newCursor, end: newCursor });
	}

	return (
		<View style={styles.wrapper}>
			<KeyboardAwareScrollView
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps='always'
			>
				<Divider />
				<TextInput
					placeholder='Escreva sua nota em markdown'
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
			</KeyboardAwareScrollView>
			<KeyboardStickyView style={styles.toolbarContainer}>
				<Toolbar
					actions={{
						bold: () => wrapSelection('**'),
						italic: () => wrapSelection('*'),
						inlineCode: () => wrapSelection('`'),
						codeBlock: () => wrapSelectionBlock('```'),
						mathBlock: () => wrapSelectionBlock('$$'),
						orderedlist: () => {},
						blockquote: () => handleList('>'),
						unorderedlist: () => handleList('-'),
						chekboxlist: () => handleList('- [ ]'),
						h1: () => insertBeforeLine('#'.repeat(1)),
						h2: () => insertBeforeLine('#'.repeat(2)),
						h3: () => insertBeforeLine('#'.repeat(3)),
						h4: () => insertBeforeLine('#'.repeat(4)),
						h5: () => insertBeforeLine('#'.repeat(5)),
						h6: () => insertBeforeLine('#'.repeat(6)),
						save: props.onSave,
					}}
				/>
			</KeyboardStickyView>
		</View>
	);
}
