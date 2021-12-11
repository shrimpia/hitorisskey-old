import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScreenState {
  title: string | null;
}

const initialState: ScreenState = {
  title: null,
}

export const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
		setTitle(state, {payload}: PayloadAction<string>) {
			state.title = payload;
		},
  },
});

export const { setTitle } = screenSlice.actions;


export default screenSlice.reducer;
