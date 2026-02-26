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
					<SettingsProvider>
						<ThemeProvider>
							<AlertProvider>
								<Routes />
							</AlertProvider>
						</ThemeProvider>
					</SettingsProvider>
				</DataProvider>
			</KeyboardProvider>
		</NavigationContainer>
	);
}
