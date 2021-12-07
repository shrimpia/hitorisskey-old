import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionSlice {
  token: string | null;
}

const initialState: SessionSlice = {
  token: localStorage.getItem('i'),
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
			localStorage.setItem('i', state.token);
		},
		clearToken(state) {
			state.token = null;
			localStorage.removeItem('i');
		},
  },
});

export const { setToken, clearToken } = sessionSlice.actions;


export default sessionSlice.reducer;
