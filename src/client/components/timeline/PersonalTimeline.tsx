import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTimelineQuery } from '../../api';
import { Note } from '../../models/note';
import { NotesListView } from '../NotesListView';
import { Spinner } from '../primitive/Spinner';


export const PersonalTimeline: React.VFC = () => {
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
		<div className="vstack animate-fade">
			{data && <NotesListView notes={data} />}
			<div className="flex f-center">{isLoading && <Spinner />}</div>
		</div>
	);
};
