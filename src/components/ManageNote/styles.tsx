import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';

export default function useStyles(theme: ThemeProps) {
	return StyleSheet.create({
		content: {
			width: 375,
			gap: theme.sizes.spacing.lg,
		},
		listItem: {
			gap: theme.sizes.spacing.lg,
		},
		listItemTxt: {
			color: theme.colors.onBackground,
		},
		danger: {
			color: theme.colors.error,
		},
		modalFooter: {
			flexDirection: 'row-reverse',
			gap: theme.sizes.spacing.lg,
		},
	});
}
