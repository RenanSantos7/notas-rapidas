import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';

export default function useStyles(theme: ThemeProps) {
    return StyleSheet.create({
        container: {
           marginVertical: theme.sizes.spacing.md
        },
        list: {
            gap: theme.sizes.spacing.md
        }
    });
}
