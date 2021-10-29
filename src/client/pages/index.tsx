import React, { useEffect, useMemo, useState } from 'react';
import styled from "@emotion/styled";
import { fetchMetaAsync } from '../api/timeline';
import { isMobile } from '../config';
import { floatInAnimationStyle } from '../animations/float-in';
import { FlatButton } from '../components/flat-button';

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: row;
`;

const Hero = styled.div`
	max-width: 640px;
	margin: auto;
`;

const Balloon = styled.div`
	position: fixed;
	width: 192px;
	z-index: -1000;
`;

const BottomAlert = styled.div`
	position: fixed;
	left: var(--margin);
	right: var(--margin);
	bottom: var(--margin);
	z-index: 1000;
`;

const slogans = [
	'放て、思いの丈。',
	'一人がいいけど、誰かといたい。',
	'ひとりは好きですか？',
	'呟きたい。返信はいらない。',
	'一人でいたい。けど、背中を押されたい。',
];

type Balloon = {
	text: string;
	left: number;
	top: number;
};

export const Index: React.VFC = () => {
	const slogan = useMemo(() => slogans[Math.floor(Math.random() * slogans.length)], []);
	const [state, setState] = useState<'welcome' | 'register' | 'login'>('welcome');

	const [meta, setMeta] = useState<any>(null);
	const [showNativeAppAlert, setShowNativeAppAlert] = useState(true);

	useEffect(() => {
		(async () => {
			setMeta(await fetchMetaAsync());
		})();
	}, []);

	const form = useMemo(() => {
		if (state === 'welcome') {
			return (
				<>
					<div className="hstack">
						<button className="btn primary" onClick={() => setState('register')}>新規登録</button>
						<button className="btn" onClick={() => setState('login')}>ログイン</button>
					</div>
					<div className="mt-4">
						それとも…
						<ul>
							<li><a href="#">発言を覗いてみる</a></li>
							<li><a href="#">もっと詳しく</a></li>
						</ul>
					</div>
				</>
			);
		} else {
			const isRegister = state === 'register';
			return (
				<>
					<header className="hstack dense mb-2">
						<button className="btn flat" onClick={() => setState('welcome')}>
							<i className="bi bi-arrow-left"></i>
						</button>
						<h2 className="mb-0">{isRegister ? '新規登録' : 'ログイン'}</h2>
					</header>
					<div className="vstack">
						<input className="input-field" dir="auto" spellCheck="false" autoComplete="on" autoCorrect="false" type="text" placeholder="ユーザー名..." />
						<input className="input-field" type="password" placeholder="パスワード..." />
						{isRegister && <input className="input-field" type="password" placeholder="パスワード（確認）..." />}
						{isRegister && (
							<label className="input-check">
								<input type="checkbox" />
								<span>利用規約に同意</span>
							</label>
						)}
						<button className="btn primary" disabled>
							{isRegister ? '登録' : 'ログイン'}
						</button>
					</div>
				</>
			);
		}
	}, [state, setState]);

	return (
		<Wrapper>
			<Hero className="card acrylic shadow-6">
				<div className="body pa-4">
					<div>
						<h1 className="display" style={{lineHeight: 1}}>ひとりすきー</h1>
						<p css={floatInAnimationStyle}>{slogan}</p>
						<div className="mt-4" css={floatInAnimationStyle} style={{animationDelay: '0.25s'}}>
							{form}
						</div>
					</div>
					<footer className="text-right mt-4" style={{opacity: 0.5}}>
						<small>
							Made with <span className="text-pink">♥</span> by <a href="//xeltica.work" target="_blank" rel="noopener noreferrer">Xeltica Studio</a><br/>
							{meta?.version ?? '取得中…'}
						</small>
					</footer>
				</div>
			</Hero>
			{isMobile && showNativeAppAlert &&
				<BottomAlert className="alert shadow-6" css={floatInAnimationStyle}>
					スマホアプリもあります。
					<a href="#">試す</a>
				</BottomAlert>
			}
		</Wrapper>
	);
};
