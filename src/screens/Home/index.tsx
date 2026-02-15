import ScreenContainer from '@/components/ScreenContainer';
import Header from '../../components/Header';
import useStyles from './styles';
import NotesList from './components/NotesList';
import { useDataContext } from '@/contexts/dataContext';

export default function Home() {
	const { notes } = useDataContext();

	return (
		<ScreenContainer>
			<Header
				title='Notas'
			/>

			<NotesList data={notes} />
		</ScreenContainer>
	);
}
