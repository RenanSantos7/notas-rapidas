import {
	createContext,
	PropsWithChildren,
	ReactNode,
	useContext,
	useState,
} from 'react';

import { Modal, Portal } from 'react-native-paper';

import { useTheme } from './themeContext';

interface IAlertContext {
	useModal: (content: ReactNode) => void;
	dissmissModal: () => void;
}

const AlertContext = createContext<IAlertContext>(undefined);

export default function AlertProvider({ children }: PropsWithChildren) {
	const { theme } = useTheme();

	const [modalContent, setModalContent] = useState<ReactNode>(null);

	function useModal(content: ReactNode) {
		setModalContent(content);
	}

	function dissmissModal() {
		setModalContent(null);
	}

	return (
		<AlertContext.Provider value={{ useModal, dissmissModal }}>
			<Portal>
				<Modal
					visible={modalContent !== null}
					onDismiss={dissmissModal}
					contentContainerStyle={{
						alignSelf: 'center',
						width: 375,
						borderRadius: theme.sizes.borderRadius.xl,
						backgroundColor: theme.colors.background,
						overflow: 'hidden',
					}}
				>
					{modalContent}
				</Modal>
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
