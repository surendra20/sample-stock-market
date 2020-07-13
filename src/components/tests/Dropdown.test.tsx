import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dropdown from '../Dropdown';

describe('<Dropdown>', () => {
	test('Should render title', () => {
		const spy = jest.fn();
		const { getByText } = render(<Dropdown onClick={spy} options={[]} title="Select Item" />);

		expect(getByText(/Select Item/i)).toBeInTheDocument();
	});

	test('Should render 2 options', async () => {
		const spy = jest.fn();
		const { container } = render(
			<Dropdown
				onClick={spy}
				options={[ { value: 'item1', name: 'Item 1' }, { value: 'item2', name: 'Item 2' } ]}
				title="Select Item"
			/>
		);
		const buttons = container.querySelectorAll('button');
		expect(buttons).toHaveLength(3);
	});

	test('Should handle click', async () => {
		const spy = jest.fn();
		const { getByText } = render(
			<Dropdown
				onClick={spy}
				options={[ { value: 'item1', name: 'Item 1' }, { value: 'item2', name: 'Item 2' } ]}
				title="Select Item"
			/>
		);
		fireEvent.click(getByText(/Select Item/));
		fireEvent.click(getByText(/Item 1/));
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
