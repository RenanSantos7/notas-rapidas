import { ReactNode } from 'react';

import { StatusBar, StyleSheet, View, ViewStyle } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';
import { useTheme } from '@/contexts/themeContext';

interface ScreenContainerProps {
	children: ReactNode;
	scroll?: boolean;
	centered?: boolean;
	contentStyle?: ViewStyle;
	noPadding?: boolean;
}

/**
 * @summary Screen container component that wraps content in a `ScrollView`.
 * @description
 *  Automatically applies safe area insets at the top and bottom,
 * as well as the background theme defined by context. Ideal for ensuring content is displayed correctly on different screen sizes and devices with unusable areas.
 *
 * @param children - React elements to be displayed inside the container.
 * @param scroll - *Optional*. Determines if the `ScreenContainer` should handle page scrolling. Default is `true`.
 * @param contentStyle - *Optional*. Custom styles to be applied to the content container.
 * @param noPadding - *Optional*. If `true`, removes padding from the container.
 * @param centered - *Optional*. Determines if the `ScreenContainer` should center the content.
 */
export default function ScreenContainer({
	scroll = true,
	centered = false,
	children,
	contentStyle,
	noPadding,
}: ScreenContainerProps) {
	const { theme, isDarkTheme } = useTheme();
	const insets = useSafeAreaInsets();
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: !!noPadding
				? insets.top
				: insets.top + theme.size.spacing.md,
			backgroundColor: theme.colors.background.main,
		},
		content: {
			flexGrow: 1,
			justifyContent: centered ? 'center' : 'flex-start',
			alignItems: centered ? 'center' : 'stretch',
			paddingBottom: scroll
				? insets.bottom
				: insets.bottom + theme.size.spacing.md,
		},
	});

	if (scroll)
		return (
			<KeyboardAwareScrollView
				style={styles.container}
				contentContainerStyle={[styles.content, contentStyle]}
				extraKeyboardSpace={theme.size.spacing.xxl}
			>
				<CustomStatusBar isDarkMode={isDarkTheme} />
				{children}
			</KeyboardAwareScrollView>
		);

	return (
		<View style={styles.container}>
			<CustomStatusBar isDarkMode={isDarkTheme} />
			<View style={[styles.content, contentStyle]}>{children}</View>
		</View>
	);
}

function CustomStatusBar({ isDarkMode }: { isDarkMode: boolean }) {
	return (
		<StatusBar
			barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			backgroundColor='transparent'
			translucent
		/>
	);
}
