import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import DataProvider from '@/contexts/dataContext';
import Routes from '@/routes/app.routes';
import ThemeProvider from '@/contexts/themeContext';
import AlertProvider from '@/contexts/alertContext';

export default function App() {
	return (
		<NavigationContainer>
			<KeyboardProvider>
				<DataProvider>
					<ThemeProvider>
						<AlertProvider>
							<Routes />
						</AlertProvider>
					</ThemeProvider>
				</DataProvider>
			</KeyboardProvider>
		</NavigationContainer>
	);
}
