import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';
import { ThemeProps } from '@/types/theme';
import { StyleSheet } from 'react-native';

export default function useStyles(theme: ThemeProps) {
	return StyleSheet.create({
		list: {
			paddingBottom: 120,
			marginHorizontal: SCREEN_HORIZONTAL_PADDING,
		},
	});
}
