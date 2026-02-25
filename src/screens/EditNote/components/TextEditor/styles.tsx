import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';

export default function useStyles(theme: ThemeProps) {
	return StyleSheet.create({
		wrapper: {
			flex: 1,
		},
		container: {
			flexGrow: 1,
			paddingBottom: theme.sizes.spacing.xl,
		},
		input: {
			flexGrow: 1,
			fontSize: 16,
			paddingTop: 20,
			paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
			lineHeight: 28,
		},
		toolbarContainer: {
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			alignItems: 'center',
		},
		toolbar: {
			flexDirection: 'row',
			gap: 4,
			alignItems: 'center',
			justifyContent: 'center',
			alignSelf: 'center',
			paddingHorizontal: theme.sizes.spacing.sm,
			borderRadius: theme.sizes.borderRadius.xxxl,
		},
		icon: {
			borderRadius: 8,
			marginHorizontal: 0,
			marginVertical: 4,
		},
	});
}
