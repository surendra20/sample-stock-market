import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import Table from '../Table';
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

describe('<Table>', () => {
	test('Should render title', () => {
		const { getByText } = render(<Table columns={[]} title="Table title" data={[]} />);

		expect(getByText(/Table title/i)).toBeInTheDocument();
	});

	test('Should render 5 options', async () => {
		const { container } = render(<Table columns={columns} data={[]} title="Table title" />);
		const ths = container.querySelectorAll('th');
		expect(ths).toHaveLength(5);
	});

	test('Should render expected no. of rows', () => {
		const { container } = render(<Table columns={columns} data={data} title="Table title" />);
		const trs = container.querySelectorAll('tr');
		expect(trs).toHaveLength(3);
	});
});
