import React, { ChangeEventHandler, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../store';
import { set } from '../store/slices/settingSlice';

import { HeaderTitle } from '../teleporters';

type InputEvent = ChangeEventHandler<HTMLInputElement>;

export const SettingPage: React.VFC = () => {
	const dispatch = useDispatch();
	const {
		themeMode,
		reduceUIAnimation,
		reduceTextAnimation,
		reduceEmojiAnimation,
		useOsNativeEmojis,
		language,
	} = useSelector(state => state.setting);

	const onCheckThemeModeLight = useCallback<InputEvent>(() => { dispatch(set({ themeMode: 'light' })); }, []);
	const onCheckThemeModeDark = useCallback<InputEvent>(() => { dispatch(set({ themeMode: 'dark' })); }, []);
	const onCheckThemeModeSystem = useCallback<InputEvent>(() => { dispatch(set({ themeMode: 'system' })); }, []);
	const onCheckReduceUIAnimation = useCallback<InputEvent>((e) => { dispatch(set({ reduceUIAnimation: e.target.checked })); }, []);
	const onCheckReduceTextAnimation = useCallback<InputEvent>((e) => { dispatch(set({ reduceTextAnimation: e.target.checked })); }, []);
	const onCheckReduceEmojiAnimation = useCallback<InputEvent>((e) => { dispatch(set({ reduceEmojiAnimation: e.target.checked })); }, []);
	const onCheckUseOsNativeEmojis = useCallback<InputEvent>((e) => { dispatch(set({ useOsNativeEmojis: e.target.checked })); }, []);

	return (
		<div className="pa-2 vstack">
			<HeaderTitle.Source>設定</HeaderTitle.Source>
			<div className="vstack">
				<div className="card shadow-1">
					<div className="body vstack">
						<h1>表示設定</h1>
						<h2 className="text-dimmed">テーマ</h2>
						<label className="input-check">
							<input type="radio" checked={themeMode === 'light'} onChange={onCheckThemeModeLight}/>
							<span>ライトテーマ</span>
						</label>
						<label className="input-check">
							<input type="radio" checked={themeMode === 'dark'} onChange={onCheckThemeModeDark}/>
							<span>ダークテーマ</span>
						</label>
						<label className="input-check">
							<input type="radio" checked={themeMode === 'system'} onChange={onCheckThemeModeSystem}/>
							<span>システム設定に準ずる</span>
						</label>
						<h2 className="text-dimmed mt-4">アクセシビリティ</h2>
						<label className="input-switch">
							<input type="checkbox" checked={reduceTextAnimation} onChange={onCheckReduceTextAnimation}/>
							<div className="switch"></div>
							<span>文字装飾のアニメーションを抑える</span>
						</label>
						<label className="input-switch">
							<input type="checkbox" checked={reduceUIAnimation} onChange={onCheckReduceUIAnimation}/>
							<div className="switch"></div>
							<span>UIのアニメーションを抑える</span>
						</label>
						<label className="input-switch">
							<input type="checkbox" checked={reduceEmojiAnimation} onChange={onCheckReduceEmojiAnimation}/>
							<div className="switch"></div>
							<span>絵文字のアニメーションを抑える</span>
						</label>
						<label className="input-switch">
							<input type="checkbox" checked={useOsNativeEmojis} onChange={onCheckUseOsNativeEmojis} />
							<div className="switch"></div>
							<span>デバイス標準の絵文字を使用する</span>
						</label>
						<h2 className="text-dimmed mt-4">言語</h2>
							<select className="input-field">
                <option value="ja">日本語</option>
                <option value="en">英語</option>
              </select>
					</div>
				</div>
				<div className="card shadow-1">
					<div className="body">
						<h1>ワードミュート</h1>
						<p className="mt-2">目につくのが嫌な単語や、嫌な話題に使われる単語などをミュートして、タイムラインを快適にしましょう。<br/>単語をミュートしている事実は誰にも伝わらないので、安心して設定できます。</p>
						<textarea className="input-field"></textarea>
					</div>
				</div>
			</div>
		</div>
	);
};
