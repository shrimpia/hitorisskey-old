import React from 'react';
import { PersonalTimeline } from '../components/timeline/PersonalTimeline';
import { WelcomePage } from '../components/welcome/WelcomePage';
import { useSelector } from '../store';

export const Index: React.VFC = () => {
	const token = useSelector(state => state.session.token);
	return token ? <PersonalTimeline /> : <WelcomePage />;
};
