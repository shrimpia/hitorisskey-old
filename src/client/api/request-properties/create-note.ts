import { BaseProp } from "./base";

export interface NotesCreateProp extends BaseProp {
	text: string;
	cw: string | null;
	visibility: 'public' | 'followers';
};
