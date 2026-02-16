import EditNote from '@/screens/EditNote';
import Home from '@/screens/Home';
import NoteDisplay from '@/screens/NoteDisplay';
import { NoteProps } from '@/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type NoteRoute = {
	note: NoteProps;
}

export type HomeStackParams = {
	Home: undefined;
	NoteDisplay: NoteRoute;
	EditNote: NoteRoute | undefined;
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
			<Stack.Screen name='NoteDisplay' component={NoteDisplay} />
			<Stack.Screen name='EditNote' component={EditNote} />
		</Stack.Navigator>
	);
}
