import { ComponentProps } from 'react';

import FontAwesomeIcon from '@expo/vector-icons/FontAwesome6';
import MaterialIcon from '@react-native-vector-icons/material-design-icons';

export type IColor = {
	darker?: string;
	dark?: string;
	main: string;
	light?: string;
	lighter?: string;
	transparent?: string;
}

type ISize = {
	xsm?: number;
	sm: number;
	md: number;
	lg?: number;
	xl?: number;
	xxl?: number;
	xxxl?: number;
}

export type ThemeProps = {
	colors: {
		primary: IColor;
		secondary?: IColor;
		success: IColor;
		text: IColor;
		background: IColor;
		danger: IColor;
		gray: {
			[key: string]: string;
		};
	};
	size: {
		assets: ISize;
		borderRadius: ISize;
		spacing: ISize;
		text: ISize;
		images: ISize;
	};
}

export type MaterialIconName = ComponentProps<typeof MaterialIcon>['name'];

export type FontAwesomeIconName = ComponentProps<typeof FontAwesomeIcon>['name'];

export type IconName = MaterialIconName | FontAwesomeIconName;
