import { configureStore } from '@reduxjs/toolkit';
import stockReducer from '../features/stock/stockReducer';

export const store = configureStore({
	reducer: {
		stock: stockReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
