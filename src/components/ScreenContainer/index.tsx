import { ReactNode } from 'react';

import { StatusBar, StyleSheet, View, ViewStyle } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/contexts/themeContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/ui';
import { FAB } from 'react-native-paper';
import { IconName } from '@/types/theme';

interface ScreenContainerProps {
	children: ReactNode;
	// scroll?: boolean;
	centered?: boolean;
	contentStyle?: ViewStyle;
	noPadding?: boolean;
	fabOptions?: {
		icon: IconName;
		action: () => void;
	};
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
	// scroll = true,
	centered = false,
	children,
	contentStyle,
	noPadding = false,
	fabOptions,
}: ScreenContainerProps) {
	const { theme, isDarkTheme } = useTheme();
	const insets = useSafeAreaInsets();
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: !!noPadding
				? insets.top
				: insets.top + theme.sizes.spacing.md,
			backgroundColor: theme.colors.background,
		},
		content: {
			flexGrow: 1,
			justifyContent: centered ? 'center' : 'flex-start',
			alignItems: centered ? 'center' : 'stretch',
			paddingHorizontal: noPadding ? 0 : SCREEN_HORIZONTAL_PADDING,
			paddingBottom: insets.bottom,
		},
	});

	return (
		<View style={styles.container}>
			<StatusBar
				barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
				backgroundColor='transparent'
				translucent
			/>
			<View style={[styles.content, contentStyle]}>{children}</View>

			{(fabOptions?.icon && fabOptions?.action) ? (
				<FAB
					icon={fabOptions.icon}
					variant='primary'
					onPress={fabOptions.action}
					style={{
						position: 'absolute',
						margin: 16,
						right: 20,
						bottom: 64,
					}}
				/>
			) : null}
		</View>
	);
}
