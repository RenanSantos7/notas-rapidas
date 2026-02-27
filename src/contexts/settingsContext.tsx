import {
	createContext, PropsWithChildren, useContext, useState
} from 'react';

import { HomeLayout, NoteProps } from '@/types';

interface ISettings {
	homeLayout: HomeLayout;
	toggleHomeLayout: () => void;
}

const SettingsContext = createContext<ISettings>(undefined);

export default function SettingsProvider({ children }: PropsWithChildren) {
	const [homeLayout, setHomeLayout] =
		useState<ISettings['homeLayout']>('list');

	function toggleHomeLayout() {
		if (homeLayout === 'grid') setHomeLayout('list');
		if (homeLayout === 'list') setHomeLayout('grid');
	}

	return (
		<SettingsContext.Provider
			value={{
				homeLayout,
				toggleHomeLayout,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
}

export function useSettingsContext() {
	const context = useContext(SettingsContext);
	if (!context)
		throw new Error(
			'SettingsContext não está sendo provido neste componente',
		);
	return context;
}
