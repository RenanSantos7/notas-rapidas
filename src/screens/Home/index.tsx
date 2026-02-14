import { Text } from 'react-native';

import ScreenContainer from '@/components/ScreenContainer';
import Header from './components/Header';
import useStyles from './styles';

export default function Home() {
	return (
		<ScreenContainer noPadding>
			<Header
				title='Notas'
				onSearch={(query: string) => console.log(query)}
			/>
		</ScreenContainer>
	);
}
