import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';

export default function useStyles(theme: ThemeProps) {
    return StyleSheet.create({
        container: {
            ...StyleSheet.absoluteFillObject,
			zIndex: 10,
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
        },
        shadow: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: theme.colors.onBackground,
            opacity: 0.5,
            zIndex: 20,
        },
        modal: {
            width: 375,
			alignItems: 'stretch',
			backgroundColor: theme.colors.background,
			padding: theme.sizes.spacing.lg,
			gap: theme.sizes.spacing.xsm,
            borderRadius: theme.sizes.borderRadius.xl,
            overflow: 'hidden',
			elevation: 1,
            zIndex: 21,
        }
    });
}
