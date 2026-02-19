import { useState, useRef } from 'react';

import { View, Button } from 'react-native';

import {
	EnrichedTextInput,
	EnrichedTextInputInstance,
	OnChangeStateEvent,
} from 'react-native-enriched';

import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';
import Toolbar from './toolbar';
import convertHtmlToMd from '@/utils/htmlToMd';

interface TextEditorProps {
	onSave: (text: string) => void;
}

export default function TextEditor(props: TextEditorProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	const [stylesState, setStylesState] = useState<OnChangeStateEvent | null>();

	const editorRef = useRef<EnrichedTextInputInstance>(null);

	async function handleSave() {
		const html = await editorRef.current.getHTML();
		const markdown = convertHtmlToMd(html);
		props.onSave(markdown);
	}

	return (
		<View style={styles.container}>
			<Toolbar
				actions={{
					bold: editorRef.current?.toggleBold,
					italic: editorRef.current?.toggleItalic,
					inlineCode: editorRef.current?.toggleInlineCode,
					codeBlock: editorRef.current?.toggleCodeBlock,
					h1: editorRef.current?.toggleH1,
					h2: editorRef.current?.toggleH2,
					h3: editorRef.current?.toggleH3,
					h4: editorRef.current?.toggleH4,
					h5: editorRef.current?.toggleH5,
					h6: editorRef.current?.toggleH6,
					blockquote: editorRef.current?.toggleBlockQuote,
					orderedlist: editorRef.current?.toggleOrderedList,
					unorderedlist: editorRef.current?.toggleUnorderedList,
					chekboxlist: editorRef.current?.toggleCheckboxList,
					save: handleSave,
				}}
			/>
			<EnrichedTextInput
				ref={editorRef}
				onChangeState={e => setStylesState(e.nativeEvent)}
				style={styles.input}
			/>
		</View>
	);
}
