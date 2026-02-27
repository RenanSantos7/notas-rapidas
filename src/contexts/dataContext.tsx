import { createContext, ReactNode, useContext } from 'react';

import { Alert } from 'react-native';

import 'react-native-get-random-values';
import * as Sharing from 'expo-sharing';
import { File, Paths } from 'expo-file-system';
import { v7 as uuidv7 } from 'uuid';

import { CrudeNoteProps, NoteProps } from '@/types';
import usePersistentState from '@/hooks/usePersistentState';
import isEqualArrays from '@/utils/isEqualArrays';

interface IDataContext {
	notes: NoteProps[];
	createNote: (data: CrudeNoteProps) => void;
	editNote: (data: NoteProps) => void;
	deleteNote: (id: NoteProps['id']) => void;
	deleteAll: () => void;
	exportNote: (note: NoteProps) => Promise<void>;
}

const DataContext = createContext<IDataContext>(undefined);

export default function DataProvider({ children }: { children: ReactNode }) {
	const [notes, setNotes] = usePersistentState<NoteProps[]>('@notes', []);

	function createNote(data: CrudeNoteProps) {
		const newNote = {
			id: uuidv7(),
			ctime: new Date().toISOString(),
			...data,
		};

		setNotes(prev => [...prev, newNote]);
	}

	function editNote(data: NoteProps) {
		const currentNote = notes.find(note => note.id === data.id);
		const contentWasModified = currentNote.content != data.content;
		const tagsWasModified = !isEqualArrays(currentNote.tags, data.tags);
		const titleWasModified = currentNote.title != data.title;
		const noteWasModified =
			titleWasModified || tagsWasModified || contentWasModified;

		if (noteWasModified) {
			const editedNote = {
				...currentNote,
				mtime: new Date().toISOString(),
				tags: data.tags,
				content: data.content,
				title: data.title,
			};

			setNotes(prev =>
				prev.map(note => (note.id === data.id ? editedNote : note)),
			);
		}
	}

	function deleteNote(id: NoteProps['id']) {
		setNotes(prev => prev.filter(note => note.id != id));
	}

	function deleteAll() {
		setNotes([]);
	}

	async function exportNote(note: NoteProps) {
		const fileName = `${note.title.replace(/[\s+]/g, '_')}.md`;
		const noteFile = new File(Paths.cache, fileName);
		const content = `---
tags: ${JSON.stringify(note.tags)}
criação: ${note.ctime.slice(0, 10)}${note?.mtime ? `\nmodificação: ${note.mtime}` : ''}
---
${note.content}
`;

		try {
			noteFile.create();
			noteFile.write(content);

			const isShareAvailable = await Sharing.isAvailableAsync();

			if (isShareAvailable) {
				await Sharing.shareAsync(noteFile.uri, {
					mimeType: 'text/markdown',
					dialogTitle: 'Compartilhar nota',
				});
			} else {
				Alert.alert('Erro', 'Compartilhamento não disponível.');
			}
		} catch (error) {
			Alert.alert('Erro', 'Falha ao processar o arquivo da nota.');
			console.error(error);
		}
	}

	return (
		<DataContext.Provider
			value={{
				notes,
				createNote,
				editNote,
				deleteNote,
				deleteAll,
				exportNote,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

export function useDataContext() {
	const context = useContext(DataContext);
	if (!context)
		throw new Error('DataContext não está sendo provido neste componente');
	return context;
}
