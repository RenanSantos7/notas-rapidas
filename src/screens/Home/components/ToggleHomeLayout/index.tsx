import { useState } from 'react';

import { View } from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-design-icons';

import useStyles from './styles';
import { useTheme } from '@/contexts/themeContext';
import { Button } from 'react-native-paper';
import { useSettingsContext } from '@/contexts/settingsContext';

interface ToggleHomeLayoutProps {
    
};

export default function ToggleHomeLayout(props: ToggleHomeLayoutProps) {
    const { theme } = useTheme();
    const styles = useStyles(theme);

    const { toggleHomeLayout } = useSettingsContext();

    const [checked, setChecked] = useState(false);

    function onCheck() {
        setChecked(prev => !prev);
        toggleHomeLayout();
    }

    return (
        <Button onPress={onCheck}>
            <MaterialIcons
                name={checked ? 'view-grid' : 'view-list'}
                size={24}
                color={theme.colors.onBackground}
            />
        </Button>
    );
};
