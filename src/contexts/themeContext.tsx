import { createContext, ReactNode, useContext, useMemo } from 'react';

import { useColorScheme, useWindowDimensions } from 'react-native';

import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

import { ThemeProps } from '@/types/theme';
import { sizes } from '@/styles/sizes';

interface IThemeContext {
	theme: ThemeProps;
	isDarkTheme: boolean;
	isLandscape: boolean;
	isLargerScreen: boolean;
	screenWidth: number;
}

const ThemeContext = createContext<IThemeContext>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const isDarkTheme = useColorScheme() == 'dark';
	const { width, height } = useWindowDimensions();
	const isLandscape = width > height;
	const isLargerScreen = width >= 600;

	const { theme: materialTheme } = useMaterial3Theme();

	const theme = useMemo(
		() =>
			isDarkTheme
				? {
						...MD3DarkTheme,
						colors: materialTheme.dark,
						sizes,
					}
				: {
						...MD3LightTheme,
						colors: materialTheme.light,
						sizes,
					},
		[isDarkTheme, materialTheme],
	);

	return (
		<ThemeContext.Provider
			value={{
				isDarkTheme,
				isLandscape,
				isLargerScreen,
				screenWidth: width,
				theme,
			}}
		>
			<PaperProvider theme={theme}>{children}</PaperProvider>
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context)
		throw new Error('ThemeContext não está sendo provido neste componente');
	return context;
}
