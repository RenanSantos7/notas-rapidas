import { Text } from 'react-native';
import ScreenContainer from '@/components/ScreenContainer';
import { FAB } from 'react-native-paper';
import { HomeStackParams } from '@/routes/home.routes';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import useStyles from './styles';

export default function EditNote() {
	const { navigate } = useNavigation<NavigationProp<HomeStackParams>>();

	function handleSave() {
		setTimeout(() => {
			navigate('Home');
		}, 600);
	}

	return (
		<ScreenContainer>
			<Text>EditNote</Text>

			<FAB
				icon='content-save'
				variant='primary'
				onPress={handleSave}
				style={{
					position: 'absolute',
					margin: 16,
					right: 20,
					bottom: 40,
				}}
			/>
		</ScreenContainer>
	);
}
