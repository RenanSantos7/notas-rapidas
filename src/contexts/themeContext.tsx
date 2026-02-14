import { createContext, ReactNode, useContext } from 'react';

import { useColorScheme } from 'react-native';

import { ThemeProps } from '@/types/theme';
import { sizes } from '@/styles/sizes';
import { lightTheme } from '@/styles/lightTheme';

interface IThemeContext {
	isDarkTheme: boolean;
	theme: ThemeProps;
}

const ThemeContext = createContext<IThemeContext>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const isDarkTheme = useColorScheme() == 'dark';

	const theme = {
		colors: lightTheme,
		size: sizes,
	};

	return (
		<ThemeContext.Provider
			value={{
				isDarkTheme,
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
