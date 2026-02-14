import { ThemeProps } from '@/types/theme';

export const lightTheme: ThemeProps['colors'] = {
	primary: {
		darker: '#1565C0',
		dark: '#1976D2',
		main: '#2196F3',
		light: '#42A5F5',
		lighter: '#64B5F6',
		transparent: 'rgba(33, 150, 243, 0.1)',
	},
	secondary: {
		darker: '#6A1B9A',
		dark: '#7B1FA2',
		main: '#9C27B0',
		light: '#AB47BC',
		lighter: '#BA68C8',
		transparent: 'rgba(156, 39, 176, 0.1)',
	},
	success: {
		main: '#4CAF50',
	},
	text: {
		darker: '#000000',
		dark: '#212121',
		main: '#424242',
		light: '#757575',
		lighter: '#9E9E9E',
		transparent: 'rgba(66, 66, 66, 0.6)',
	},
	background: {
		main: '#FAFAFA',
		light: '#FFFFFF',
	},
	danger: {
		main: '#F44336',
	},
	gray: {
		50: '#FAFAFA',
		100: '#F5F5F5',
		200: '#EEEEEE',
		300: '#E0E0E0',
		400: '#BDBDBD',
		500: '#9E9E9E',
		600: '#757575',
		700: '#616161',
		800: '#424242',
		900: '#212121',
	},
};
