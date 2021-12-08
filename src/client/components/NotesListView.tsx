import React from "react";
import styled from "@emotion/styled";

import { Note } from "../models/note";
import { NoteView } from "./NoteView";

export type NotesListViewProp = {
	notes: Note[];
};

const Cards = styled.div`
	> .card:not(:last-child) {
		border-bottom: 1px solid var(--tone-2);
	}
`;

export const NotesListView: React.VFC<NotesListViewProp> = ({notes}) => {
	return (
		<Cards className="vgroup">
			{notes.map(note => <NoteView note={note} key={note.id} />)}
		</Cards>
	);
};
