import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import { PersonalTimeline } from './PersonalTimeline';
import { EveryoneTimeline } from './EveryoneTimeline';
import { useSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { set } from '../../store/slices/settingSlice';
import { TimelineType } from '../../models/unions';
import { NowTimeline } from './NowTimeline';
import { HeaderComponentSlot, HeaderTitle } from '../../teleporters';
import { PostFormButton } from '../PostFormButton';

export const TimelinePage: React.VFC = () => {
	const dispatch = useDispatch();
	const src = useSelector(state => state.setting.currentTimeline);

	const setSrc = useCallback((tl: TimelineType) => dispatch(set({
		currentTimeline: tl
	})), []);

	return (
		<div className="pa-2">
			<HeaderTitle.Source>タイムライン</HeaderTitle.Source>
			<HeaderComponentSlot.Source>
				<div className="tab" style={{background: 'var(--bg)'}}>
					<button className={`item ${src === 'everyone' ? 'active' : ''}`} onClick={() => setSrc('everyone')}>みんな</button>
					<button className={`item ${src === 'personal' ? 'active' : ''}`} onClick={() => setSrc('personal')}>わたし</button>
					<button className={`item ${src === 'now' ? 'active' : ''}`} onClick={() => setSrc('now')}>なう！</button>
				</div>
			</HeaderComponentSlot.Source>
			{src === 'personal' && <PersonalTimeline />}
			{src === 'everyone' && <EveryoneTimeline />}
			{src === 'now' && <NowTimeline />}
			<PostFormButton />
		</div>
	);
};
