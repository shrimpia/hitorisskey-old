import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  token: string | null;
}

const initialState: SessionState = {
  token: null,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		},
		clearToken(state) {
			state.token = null;
		},
  },
});

export const { setToken, clearToken } = sessionSlice.actions;


export default sessionSlice.reducer;
