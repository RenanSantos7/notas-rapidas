import React, { useEffect, useState } from 'react';

import { Keyboard, View } from 'react-native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
	CommonActions,
	ParamListBase,
	TabNavigationState,
	useNavigation,
} from '@react-navigation/native';

import { RootTabsParams } from '@/routes/app.routes';
import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';
import TabItem from './item';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNavigation } from 'react-native-paper';

interface CustomTabBarProps {
	navigationProps: {
		state: TabNavigationState<ParamListBase>;
		navigation: any;
		descriptors: any;
		insets: any;
	};
}

export default function CustomTabBar({ navigationProps }: CustomTabBarProps) {
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	const { navigation, state, descriptors, insets } = navigationProps;

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
		<BottomNavigation.Bar
			navigationState={state}
			safeAreaInsets={insets}
			onTabPress={({ route, preventDefault }) => {
				const event = navigation.emit({
					type: 'tabPress',
					target: route.key,
					canPreventDefault: true,
				});

				if (event.defaultPrevented) {
					preventDefault();
				} else {
					navigation.dispatch({
						...CommonActions.navigate(route.name, route.params),
						target: state.key,
					});
				}
			}}
			renderIcon={({ route, focused, color }) =>
				descriptors[route.key].options.tabBarIcon?.({
					focused,
					color,
					size: 24,
				}) || null
			}
			getLabelText={({ route }) => {
				const { options } = descriptors[route.key];
				const label =
					typeof options.tabBarLabel === 'string'
						? options.tabBarLabel
						: typeof options.title === 'string'
							? options.title
							: route.name;

				return label;
			}}
		/>
	);
}
