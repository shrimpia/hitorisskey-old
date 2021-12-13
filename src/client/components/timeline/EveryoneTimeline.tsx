import React, { useEffect } from 'react';

import { useReadLocalTimelineQuery } from '../../api';
import { NotesListView } from '../NotesListView';
import { Spinner } from '../primitive/Spinner';


export const EveryoneTimeline: React.VFC = () => {
	const { data, isLoading, error } = useReadLocalTimelineQuery({
		limit: 15,
	}, { refetchOnMountOrArgChange: true });

	return (
		<div className="vstack">
			{data && <NotesListView notes={data} />}
			<div className="flex f-center">{isLoading && <Spinner />}</div>
		</div>
	);
};
