import { NavigationProp, useNavigation } from '@react-navigation/native';

import { HomeStackParams } from '@/routes/home.routes';
import { useDataContext } from '@/contexts/dataContext';
import { useSettingsContext } from '@/contexts/settingsContext';
import Header from '@/components/Header';
import NotesList from '@/components/NotesList';
import ScreenContainer from '@/components/ScreenContainer';
import ToggleHomeLayout from './components/ToggleHomeLayout';
import NotesGrid from './components/NotesGrid';

export default function Home() {
	const { notes } = useDataContext();
	const { homeLayout } = useSettingsContext();
	const navigation = useNavigation<NavigationProp<HomeStackParams>>();

	return (
		<ScreenContainer
			fabOptions={{
				icon: 'plus',
				action: () => navigation.navigate('EditNote'),
			}}
		>
			<Header title='Notas' right={<ToggleHomeLayout />} />

			{homeLayout === 'list' ? (
				<NotesList data={notes} voidMessage='Sem notas ainda.' />
			) : (
				<NotesGrid data={notes} voidMessage='Sem notas ainda.' />
			)}
		</ScreenContainer>
	);
}
