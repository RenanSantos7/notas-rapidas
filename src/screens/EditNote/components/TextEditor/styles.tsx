import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';

export default function useStyles(theme: ThemeProps) {
	return StyleSheet.create({
		container: {
			flex: 1,
		},
		input: {
			flexGrow: 1,
			fontSize: 20,
			paddingTop: 20,
			paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
		},
		toolbar: {
			flexDirection: 'row',
			gap: 4,
		},
		icon: {
			borderRadius: 8,
			marginHorizontal: 0,
			marginVertical: 4,
		},
	});
}
