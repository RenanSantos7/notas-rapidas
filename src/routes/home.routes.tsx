import Home from '@/screens/Home';
import Note from '@/screens/Note';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type HomeStackParams = {
	Home: undefined;
	Note: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParams>();

export default function HomeRoutes() {
	return (
		<Stack.Navigator
			id={undefined}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='Note' component={Note} />
		</Stack.Navigator>
	);
}
