import { ThemeProps } from '@/types/theme';
import { StyleSheet } from 'react-native';

export default function useStyles(theme: ThemeProps) {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
    });
}
