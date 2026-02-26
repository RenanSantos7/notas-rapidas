import { View, Text } from 'react-native';

import { Divider, TouchableRipple } from 'react-native-paper';
import MaterialIcons from '@react-native-vector-icons/material-design-icons';

import { useTheme } from '@/contexts/themeContext';
import { useSettingsContext } from '@/contexts/settingsContext';
import Header from '@/components/Header';
import ScreenContainer from '@/components/ScreenContainer';
import useStyles from './styles';
import { useAlertContext } from '@/contexts/alertContext';
import DeleteConfirmation from './components/DeleteConfirmation';

export default function Settings() {
	const { useModal } = useAlertContext();
	const { theme } = useTheme();
	const { exportNotes } = useSettingsContext();
	const styles = useStyles(theme);

	function handleDeleteAll() {
		useModal(<DeleteConfirmation />);
	}

	return (
		<ScreenContainer noPadding>
			<Header title='Opções' />

			<TouchableRipple rippleColor='#cccccc' onPress={exportNotes}>
				<View style={styles.optionContainer}>
					<MaterialIcons name='export' size={28} />
					<View>
						<Text style={styles.buttonTitle}>Exportar notas</Text>
						<Text style={styles.buttonLabel}>
							Exporta todas as notas em formato Markdown para
							Downloads/notes
						</Text>
					</View>
				</View>
			</TouchableRipple>

			<Divider />

			<TouchableRipple rippleColor='#cccccc' onPress={handleDeleteAll}>
				<View style={styles.optionContainer}>
					<MaterialIcons
						name='trash-can-outline'
						color={theme.colors.error}
						size={28}
					/>
					<Text style={[styles.buttonTitle, styles.textError]}>
						Excluir todas as notas
					</Text>
				</View>
			</TouchableRipple>
		</ScreenContainer>
	);
}
