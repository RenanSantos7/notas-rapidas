import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';

export default function useStyles(theme: ThemeProps) {
	return StyleSheet.create({
		container: {
			marginHorizontal: SCREEN_HORIZONTAL_PADDING,
		},
		input: {
			fontSize: 32,
			fontWeight: 400,
			color: theme.colors.onBackground,
		},
	});
}
