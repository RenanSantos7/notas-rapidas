import { FlatList } from 'react-native';

import { Chip } from 'react-native-paper';

import { NoteProps } from '@/types';
import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';

interface TagContainerProps {
    tags: NoteProps['tags']
};

export default function TagContainer(props: TagContainerProps) {
    const { theme } = useTheme();
    const styles = useStyles(theme);
    
    return (
        <FlatList
            data={props.tags}
            renderItem={({ item }) => <Chip>{item}</Chip>}
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.list}
            horizontal
        />
    );
};
