import React, { useEffect, useState } from 'react';
import { Timeline } from './Timeline';
import { TimelineType } from '../../models/timeline-type';


export const TimelinePage: React.VFC = () => {
	const [src, setSrc] = useState<TimelineType>('personal');

	return (
		<div>
			<h2>タイムライン</h2>
			<div className="tab mb-2 shadow-1 rounded">
				<button className={`item ${src === 'everyone' ? 'active' : ''}`} onClick={() => setSrc('everyone')}>みんな</button>
				<button className={`item ${src === 'personal' ? 'active' : ''}`} onClick={() => setSrc('personal')}>わたし</button>
				<button className={`item ${src === 'now' ? 'active' : ''}`} onClick={() => setSrc('now')}>なう！</button>
			</div>
			<Timeline src={src} />
		</div>
	);
};
