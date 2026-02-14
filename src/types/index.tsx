export type CrudeNoteProps = {
	title: string;
	content: string; // sintaxe markdown
	tags: string[];
};

export type NoteProps = CrudeNoteProps & {
	id: string; // uuid v7
	readonly ctime: string; // ISO format date
	mtime?: string; // ISO format date
};
