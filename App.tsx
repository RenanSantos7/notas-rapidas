import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import {
	AlertProvider,
	DataProvider,
	ThemeProvider,
	SettingsProvider,
} from '@/contexts';
import Routes from '@/routes/app.routes';

export default function App() {
	return (
		<NavigationContainer>
			<KeyboardProvider>
				<DataProvider>
					<ThemeProvider>
						<SettingsProvider>
							<AlertProvider>
								<Routes />
							</AlertProvider>
						</SettingsProvider>
					</ThemeProvider>
				</DataProvider>
			</KeyboardProvider>
		</NavigationContainer>
	);
}
