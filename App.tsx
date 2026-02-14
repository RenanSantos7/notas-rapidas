import DataProvider from '@/contexts/dataContext';
import ThemeProvider from '@/contexts/themeContext';
import Routes from '@/routes/app.routes';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function App() {
	return (
		<NavigationContainer>
			<KeyboardProvider>
				<DataProvider>
					<ThemeProvider>
						<Routes />
					</ThemeProvider>
				</DataProvider>
			</KeyboardProvider>
		</NavigationContainer>
	);
}
