import { Dimensions, StyleSheet } from 'react-native';

import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';
import { ThemeProps } from '@/types/theme';

export default function useStyles(
	theme: ThemeProps,
	screenWidth?: number,
	numColumns?: number,
) {
	const rowGap = theme.sizes.spacing.sm;
	const rowWidth = screenWidth - 2 * SCREEN_HORIZONTAL_PADDING;
	const columnCount = !numColumns || numColumns < 2 ? 2 : numColumns;
	const cardWidth = (rowWidth - rowGap * (columnCount - 1)) / columnCount;

	return StyleSheet.create({
		list: {
			gap: 10,
		},
		row: {
			width: rowWidth,
			gap: rowGap,
		},
		voidListContainer: {
			flex: 1,
			alignContent: 'center',
			justifyContent: 'center',
		},
		voidListMessage: {
			textAlign: 'center',
			color: theme.colors.primary,
			fontSize: theme.sizes.text.xl,
		},
		card: {
			paddingTop: 15,
			paddingBottom: 20,
			paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
			backgroundColor: theme.colors.inverseOnSurface,
			borderRadius: 24,
			width: cardWidth,
			minHeight: 200,
		},
		divider: {
			marginTop: 8,
			marginBottom: 16,
		},
	});
}
