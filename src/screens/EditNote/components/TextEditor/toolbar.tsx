import { useTheme } from '@/contexts/themeContext';
import {
	Divider,
	IconButton,
	Menu,
	Surface,
	ToggleButton,
} from 'react-native-paper';
import useStyles from './styles';
import { ComponentProps, useState } from 'react';

interface ToolbarProps {
	actions: { [action: string]: (args?: any) => void };
}

function Button(
	props: Pick<ComponentProps<typeof IconButton>, 'icon' | 'onPress'>,
) {
	const { theme } = useTheme();
	const styles = useStyles(theme);
	return (
		<IconButton
			style={styles.icon}
			icon={props.icon}
			size={24}
			onPress={props.onPress}
		/>
	);
}

export default function Toolbar({ actions }: ToolbarProps) {
	const { theme } = useTheme();
	const styles = useStyles(theme);

	const [headingMenu, setHeadingMenu] = useState(false);
	const [listMenu, setListMenu] = useState(false);

	return (
		<Surface style={styles.toolbar}>
			<Button icon='format-bold' onPress={actions.bold} />
			<Button icon='format-italic' onPress={actions.italic} />
			<Divider />
			<Button icon='code-tags' onPress={actions.inlineCode} />
			<Button icon='code-block-tags' onPress={actions.codeBlock} />
			<Divider />
			<Menu
				visible={headingMenu}
				anchor={
					<Button
						icon='format-header-pound'
						onPress={() => setHeadingMenu(true)}
					/>
				}
				mode='flat'
				onDismiss={() => setHeadingMenu(false)}
			>
				<Menu.Item
					leadingIcon='format-header-1'
					title='Título 1'
					onPress={actions.h1}
				/>
				<Menu.Item
					leadingIcon='format-header-2'
					title='Título 2'
					onPress={actions.h2}
				/>
				<Menu.Item
					leadingIcon='format-header-3'
					title='Título 3'
					onPress={actions.h3}
				/>
				<Menu.Item
					leadingIcon='format-header-4'
					title='Título 4'
					onPress={actions.h4}
				/>
				<Menu.Item
					leadingIcon='format-header-5'
					title='Título 5'
					onPress={actions.h5}
				/>
				<Menu.Item
					leadingIcon='format-header-6'
					title='Título 6'
					onPress={actions.h6}
				/>
			</Menu>
			<Button icon='format-quote-open' onPress={actions.blockquote} />
			<Divider />
			<Menu
				visible={listMenu}
				anchor={
					<Button
						icon='format-list-bulleted'
						onPress={() => setListMenu(true)}
					/>
				}
				mode='flat'
				onDismiss={() => setListMenu(false)}
			>
				<Menu.Item
					leadingIcon='format-list-bulleted'
					title='Lista não ordenada'
					onPress={actions.unorderedList}
				/>
				<Menu.Item
					leadingIcon='format-list-numbered'
					title='Lista ordenada'
					onPress={actions.orderedList}
				/>
				<Menu.Item
					leadingIcon='format-list-checkbox'
					title='Lista de tarefas'
					onPress={actions.checkboxList}
				/>
			</Menu>
		</Surface>
	);
}
