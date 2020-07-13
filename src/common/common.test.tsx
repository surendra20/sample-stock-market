import { getDividend, getPERatio, getGeometricMean, getVolumeWeightedStockPrice, mapDropdownValues } from './index';

test('Should return expected result from getDividend', () => {
	expect(getDividend(1, 1, 10, false)).toEqual(10);
});
test('Should return expected result from getDividend with common type', () => {
	expect(getDividend(1, 1, 10, true)).toEqual(1);
});
test('Should return expected result from getPERatio', () => {
	expect(getPERatio(8, 2)).toEqual(0.25);
});
test('Should return expected result from getGeometricMean', () => {
	expect(getGeometricMean([ 8, 2 ])).toEqual(4);
});
test('Should return expected result from getVolumeWeightedStockPrice', () => {
	const data = [
		{
			price: 2,
			quantity: 3,
			stock: 'pop',
			time: '07-02-20, 10:32:16 pm',
			type: 'Buy'
		},
		{
			price: 6,
			quantity: 12,
			stock: 'pop',
			time: '07-02-20, 10:35:21 pm',
			type: 'Buy'
		}
	];
	expect(getVolumeWeightedStockPrice(data)).toEqual(5.2);
});

test('Should return mapped object', () => {
	const list = [
		{ symbol: 'tea', type: 'common', lastDividend: 0, fixedDividend: null, parValue: 100 },
		{ symbol: 'pop', type: 'common', lastDividend: 8, fixedDividend: null, parValue: 100 },
		{ symbol: 'ale', type: 'common', lastDividend: 23, fixedDividend: null, parValue: 60 },
		{ symbol: 'gin', type: 'preferred', lastDividend: 8, fixedDividend: 2, parValue: 100 },
		{ symbol: 'joe', type: 'common', lastDividend: 13, fixedDividend: null, parValue: 250 }
	];
	const returnList = [
		{ name: 'TEA', value: 'tea' },
		{ name: 'POP', value: 'pop' },
		{ name: 'ALE', value: 'ale' },
		{ name: 'GIN', value: 'gin' },
		{ name: 'JOE', value: 'joe' }
	];
	expect(mapDropdownValues(list)).toEqual(returnList);
});
