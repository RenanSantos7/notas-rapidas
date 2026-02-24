import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';

import { NoteProps } from '@/types';
import ManageNote from '@/components/ManageNote';
import { Portal } from 'react-native-paper';

interface IAlertContext {
	useModal: (note: NoteProps) => void;
}

const AlertContext = createContext<IAlertContext>(undefined);

export default function AlertProvider({ children }: PropsWithChildren) {
	const [selectedNote, setSelectedNote] = useState(null);

	function useModal(note: NoteProps) {
		setSelectedNote(note);
	}

	return (
		<AlertContext.Provider value={{ useModal }}>
			<Portal>
				<ManageNote
					visible={selectedNote !== null}
					dismiss={() => setSelectedNote(null)}
					note={selectedNote}
				/>
			</Portal>
			{children}
		</AlertContext.Provider>
	);
}

export function useAlertContext() {
	const context = useContext(AlertContext);
	if (!context)
		throw new Error('AlertContext não está sendo provido neste componente');
	return context;
}
