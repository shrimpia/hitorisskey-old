import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import { useDispatch } from 'react-redux';

import { TimelineType } from '../../models/timeline-type';
import { useTimelineQuery } from '../../api';
import { Note } from '../../models/note';
import { Spinner } from '../primitive/Spinner';
import { NoteView } from '../NoteView';

export type TimelineProp = {
	src: TimelineType,
};

const Cards = styled.div`
	> .card:not(:last-child) {
		border-bottom: 1px solid var(--tone-2);
	}
`;

export const Timeline: React.VFC<TimelineProp> = () => {
	const dispatch = useDispatch();

	const [currentUntilId, setCurrentUntilId] = useState<string | undefined>(undefined);
	const [notes, setNotes] = useState<Note[]>([]);
	const { data, isLoading, error } = useTimelineQuery({
		limit: 10,
		untilId: currentUntilId,
	});

	/** ToDo: 無限スクロールに対応させる */
	useEffect(() => {
		if (!data) return;
		setNotes([ ...data ]);
	}, [data]);

	return (
		<div className="vstack">
			<Cards className="vgroup">
				{notes.map(note => <NoteView note={note} />)}
			</Cards>
			<div className="flex f-center">{isLoading && <Spinner />}</div>
		</div>
	);
};
