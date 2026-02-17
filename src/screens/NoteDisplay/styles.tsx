import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';
import { ThemeProps } from '@/types/theme';
import { StyleSheet } from 'react-native';

export default function useStyles(theme: ThemeProps) {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: SCREEN_HORIZONTAL_PADDING
        },
        metadata: {
            paddingBottom: 8,
            marginBottom: 20,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: theme.colors.surfaceDisabled,
        }
    });
}
