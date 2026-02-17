import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';

export default function useStyles(theme: ThemeProps) {
	return StyleSheet.create({
		container: {
			paddingTop: 15,
			paddingBottom: 20,
			paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
			backgroundColor: theme.colors.inverseOnSurface,
			borderRadius: 24,
		},
	});
}
