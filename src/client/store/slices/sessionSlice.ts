import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  token: string | undefined;
}

const initialState: SessionState = {
  token: undefined,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		},
		clearToken(state) {
			state.token = undefined;
		},
  },
});

export const { setToken, clearToken } = sessionSlice.actions;


export default sessionSlice.reducer;
