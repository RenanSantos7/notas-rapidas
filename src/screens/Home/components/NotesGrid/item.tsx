import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Divider, Surface, Text, TouchableRipple } from 'react-native-paper';

import { NoteProps } from '@/types';
import { useAlertContext } from '@/contexts/alertContext';
import { useTheme } from '@/contexts/themeContext';
import formatDate from '@/utils/formatDate';
import useStyles from './styles';
import {
	EnrichedMarkdownTextProps,
	EnrichedMarkdownText as Markdown,
} from 'react-native-enriched-markdown';
import { useMemo } from 'react';

interface NotesListItemProps {
	note: NoteProps;
}

function limitString(text: string, limit: number) {
	if (!text) return;

	const textWoMd = text.replace(/#/g, '').trim();

	if (limit >= textWoMd.length) return textWoMd;

	return textWoMd.slice(0, limit) + '...';
}

export default function NotesListItem({ note }: NotesListItemProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	const { useModal } = useAlertContext();

	const { navigate } = useNavigation();

	const mdStyles = useMemo(() => {
		const textColor = theme.colors.onSurface;
		const accentColor = theme.colors.primary;
		const blockBgColor = theme.colors.inverseOnSurface;

		return {
			// regras gerais
			body: {
				gap: 8,
			},
			hr: {
				backgroundColor: textColor,
			},
			paragraph: {
				fontSize: 14,
				lineHeight: 18,
				color: textColor,
				marginBottom: 0,
			},
			codeBlock: {
				fontSize: 14,
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
			blockquote: {
				backgroundColor: blockBgColor,
				paddingLeft: 12,
				color: textColor,
			},
			list: {
				fontSize: 14,
				lineHeight: 18,
				bulletColor: textColor,
				bulletSize: 6,
				markerColor: accentColor,
				gapWidth: 8,
				color: textColor,
			},
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
		<TouchableRipple
			onPress={() =>
				navigate('HomeStack', {
					screen: 'NoteDisplay',
					params: { note },
				})
			}
			onLongPress={() => {
				useModal(note);
			}}
			rippleColor='rgba(0, 0, 0, .32)'
		>
			<Surface style={styles.card} mode='flat'>
				<Text variant='titleMedium'>{note.title}</Text>
				<Text variant='labelSmall'>
					{formatDate(note.mtime || note.ctime)}
				</Text>

				<Divider style={styles.divider} />

					<Markdown
						markdown={limitString(note.content, 100)}
						markdownStyle={mdStyles}
					/>
			</Surface>
		</TouchableRipple>
	);
}
