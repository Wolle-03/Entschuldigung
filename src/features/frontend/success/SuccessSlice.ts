import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import QRCode from 'qrcode';

export type timeStateType = {
	signature: string
}

const initialState: timeStateType = {
	signature: "",
}

const TimeSlice = createSlice({
	name: "success",
	initialState,
	reducers: {
		setSignature: (state, action: PayloadAction<string>) => {
			QRCode.toString("https://entschuldigung.mcs-rbg.de/validate/" + encodeURIComponent(action.payload), (_error, string) => state.signature = string)
			console.log("https://entschuldigung.mcs-rbg.de/validate/" + encodeURIComponent(action.payload));
		},
	}
});

export const { ...reducers } = TimeSlice.actions

export default TimeSlice.reducer