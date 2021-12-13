import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { BsPlus } from 'react-icons/bs';
import { FaEdit, FaEllipsisH, FaRegSmile, FaTrashAlt } from "react-icons/fa";

import { Note } from "../models/note";

export type NoteProp = {
	note: Note;
};

const commandButtonStyle = css`
	width: 50px;
	padding-left: 0 !important;
	padding-right: 0 !important;
	text-align: center;
`;

export const NoteView: React.VFC<NoteProp> = ({note}) => {
	const [isCwOpen, setCwOpen] = useState(false);

	const hasCw = note.cw != null;
	const textView = <p className="mb-1" style={{flex: 1}}>{note.text}</p>;

	const onClickCwButton = useCallback(() => {
		setCwOpen(!isCwOpen);
	}, [isCwOpen]);

	return (
		<div className="card shadow-1 animate-fade" key={note.id}>
			<div className="body vstack dense" style={{height: '100%'}}>
				{hasCw && (
					<div className="cw mb-2">
						{note.cw}
						<button className="btn primary ml-2 py-0 px-1" onClick={onClickCwButton}>{isCwOpen ? '閉じる' : '開く'}</button>
					</div>
				)}
				{(!hasCw || isCwOpen) && textView}
				<div className="hstack dense">
					<button className="btn flat" css={commandButtonStyle}><FaRegSmile/><BsPlus/></button>
					{note.isMyNote && (
						<button className="btn flat" css={commandButtonStyle}><FaEdit /></button>
					)}
					{note.isMyNote && (
						<button className="btn flat" css={commandButtonStyle}><FaTrashAlt /></button>
					)}
					<button className="btn flat" css={commandButtonStyle}><FaEllipsisH/></button>
				</div>
			</div>
		</div>
	);
};
