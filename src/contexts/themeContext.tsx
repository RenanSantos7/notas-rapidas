import { createContext, ReactNode, useContext } from 'react';

import { useColorScheme } from 'react-native';

import { ThemeProps } from '@/types/theme';
import { sizes } from '@/styles/sizes';
import { lightTheme } from '@/styles/lightTheme';
import { Material3Theme, useMaterial3Theme } from '@pchmn/expo-material3-theme';

interface IThemeContext {
	isDarkTheme: boolean;
	theme: ThemeProps;
}

const ThemeContext = createContext<IThemeContext>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const colorScheme = useColorScheme();
	const materialTheme = useMaterial3Theme({
		fallbackSourceColor: '#157ee0',
	});

	const theme = {
		colors: materialTheme.theme[colorScheme],
		size: sizes,
	};

	return (
		<ThemeContext.Provider
			value={{
				isDarkTheme: colorScheme == 'dark',
				theme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context)
		throw new Error('ThemeContext não está sendo provido neste componente');
	return context;
}
