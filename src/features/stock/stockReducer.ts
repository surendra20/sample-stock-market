import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import moment from 'moment';
import { getGeometricMean as mean } from '../../common';

export type TradeObject = {
	stock: string;
	type: string;
	quantity: number;
	price: number;
	totalPrice: number;
	time: string;
};
export interface StockObject {
	symbol: string;
	type: string;
	lastDividend: number;
	fixedDividend: number | null;
	parValue: number;
}
interface StockState {
	stockDetails: Array<StockObject>;
	selectedStock: StockObject | null;
	tradeList: Array<TradeObject>;
	tradeListColumns: Array<Column>;
}
export interface Column {
	key: string;
	value: string;
	prepend?: string | number;
	isPrice?: boolean;
}

const initialState: StockState = {
	stockDetails: [
		{
			symbol: 'TEA',
			type: 'common',
			lastDividend: 0,
			fixedDividend: null,
			parValue: 100
		},
		{
			symbol: 'POP',
			type: 'common',
			lastDividend: 8,
			fixedDividend: null,
			parValue: 100
		},
		{
			symbol: 'ALE',
			type: 'common',
			lastDividend: 23,
			fixedDividend: null,
			parValue: 60
		},
		{
			symbol: 'GIN',
			type: 'preferred',
			lastDividend: 8,
			fixedDividend: 2,
			parValue: 100
		},
		{
			symbol: 'JOE',
			type: 'common',
			lastDividend: 13,
			fixedDividend: null,
			parValue: 250
		}
	],
	selectedStock: null,
	tradeList: [],
	tradeListColumns: [
		{ key: 'stock', value: 'Stock' },
		{ key: 'type', value: 'Trade Type' },
		{ key: 'quantity', value: 'Quantity' },
		{ key: 'price', value: 'Price', prepend: '$', isPrice: true },
		{ key: 'totalPrice', value: 'Total Price', prepend: '$', isPrice: true },
		{ key: 'time', value: 'Time' }
	]
};

export const stockReduce = createSlice({
	name: 'stock',
	initialState,
	reducers: {
		selectStock: (state, action: PayloadAction<string>) => {
			const selectedStock: StockObject | undefined = state.stockDetails.find(
				({ symbol }) => symbol === action.payload
			);
			state.selectedStock = selectedStock || null;
		},
		clearStockSelection: (state) => {
			state.selectedStock = null;
		},
		updateTradeList: (state, action: PayloadAction<{ type: string; quantity: number; price: number }>) => {
			const tradeList = [
				...state.tradeList,
				{
					...action.payload,
					totalPrice: action.payload.quantity * action.payload.price,
					time: moment().format('MM-DD-YY, hh:mm:ss a'),
					stock: state.selectedStock ? state.selectedStock.symbol : ''
				}
			];
			state.tradeList = tradeList;
		}
	}
});

export const { selectStock, clearStockSelection, updateTradeList } = stockReduce.actions;

export const getStock = (state: RootState) => state.stock.stockDetails;
export const getSelectedStock = (state: RootState) => state.stock.selectedStock;
export const getTradeListColumns = (state: RootState) => state.stock.tradeListColumns;
export const getTradeList = (state: RootState) => {
	const list = state.stock.tradeList.filter((trade) => {
		const duration = moment.duration(moment(new Date()).diff(trade.time));
		const mins = duration.minutes();
		return state.stock.selectedStock ? mins < 15 && state.stock.selectedStock.symbol === trade.stock : mins < 15;
	});
	return list;
};

export const getAllPrices = (state: RootState): number => {
	const prices = state.stock.tradeList.reduce((acc: Array<number>, { price }) => {
		return [ ...acc, price ];
	}, []);
	return mean(prices);
};

export default stockReduce.reducer;
