import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import { css } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { BsEmojiSmile, BsPlus, BsThreeDots, BsTrash } from 'react-icons/bs';

import { TimelineType } from '../../models/timeline-type';
import { useTimelineQuery } from '../../api';
import { Note } from '../../models/note';
import { Spinner } from '../primitive/Spinner';

export type TimelineProp = {
	src: TimelineType,
};

const Cards = styled.div`
	> .card:not(:last-child) {
		border-bottom: 1px solid var(--tone-2);
	}
`;

const commandButtonStyle = css`
	width: 50px;
	padding-left: 0 !important;
	padding-right: 0 !important;
	text-align: center;
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
				{notes.map(note => (
					<div className="card shadow-1" key={note.id}>
						<div className="body vstack dense" style={{height: '100%'}}>
							<p style={{flex: 1}}>{note.text}</p>
							<div className="hstack dense">
								<button className="btn flat" css={commandButtonStyle}><BsEmojiSmile/><BsPlus/></button>
								{note.isMyNote && (
									<button className="btn flat" css={commandButtonStyle}><BsTrash /></button>
								)}
								<button className="btn flat" css={commandButtonStyle}><BsThreeDots/></button>
							</div>
						</div>
					</div>
				))}
			</Cards>
			<div className="flex f-center">{isLoading && <Spinner />}</div>
		</div>
	);
};
