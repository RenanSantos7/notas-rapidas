import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';

export default function useStyles(theme: ThemeProps) {
	return StyleSheet.create({
		container: {
			width: 375,
			padding: theme.sizes.spacing.md,
			gap: theme.sizes.spacing.lg,
		},
		modalFooter: {
			flexDirection: 'row-reverse',
			gap: theme.sizes.spacing.lg,
		},
	});
}
