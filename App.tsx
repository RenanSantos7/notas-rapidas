import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

import DataProvider from '@/contexts/dataContext';
import ThemeProvider from '@/contexts/themeContext';
import Routes from '@/routes/app.routes';
import { useColorScheme } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useMemo } from 'react';

export default function App() {
	const colorScheme = useColorScheme();
	const { theme } = useMaterial3Theme();

	const paperTheme = useMemo(
		() =>
			colorScheme === 'dark'
				? { ...MD3DarkTheme, colors: theme.dark }
				: { ...MD3LightTheme, colors: theme.light },
		[colorScheme, theme],
	);
	return (
		<NavigationContainer>
			<KeyboardProvider>
				<DataProvider>
					{/* <ThemeProvider> */}
					<PaperProvider theme={paperTheme}>
						<Routes />
					</PaperProvider>
					{/* </ThemeProvider> */}
				</DataProvider>
			</KeyboardProvider>
		</NavigationContainer>
	);
}
