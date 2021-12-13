import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { BsX } from "react-icons/bs";
import { FaEyeSlash, FaRegLaugh } from "react-icons/fa";
import { useCreateNoteMutation } from "../api";
import { TimelineType } from "../models/unions";
import { useSelector } from "../store";

const Card = styled.div`
	box-shadow: 0 0 16px rgba(0, 0, 0, 0.18);
`;

const pcStyle = css`
	width: 480px;
`;

const CwButton = styled.button`
	border-color: var(--dimmed) !important;
`;

const Textarea = styled.textarea`
	height: 7em;
`;

const toJapanese = (tl: TimelineType) => {
	switch (tl) {
		case 'personal': return '鍵付きで投稿';
		case 'everyone': return '公開投稿';
		case 'now': return 'なう！';
	}
};

export const PostForm: React.VFC = () => {
	const {currentTimeline} = useSelector(state => state.setting);
	const {token} = useSelector(state => state.session);
	const [createNote, createNoteApiState] = useCreateNoteMutation();

	const [isEnableCw, setEnableCw] = useState(false);
	const [cwMessage, setCwMessage] = useState('');
	const [text, setText] = useState('');

	const onClickEnableCw = useCallback(() => {
		setEnableCw(true);
	}, []);

	const onClickDisableCw = useCallback(() => {
		setEnableCw(false);
	}, []);

	const onChangeCw = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
		setCwMessage(e.target.value);
	}, []);

	const onChangeText = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((e) => {
		setText(e.target.value);
	}, []);

	const onClickPost = useCallback(() => {
		const visibility = currentTimeline === 'personal' ? 'followers' : 'public';
		console.log('onClickPost');
		createNote({
			i: token,
			text,
			visibility,
			cw: isEnableCw ? cwMessage : null,
		}).then(() => {
			setText('');
		});
	}, [token, text, currentTimeline, isEnableCw, cwMessage]);

	const isFormDisabled = createNoteApiState.isLoading;

	return (
		<Card css={pcStyle} className="card fix-bottom-right-2">
			<div className="body">
				{isEnableCw ? (
					<div className="hstack dense">
						<button className="btn flat pa-1 mr-1" onClick={onClickDisableCw} disabled={isFormDisabled}><BsX /></button>
						<input type="text" className="input-field" placeholder="注釈" disabled={isFormDisabled} value={cwMessage} onChange={onChangeCw} />
					</div>
				) : (
					<CwButton className="btn text-left px-1 text-dimmed" disabled={isFormDisabled} onClick={onClickEnableCw}>
						<FaEyeSlash/> 投稿内容を伏せる
					</CwButton>
				)}
				<Textarea className="input-field mt-1" disabled={isFormDisabled} placeholder="好きなことを書きましょう。" value={text} onChange={onChangeText} />
				<div className="hstack dense f-right mt-1">
					<button className="btn flat" disabled={isFormDisabled}><FaRegLaugh /></button>
					<button className="btn primary" disabled={isFormDisabled} onClick={onClickPost}>
						{createNoteApiState.isLoading ? '投稿中…' : toJapanese(currentTimeline)}
					</button>
				</div>
			</div>
		</Card>
	);
};
