import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { selectStock } from '../stock/stockReducer';
import { Stock } from '../stock';

describe('<Stock index>', () => {
	test('Should render dropdown and select an option', async () => {
		const { getAllByText, getByTestId } = render(
			<Provider store={store}>
				<Stock />
			</Provider>
		);
		const dropdownSelect = getAllByText(/Select Stock/i);
		expect(dropdownSelect).toHaveLength(1);
		fireEvent.click(dropdownSelect[0]);
		fireEvent.click(getByTestId('dropdown-select-GIN'));
		expect(store.getState().stock.selectedStock).toEqual({
			symbol: 'GIN',
			type: 'preferred',
			lastDividend: 8,
			fixedDividend: 2,
			parValue: 100
		});
	});

	test('Should clear stock selection', () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<Stock />
			</Provider>
		);
		store.dispatch(selectStock('TEA'));
		fireEvent.click(getByTestId('clear-stock-selection'));
		expect(store.getState().stock.selectedStock).toEqual(null);
	});
});
