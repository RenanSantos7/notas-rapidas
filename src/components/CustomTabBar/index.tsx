import React, { useEffect, useState } from 'react';

import { Keyboard, View } from 'react-native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
	ParamListBase,
	TabNavigationState,
	useNavigation,
} from '@react-navigation/native';

import { RootTabsParams } from '@/routes/app.routes';
import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';
import TabItem from './item';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomTabBarProps {
	state: TabNavigationState<ParamListBase>;
}

export default function CustomTabBar({ state }: CustomTabBarProps) {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	const styles = useStyles(theme, insets.bottom);

	const { navigate } =
		useNavigation<BottomTabNavigationProp<RootTabsParams>>();

	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			() => setKeyboardVisible(true),
		);

		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => setKeyboardVisible(false),
		);

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	if (isKeyboardVisible) {
		return null;
	}

	return (
		<View style={styles.container}>
			<TabItem
				label='Inicio'
				icon='home-variant-outline'
				iconOnFocus='home-variant'
				isFocused={state.index === 0}
				onPress={() => navigate('HomeStack', { screen: 'Home' })}
			/>

			<TabItem
				label='Pesquisar'
				icon='magnify'
				isFocused={state.index === 1}
				onPress={() => navigate('Search')}
			/>

			<TabItem
				label='Configs'
				icon='account-outline'
				iconOnFocus='account'
				isFocused={state.index === 2}
				onPress={() => navigate('Settings')}
			/>
		</View>
	);
}
