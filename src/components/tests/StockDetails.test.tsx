import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import StockDetails from '../StockDetails';
const columns = [
	{ key: 'stock', value: 'Stock' },
	{ key: 'type', value: 'Trade Type' },
	{ key: 'quantity', value: 'Quantity' },
	{ key: 'price', value: 'Price' },
	{ key: 'time', value: 'Time' }
];
const data = [
	{ stock: 'tea', type: 'buy', quantity: 20, price: 20, time: '10-06-2020 12:00 pm' },
	{ stock: 'tea', type: 'sell', quantity: 10, price: 10, time: '10-06-2020 12:01 pm' }
];

describe('<StockDetails>', () => {
	test('Should render title', () => {
		const { getByText } = render(
			<StockDetails list={[ { name: 'Type', value: 'Type 1' }, { name: 'Par value', value: 20 } ]} />
		);

		expect(getByText(/Type 1/i)).toBeInTheDocument();
	});

	test('Should render Fixed Dividend', () => {
		const { getByText } = render(
			<StockDetails
				list={[
					{ name: 'Type', value: 'Type 1' },
					{ name: 'Par value', value: 20 },
					{ name: 'Fixed Dividend', value: 2 }
				]}
			/>
		);

		expect(getByText(/Fixed Dividend/i)).toBeInTheDocument();
	});
});
