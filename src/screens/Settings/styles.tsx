import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';

export default function useStyles(theme: ThemeProps) {
    return StyleSheet.create({
        optionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.surface,
            paddingHorizontal: theme.sizes.spacing.xxl,
            paddingVertical: theme.sizes.spacing.md,
            minHeight: 120,
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
