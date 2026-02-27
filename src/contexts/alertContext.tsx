import {
	createContext,
	PropsWithChildren,
	ReactNode,
	useContext,
	useState,
} from 'react';

import { useTheme } from './themeContext';
import Modal from '@/components/Modal';

interface IAlertContext {
	useModal: (content: ReactNode) => void;
	dissmissModal: () => void;
}

const AlertContext = createContext<IAlertContext>(undefined);

export default function AlertProvider({ children }: PropsWithChildren) {
	const [modalContent, setModalContent] = useState<ReactNode>(null);

	function useModal(content: ReactNode) {
		setModalContent(content);
	}

	function dissmissModal() {
		setModalContent(null);
	}

	return (
		<AlertContext.Provider value={{ useModal, dissmissModal }}>
			<Modal visible={modalContent !== null} close={dissmissModal}>
				{modalContent}
			</Modal>
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
