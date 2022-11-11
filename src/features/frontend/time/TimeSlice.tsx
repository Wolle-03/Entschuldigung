import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type timeStateType = {
	days: string,
	at: string,
	date: string,
	classes: [number, number],
	from: string,
	till: string
}

const initialState: timeStateType = {
	days: "",
	at: "",
	date: "",
	classes: [1, 11],
	from: "",
	till: ""
}

const TimeSlice = createSlice({
	name: "time",
	initialState,
	reducers: {
		setDays: (state, action: PayloadAction<string>) => {
			state.days = action.payload
		},
		setAt: (state, action: PayloadAction<string>) => {
			state.at = action.payload
		},
		setDate: (state, action: PayloadAction<string>) => {
			state.date = action.payload
		},
		setClasses: (state, action: PayloadAction<[number, number]>) => {
			state.classes = action.payload
		},
		setFrom: (state, action: PayloadAction<string>) => {
			state.from = action.payload
		},
		setTill: (state, action: PayloadAction<string>) => {
			state.till = action.payload
		}
	}
});

export const { ...reducers } = TimeSlice.actions

export default TimeSlice.reducer