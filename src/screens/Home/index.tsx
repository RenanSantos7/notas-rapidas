import { NavigationProp, useNavigation } from '@react-navigation/native';

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
		<ScreenContainer
			fabOptions={{
				icon: 'plus',
				action: () => navigation.navigate('EditNote')
			}}
		>
			<Header title='Notas' />

			<NotesList data={notes} voidMessage='Sem notas ainda.' />
		</ScreenContainer>
	);
}
