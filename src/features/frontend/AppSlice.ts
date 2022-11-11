import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type appStateType = {
	step: number,
	error: undefined | string
}

const initialState: appStateType = {
	step: 0,
	error: undefined
}

const AppSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		nextStep: (appState) => {
			appState.step += 1
		},
		prevStep: (appState) => {
			appState.step -= 1
		},
		setError: (appState, action: PayloadAction<string | undefined>) => {
			appState.error = action.payload
		}
	}
});

export const { ...reducers } = AppSlice.actions

export default AppSlice.reducer