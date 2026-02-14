import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';

export default function useStyles(theme: ThemeProps, bottomInset?: number) {
	return StyleSheet.create({
		container: {
			width: '100%',
			flexDirection: 'row',
			justifyContent: 'space-around',
			paddingBottom: bottomInset,
			backgroundColor: theme.colors.background.light,
			borderTopWidth: StyleSheet.hairlineWidth,
			borderTopColor: theme.colors.gray[600],
			boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
			overflow: 'hidden',
		},
		item: {
			flex: 1,
			padding: 12,
			alignItems: 'center',
			justifyContent: 'center',
			gap: 4,
		},
		labelContainer: {
			overflow: 'hidden',
		},
		label: {
			fontSize: 11,
			color: theme.colors.text.main,
		},
	});
}
