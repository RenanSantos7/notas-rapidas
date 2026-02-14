import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeRoutes, { HomeStackParams } from './home.routes';
import Settings from '@/screens/Settings';
import { NavigatorScreenParams } from '@react-navigation/native';
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
			tabBar={({ state }) => <CustomTabBar state={state} />}
		>
			<Tabs.Screen name='HomeStack' component={HomeRoutes} />
			<Tabs.Screen name='Search' component={HomeRoutes} />
			<Tabs.Screen name='Settings' component={Settings} />
		</Tabs.Navigator>
	);
}
