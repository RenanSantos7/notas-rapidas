import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';

export default function useStyles(theme: ThemeProps) {
    return StyleSheet.create({
        header: {
            marginTop: theme.sizes.spacing.md,
            marginLeft: SCREEN_HORIZONTAL_PADDING,
        },
        optionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.surface,
            paddingHorizontal: theme.sizes.spacing.xxl,
            paddingVertical: theme.sizes.spacing.md,
            minHeight: 100,            
            gap: theme.sizes.spacing.md,
        },
        buttonTitle: {
            fontSize: 18,
            fontWeight: 500,
        },
        buttonLabel: {
            fontSize: 14,
            color: theme.colors.backdrop
        },
        textError: {
            color: theme.colors.error
        },
    });
}
