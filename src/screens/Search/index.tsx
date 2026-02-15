import { Text } from 'react-native';
import ScreenContainer from '@/components/ScreenContainer'
import useStyles from './styles';
import Header from '@/components/Header';

export default function Search() {
    return (
        <ScreenContainer>
            <Header title='Pesquisar' />
        </ScreenContainer>
    );
};
