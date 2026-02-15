import { ComponentProps } from 'react';

import MaterialIcon from '@react-native-vector-icons/material-design-icons';
import { Material3Scheme } from '@pchmn/expo-material3-theme';

type ISize = {
	xsm?: number;
	sm: number;
	md: number;
	lg?: number;
	xl?: number;
	xxl?: number;
	xxxl?: number;
};

export type ThemeProps = {
	colors: Material3Scheme;
	sizes: {
		assets: ISize;
		borderRadius: ISize;
		spacing: ISize;
		text: ISize;
		images: ISize;
	};
};

export type IconName = ComponentProps<typeof MaterialIcon>['name'];

