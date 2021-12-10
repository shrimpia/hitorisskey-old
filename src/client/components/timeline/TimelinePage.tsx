import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import { PersonalTimeline } from './PersonalTimeline';
import { EveryoneTimeline } from './EveryoneTimeline';
import { useSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { set } from '../../store/slices/settingSlice';
import { TimelineType } from '../../models/unions';
import { NowTimeline } from './NowTimeline';

const Header = styled.header`
	position: sticky;
	top: 0;
	z-index: 200;
	border-bottom: 1px solid var(--tone-2);
`;

export const TimelinePage: React.VFC = () => {
	const dispatch = useDispatch();
	const src = useSelector(state => state.setting.currentTimeline);

	const setSrc = useCallback((tl: TimelineType) => dispatch(set({
		currentTimeline: tl
	})), []);

	return (
		<>
			<Header>
				<div className="navbar" style={{background: 'var(--bg)'}}>
					<h1 className="navbar-title text-size-large">タイムライン</h1>
				</div>
				<div className="tab" style={{background: 'var(--bg)'}}>
					<button className={`item ${src === 'everyone' ? 'active' : ''}`} onClick={() => setSrc('everyone')}>みんな</button>
					<button className={`item ${src === 'personal' ? 'active' : ''}`} onClick={() => setSrc('personal')}>わたし</button>
					<button className={`item ${src === 'now' ? 'active' : ''}`} onClick={() => setSrc('now')}>なう！</button>
				</div>
			</Header>
			<div className="pa-2">
				{src === 'personal' && <PersonalTimeline />}
				{src === 'everyone' && <EveryoneTimeline />}
				{src === 'now' && <NowTimeline />}
			</div>
		</>
	);
};
