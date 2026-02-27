import { View } from 'react-native';

import useStyles from './styles';
import { useTheme } from '@/contexts/themeContext';
import { Button, Text } from 'react-native-paper';
import { useAlertContext } from '@/contexts/alertContext';
import { useDataContext } from '@/contexts/dataContext';

interface DeleteConfirmationProps {}

export default function DeleteConfirmation(props: DeleteConfirmationProps) {
	const { dissmissModal } = useAlertContext();
	const { deleteAll } = useDataContext();
	const { theme } = useTheme();
	const styles = useStyles(theme);

	return (
		<View style={styles.container}>
			<Text variant='headlineSmall'>Atenção</Text>
			<Text>Tem certeza de que deseja excluir?</Text>

			<View style={styles.modalFooter}>
				<Button mode='contained' onPress={dissmissModal}>
					Não
				</Button>

				<Button
					mode='text'
					onPress={deleteAll}
					textColor={theme.colors.error}
				>
					Sim
				</Button>
			</View>
		</View>
	);
}
