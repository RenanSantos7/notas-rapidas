import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';
import { ThemeProps } from '@/types/theme';
import { StyleSheet } from 'react-native';

export default function useStyles(theme: ThemeProps) {
	return StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingVertical: 16,
		},
		left: {
			flexDirection: 'row',
			gap: 10,
			alignItems: 'center',
			flexGrow: 1, 
		},
	});
}
