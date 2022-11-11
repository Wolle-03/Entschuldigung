import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type reasonStateType = {
	reason: string,
	comment: string
}

const initialState: reasonStateType = {
	reason: "",
	comment: ""
}

const ReasonSlice = createSlice({
	name: "reason",
	initialState,
	reducers: {
		setReason: (state, action: PayloadAction<string>) => {
			state.reason = action.payload
		},
		setComment: (state, action: PayloadAction<string>) => {
			state.comment = action.payload
		}
	}
});

export const { ...reducers } = ReasonSlice.actions

export default ReasonSlice.reducer