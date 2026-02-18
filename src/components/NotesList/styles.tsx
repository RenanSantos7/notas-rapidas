import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';
import { ThemeProps } from '@/types/theme';
import { StyleSheet } from 'react-native';

export default function useStyles(theme: ThemeProps) {
	return StyleSheet.create({
		list: {
			gap: 10,
		},
		voidListContainer: {
			flex: 1,
			alignContent: 'center',
			justifyContent: 'center',
		},
		card: {
			paddingTop: 15,
			paddingBottom: 20,
			paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
			backgroundColor: theme.colors.inverseOnSurface,
			borderRadius: 24,
		},
	});
}
