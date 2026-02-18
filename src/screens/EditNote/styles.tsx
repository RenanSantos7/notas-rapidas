import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';

export default function useStyles(theme: ThemeProps) {
	return StyleSheet.create({
		container: {
			gap: 20,
		},
		tagsInput: {
			marginHorizontal: SCREEN_HORIZONTAL_PADDING,
			backgroundColor: theme.colors.background,
		},
	});
}
