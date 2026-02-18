import { NavigationProp, useNavigation } from '@react-navigation/native';

import { FAB } from 'react-native-paper';

import { HomeStackParams } from '@/routes/home.routes';
import { useDataContext } from '@/contexts/dataContext';
import NotesList from '@/components/NotesList';
import Header from '@/components/Header';
import ScreenContainer from '@/components/ScreenContainer';
import useStyles from './styles';

export default function Home() {
	const { notes } = useDataContext();
	const navigation = useNavigation<NavigationProp<HomeStackParams>>();

	return (
		<ScreenContainer>
			<Header title='Notas' canGoBack={navigation.canGoBack()} />

			<NotesList data={notes} />

			<FAB
				icon='plus'
				variant='primary'
				onPress={() => navigation.navigate('EditNote')}
				style={{
					position: 'absolute',
					margin: 16,
					right: 20,
					bottom: 120,
				}}
			/>
		</ScreenContainer>
	);
}
