import React from 'react';
import { TimelinePage } from '../components/timeline/TimelinePage';
import { WelcomePage } from '../components/welcome/WelcomePage';
import { useSelector } from '../store';

export const Index: React.VFC = () => {
	const token = useSelector(state => state.session.token);
	return token ? <TimelinePage />: <WelcomePage />;
};
