import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';

export default function useStyles(theme: ThemeProps) {
    return StyleSheet.create({
        container: {
            paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
            paddingTop: 15,
            paddingBottom: 20,
            backgroundColor: theme.colors.surfaceBright,
        },
    });
}
