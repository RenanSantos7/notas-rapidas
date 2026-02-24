import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';

export default function useStyles(theme: ThemeProps) {
    return StyleSheet.create({
        container: {
            marginHorizontal: theme.sizes.spacing.xl,
            borderRadius: theme.sizes.borderRadius.xl,
            backgroundColor: theme.colors.background,
            overflow: 'hidden'
        },
        listItem: {
            paddingHorizontal: theme.sizes.spacing.md,
            gap: theme.sizes.spacing.lg,
        },
        listItemTxt: {
            color: theme.colors.onBackground,
        },
        danger: {
            color: theme.colors.error,
        }
    });
}
