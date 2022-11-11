import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export type homeStateType = {
	entries: {
		id: number,
		name: string,
		class: string,
		attest_pflicht: boolean,
		time: string,
		reason: string,
		comment: string,
		bearbeitet: boolean
	}[] | null
}

const initialState: homeStateType = {
	entries: null
}


const HomeSlice = createSlice({
	name: "home",
	initialState,
	reducers: {
		deleteEntry: (state, action: PayloadAction<{ id: number, token: string, signature: string }>) => {
			if (state.entries !== null) {
				state.entries.splice(state.entries.indexOf(state.entries.find(entry => entry.id == action.payload.id)!), 1)
				console.log(action.payload)
				axios.post("https://test.mcs-rbg.de/processEntry.php", {
					...action.payload
				})
			}
		},
		setEntries: (state, action: PayloadAction<{ id: number, name: string, class: string, attest_pflicht: string, time: string, reason: string, comment: string, bearbeitet: boolean }[]>) => {
			state.entries = action.payload.map(entry => {
				return {
					...entry,
					attest_pflicht: entry.attest_pflicht == "1",
				}
			})
		},
	}
});

export const { ...reducers } = HomeSlice.actions

export default HomeSlice.reducer