import { configureStore } from '@reduxjs/toolkit';
import AppSlice from './AppSlice';
import LoginSlice from './login/LoginSlice';
import ReasonSlice from './reason/ReasonSlice';
import SuccessSlice from './success/SuccessSlice';
import TimeSlice from './time/TimeSlice';

export const store = configureStore({
	reducer: {
		app: AppSlice,
		login: LoginSlice,
		time: TimeSlice,
		reason: ReasonSlice,
		success: SuccessSlice
	}
});

let currentError: string | undefined
store.subscribe(() => {
	let previousValue = currentError
	currentError = store.getState().app.error;

	if (previousValue !== undefined) {
		store.dispatch({
			type: 'app/setError',
			payload: undefined
		})
	}
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
