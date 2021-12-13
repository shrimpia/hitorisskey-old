import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useReadTimelineQuery } from '../../api';
import { Note } from '../../models/note';
import { useSelector } from '../../store';
import { NotesListView } from '../NotesListView';
import { Spinner } from '../primitive/Spinner';


export const PersonalTimeline: React.VFC = () => {
	const dispatch = useDispatch();

	const {token} = useSelector(state => state.session);

	const [currentUntilId, setCurrentUntilId] = useState<string | undefined>(undefined);
	const [notes, setNotes] = useState<Note[]>([]);
	const { data, isLoading, error } = useReadTimelineQuery({
		limit: 10,
		untilId: currentUntilId,
		i: token ?? undefined,
	});

	/** ToDo: 無限スクロールに対応させる */
	useEffect(() => {
		if (!data) return;
		setNotes([ ...data ]);
	}, [data]);

	return (
		<div className="vstack animate-fade">
			{data && <NotesListView notes={notes} />}
			<div className="flex f-center">{isLoading && <Spinner />}</div>
		</div>
	);
};
