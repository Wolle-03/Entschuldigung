import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import QRCode from 'qrcode';
import { API_BASE_URL } from '../../..';

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
			QRCode.toString(API_BASE_URL + "validate?signature=" + encodeURIComponent(action.payload), (_error, string) => state.signature = string)
			console.log(API_BASE_URL + "validate?signature=" + encodeURIComponent(action.payload));
		},
	}
});

export const { ...reducers } = TimeSlice.actions

export default TimeSlice.reducer