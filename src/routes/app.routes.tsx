import Home from '@/screens/Home';
import Note from '@/screens/Note';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export type RootStackParams = {
	Home: undefined;
	Note: undefined;
};

export default function Routes() {
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
