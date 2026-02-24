import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';

export default function useStyles(theme: ThemeProps) {
    return StyleSheet.create({
        container: {
            // marginHorizontal: theme.sizes.spacing.xl,
            alignSelf: 'center',
            width: 375,
            borderRadius: theme.sizes.borderRadius.xl,
            backgroundColor: theme.colors.background,
            overflow: 'hidden',
        },
        wrapper: {
           
        },
        content: {
            width: 375,
            padding: theme.sizes.spacing.md,
            gap: theme.sizes.spacing.lg,
        },
        listItem: {
            gap: theme.sizes.spacing.lg,
        },
        listItemTxt: {
            color: theme.colors.onBackground,
        },
        danger: {
            color: theme.colors.error,
        },
        modalFooter: {
            flexDirection: 'row-reverse',
            gap: theme.sizes.spacing.lg,
        }
    });
}
