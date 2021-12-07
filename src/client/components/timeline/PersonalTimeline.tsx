import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import { useTimelineQuery } from '../../api';
import { Note } from '../../models/note';
import { Spinner } from '../primitive/Spinner';
import { useDispatch } from 'react-redux';
import { clearToken } from '../../store/slices/sessionSlice';

import { BsEmojiSmile, BsPlus, BsThreeDots } from 'react-icons/bs';

const Cards = styled.article`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: var(--margin);
	
	// tablet
  @media (max-width: 1200px) {
		grid-template-columns: repeat(2, 1fr);
  }
	
	// phone
  @media (max-width: 700px) {
		grid-template-columns: 1fr;
  }
`;

export const PersonalTimeline: React.VFC = () => {
	const dispatch = useDispatch();

	const [currentUntilId, setCurrentUntilId] = useState<string | undefined>(undefined);
	const [notes, setNotes] = useState<Note[]>([]);
	const { data, isLoading, error } = useTimelineQuery({
		limit: 100,
		untilId: currentUntilId,
	});

	useEffect(() => {
		if (!data) return;
		setNotes(data);
	}, [data]);

	return (
		<div className="container">
			<div className="vstack">
				<Cards>
					{notes.map(note => (
						<div className="card" key={note.id}>
							<div className="body">
								<p>{note.text}</p>
								<button className="btn flat"><BsEmojiSmile/><BsPlus/></button>
								<button className="btn flat"><BsThreeDots/></button>
							</div>
						</div>
					))}
				</Cards>
				<div className="flex f-center">{isLoading && <Spinner />}</div>
				<button className="btn danger" onClick={() => dispatch(clearToken())}>ログアウト</button>
			</div>
		</div>
	);
};
