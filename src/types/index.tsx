import { RootTabsParams } from '@/routes/app.routes';

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootTabsParams {}
	}
}

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

export type HomeLayout = 'grid' | 'list'