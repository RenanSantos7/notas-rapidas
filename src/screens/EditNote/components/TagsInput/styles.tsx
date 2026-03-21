import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';

export default function useStyles(theme: ThemeProps) {
    return StyleSheet.create({
        input: {
			marginHorizontal: SCREEN_HORIZONTAL_PADDING,
			backgroundColor: theme.colors.background,
			color: theme.colors.onBackground
		},
    });
}
