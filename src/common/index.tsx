import { StockObject, TradeObject } from '../features/stock/stockReducer';

// Returns dividend price
export const getDividend = (dividend: number, price: number, par: number = 1, isCommon: boolean = true): number => {
	return parseFloat(((isCommon ? dividend : dividend * par) / price).toFixed(2));
};

// Returns P/E Ratio
export const getPERatio = (dividend: number, price: number): number => {
	return parseFloat((price / dividend).toFixed(2));
};

export const getGeometricMean = (list: Array<number>): number => {
	let length: number = list.length;
	const total: number = list.reduce((acc, curr) => {
		return acc * curr;
	}, 1);
	return parseFloat(Math.pow(total, 1 / length).toFixed(2)) || 0;
};

export const getVolumeWeightedStockPrice = (tradeList: Array<Partial<TradeObject>>): number => {
	const tradeDetails = tradeList.reduce(
		({ quantityTotal, tradeTotal }, { quantity, price }) => {
			return { tradeTotal: tradeTotal + quantity! * price!, quantityTotal: quantityTotal + quantity! };
		},
		{ tradeTotal: 0, quantityTotal: 0 }
	);

	return tradeDetails.tradeTotal / tradeDetails.quantityTotal || 0;
};

export const mapDropdownValues = (list: Array<StockObject>): Array<{ name: string; value: any }> => {
	return list.reduce((acc: Array<{ name: string; value: any }>, { symbol }) => {
		return [ ...acc, { name: symbol.toUpperCase(), value: symbol } ];
	}, []);
};

export const mapStockDetails = (stock: StockObject): Array<{ name: string; value: any }> => {
	return [
		{
			name: 'Type',
			value: stock.type
		},
		{
			name: 'Par Value',
			value: stock.parValue
		},
		{
			name: 'Last Dividend',
			value: stock.lastDividend
		},
		{
			name: 'Fixed Dividend',
			value: stock.fixedDividend
		}
	];
};
