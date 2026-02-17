import { useTheme } from '@/contexts/themeContext';
import { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { EnrichedMarkdownText as Markdown } from 'react-native-enriched-markdown';

interface ContentProps {
	text: string;
}

export default function Content(props: ContentProps) {
	const { theme } = useTheme();

	const styles = useMemo(() => {
		const textColor = theme.colors.onSurface;
		const accentColor = theme.colors.primary;
		const blockBgColor = theme.colors.inverseOnSurface;

		return {
			// regras gerais
			body: {
				gap: 14,
			},
			strong: {
				color: accentColor,
			},
			em: {
				color: accentColor,
			},
			hr: {
				backgroundColor: textColor,
			},

			// Títulos e corpo de texto
			h1: {
				fontSize: 28,
				color: textColor,
			},
			h2: {
				fontSize: 24,
				color: textColor,
			},
			h3: {
				fontSize: 22,
				color: textColor,
			},
			h4: {
				fontSize: 20,
				color: textColor,
			},
			h5: {
				fontSize: 18,
				color: textColor,
			},
			h6: {
				fontSize: 16,
				color: textColor,
			},
			paragraph: {
				fontSize: 16,
				color: textColor,
			},

			// código
			codeBlock: {
				fontSize: 16,
				color: textColor,
				backgroundColor: blockBgColor,
			},
			code: {
				backgroundColor: blockBgColor,
				color: textColor,
			},
			fence: {
				color: textColor,
				backgroundColor: blockBgColor,
			},

			// citação
			blockquote: {
				backgroundColor: blockBgColor,
				paddingLeft: 12,
				color: textColor,
			},

			// listas
			list: {
				fontSize: 16,
				bulletColor: textColor,
				bulletSize: 6,
				markerColor: accentColor,
				gapWidth: 8,
				marginLeft: 20,
				color: textColor,
			},

			// tabelas
			table: {
				borderColor: theme.colors.onSurface,
				borderRadius: 8,
				overflow: 'hidden',
			},
			tr: {
				borderColor: theme.colors.onSurface,
			},
			th: {
				fontWeight: 500,
				flexShrink: 1,
			},
			td: {
				flexShrink: 1,
			},
		};
	}, [theme]);

	return (
		<ScrollView>
			<Markdown markdown={props.text} markdownStyle={styles} />
		</ScrollView>
	);
}
