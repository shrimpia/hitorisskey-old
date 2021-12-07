import React, { useMemo, useState } from 'react';
import styled from "@emotion/styled";
import { isMobile } from '../../config';
import { floatInAnimationStyle } from '../../animations/float-in';
import { slogans } from '../../misc/slogans';
import { useGetMetaQuery } from '../../api';
import { Greeting } from './Greeting';
import { SignInForm } from './SignInForm';
import { RecommendNativeAppAlert } from './RecommendNativeAppAlert';

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	flex-direction: row;
`;

const Hero = styled.div`
	max-width: 640px;
	margin: auto;
`;

export const WelcomePage: React.VFC = () => {
	const slogan = useMemo(() => slogans[Math.floor(Math.random() * slogans.length)], []);
	const [state, setState] = useState<'welcome' | 'register' | 'login'>('welcome');

	const { data: meta } = useGetMetaQuery();

	return (
		<Wrapper>
			<Hero className="card acrylic shadow-6 fluid mx-2">
				<div className="body pa-4">
					<div>
						<h1 className="display" style={{lineHeight: 1}}>ひとりすきー</h1>
						<p css={floatInAnimationStyle}>{slogan}</p>
						<div className="mt-4" css={floatInAnimationStyle} style={{animationDelay: '0.25s'}}>
							<SignInForm />
						</div>
					</div>
					<footer className="text-right mt-4 text-dimmed">
						<small>
							Made with <span className="text-pink">♥</span> by <a href="//xeltica.work" target="_blank" rel="noopener noreferrer">Xeltica Studio</a><br/>
							{meta?.version ?? '取得中…'}
						</small>
					</footer>
				</div>
			</Hero>
			{isMobile && <RecommendNativeAppAlert />}
		</Wrapper>
	);
};
