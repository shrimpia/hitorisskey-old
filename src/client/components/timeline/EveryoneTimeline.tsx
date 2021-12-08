import React, { useEffect } from 'react';

import { useLocalTimelineQuery } from '../../api';
import { NotesListView } from '../NotesListView';
import { Spinner } from '../primitive/Spinner';


export const EveryoneTimeline: React.VFC = () => {
	const { data, isLoading, error } = useLocalTimelineQuery({
		limit: 15,
	}, { refetchOnMountOrArgChange: true });

	return (
		<div className="vstack">
			{data && <NotesListView notes={data} />}
			<div className="flex f-center">{isLoading && <Spinner />}</div>
		</div>
	);
};
