import React, { useMemo, useState } from 'react';
import styled from "@emotion/styled";
import { Global } from '@emotion/react';
import { globalStyle } from '../globalStyle';
import { IndexButtons } from '../components/index.buttons';

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

const slogans = [
	'放て、思いの丈。',
	'一人がいいけど、誰かといたい。',
	'ひとりは好きですか？',
	'呟きたい。返信はいらない。',
	'一人でいたい。けど、背中を押されたい。',
];

export const Index: React.VFC = () => {
	const slogan = useMemo(() => slogans[Math.floor(Math.random() * slogans.length)], []);
	const [state, setState] = useState<'welcome' | 'register' | 'login'>('welcome');

	const form = useMemo(() => {
		if (state === 'welcome') {
			return (
				<div className="hstack">
					<button className="btn primary" onClick={() => setState('register')}>新規登録</button>
					<button className="btn" onClick={() => setState('login')}>ログイン</button>
				</div>
			);
		} else {
			const isRegister = state === 'register';
			return (
				<>
					<h2>
						{isRegister ? '新規登録' : 'ログイン'}
					</h2>
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
					<button className="btn link" onClick={() => setState(isRegister ? 'login' : 'register')}>
						{isRegister ? 'アカウントを既にお持ちの場合は、ログイン' :	'アカウントをまだお持ちでなければ、新規登録'}
					</button>
				</>
			);
		}
	}, [state, setState]);

	return (
		<Wrapper>
			<Global styles={globalStyle} />
			<Hero className="card acrylic shadow-8">
				<div className="body pa-4">
					<div>
						<h1 className="display">ひとりすきー</h1>
						<p className="animate__animated animate__fadeInUp">{slogan}</p>
						<div className="vstack mt-4 animate__animated animate__fadeInUp animate__delay-1s">
							{form}
							<p>それとも…<a href="#">発言を覗いてみる？</a></p>
						</div>
					</div>
					<footer className="" style={{opacity: 0.5}}>
						<small>
							Made with <span className="text-pink">♥</span> by Xeltica Studio<br/>
							2.0.0-alpha.0
						</small>
					</footer>
				</div>
			</Hero>
		</Wrapper>
	);
};
