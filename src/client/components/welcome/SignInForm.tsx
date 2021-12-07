import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSignInMutation, useSignUpMutation } from '../../api';
import { setToken } from '../../store/slices/sessionSlice';

export const SignInForm: React.VFC = () => {
	const dispatch = useDispatch();
	const [signUp, { data: u1 }] = useSignUpMutation();
	const [signIn, { data: u2 }] = useSignInMutation();

	const [isRegister, setRegister] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [isAgreeTos, setAgreeTos] = useState(false);

	const canRegister = isRegister ? (
		username && password && password === passwordConfirm && isAgreeTos
	) : (
		username && password
	);

	useEffect(() => {
		const res = u1 ?? u2;
		if (!res || !res.i) return;

		dispatch(setToken(res.i));
	}, [u1, u2]);

	const onClickRegisterButton = () => {
		if (isRegister) {
			signUp({ username, password });
		} else {
			signIn({ username, password });
		}
	};

	return (
		<>
			<div className="vstack">
				{isRegister && <p>ここで入力したユーザー情報はログインするためだけに必要であり、運営を除く他のユーザーには一切開示されません。</p> }
				<input className="input-field" spellCheck="false" autoComplete="username" autoCorrect="false" type="text" placeholder="ユーザー名..." value={username} onChange={e => setUsername(e.target.value)}/>
				<input className="input-field" type="password" placeholder="パスワード..." value={password} onChange={e => setPassword(e.target.value)} />
				{isRegister && <input className="input-field" type="password" placeholder="パスワード（確認）..." value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />}
				{isRegister && (
					<label className="input-check">
						<input type="checkbox" checked={isAgreeTos} onChange={e => setAgreeTos(e.target.checked)} />
						<span>利用規約に同意</span>
					</label>
				)}
				<button className="btn primary" disabled={!canRegister} onClick={onClickRegisterButton}>
					{isRegister ? 'アカウントを作成する' : 'ログイン'}
				</button>
				<p>
					<span className="text-dimmed">
						{isRegister ? 'アカウントを既にお持ちの方は' : 'アカウントをまだお持ちでない方は'}
						<a href="#" onClick={() => setRegister(!isRegister)}>{isRegister ? 'ログイン' : '新規登録'}</a>
					</span>
				</p>
			</div>
		</>
	);
};
