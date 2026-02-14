import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigatorScreenParams } from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-design-icons';

import HomeRoutes, { HomeStackParams } from './home.routes';
import Settings from '@/screens/Settings';
import CustomTabBar from '@/components/CustomTabBar';

export type RootTabsParams = {
	HomeStack: NavigatorScreenParams<HomeStackParams>;
	Search: undefined;
	Settings: undefined;
};

const Tabs = createBottomTabNavigator<RootTabsParams>();

export default function Routes() {
	return (
		<Tabs.Navigator
			id={undefined}
			screenOptions={{
				headerShown: false,
			}}
			tabBar={props => <CustomTabBar navigationProps={props} />}
		>
			<Tabs.Screen
				name='HomeStack'
				component={HomeRoutes}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='home' color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name='Search'
				component={HomeRoutes}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons
							name='magnify'
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='Settings'
				component={Settings}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='cog' color={color} size={size} />
					),
				}}
			/>
		</Tabs.Navigator>
	);
}
