import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeType, TimelineType, Language } from '../../models/unions';

interface SettingState {
	/** テーマモード */
  themeMode: ThemeType;
	/** 現在のタイムライン */
	currentTimeline: TimelineType,
	/** 文字装飾のアニメーションを減らすかどうか */
	reduceTextAnimation: boolean,
	/** UIのアニメーションを減らすかどうか */
	reduceUIAnimation: boolean,
	/** OS標準の絵文字を使うかどうか */
	useOsNativeEmojis: boolean,
	/** 言語設定 */
	language: Language,
}

const initialState: SettingState = {
  themeMode: 'system',
	currentTimeline: 'everyone',
	reduceTextAnimation: false,
	reduceUIAnimation: false,
	useOsNativeEmojis: false,
	language: 'ja',
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
		set(state, {payload}: PayloadAction<Partial<SettingState>>) {
			state = Object.assign(state, payload);
		}
  },
});

export const { set } = settingSlice.actions;

export default settingSlice.reducer;
