import { configureStore } from '@reduxjs/toolkit';
import AppSlice from './AppSlice';
import HomeSlice from './home/HomeSlice';

export const store = configureStore({
	reducer: {
		app: AppSlice,
		home: HomeSlice
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
