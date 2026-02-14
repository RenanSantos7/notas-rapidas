import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { PaperProvider } from 'react-native-paper';

import DataProvider from '@/contexts/dataContext';
import ThemeProvider from '@/contexts/themeContext';
import Routes from '@/routes/app.routes';

export default function App() {
	return (
		<NavigationContainer>
			<KeyboardProvider>
				<DataProvider>
					<ThemeProvider>
						<PaperProvider>
							<Routes />
						</PaperProvider>
					</ThemeProvider>
				</DataProvider>
			</KeyboardProvider>
		</NavigationContainer>
	);
}
