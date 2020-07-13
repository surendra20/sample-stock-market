import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { selectStock } from '../stock/stockReducer';
import TradeForm from '../stock/TradeForm';

describe('<TradeForm>', () => {
	test('Should render Buy Sell buttons', () => {
		const { getAllByText, getByTestId } = render(
			<Provider store={store}>
				<TradeForm />
			</Provider>
		);
		const buyButtons = getAllByText(/Buy/i);
		expect(buyButtons).toHaveLength(2);
		const sellButton = getAllByText(/Sell/i);
		expect(sellButton).toHaveLength(1);
		fireEvent.click(getByTestId('sell-button'));

		const sellButtons = getAllByText(/Sell/i);
		expect(sellButtons).toHaveLength(2);
	});

	test('Should show error message', () => {
		const { getByTestId, getByText } = render(
			<Provider store={store}>
				<TradeForm />
			</Provider>
		);
		fireEvent.change(getByTestId('price-input'), { target: { value: 2 } });
		fireEvent.change(getByTestId('quantity-input'), { target: { value: 2 } });
		fireEvent.click(getByTestId('submit-button'));
		expect(getByText(/Select a stock to proceed/)).toBeInTheDocument();
	});

	test('Should update trade list', () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<TradeForm />
			</Provider>
		);
		store.dispatch(selectStock('TEA'));
		expect(store.getState().stock.selectedStock).toEqual({
			symbol: 'TEA',
			type: 'common',
			lastDividend: 0,
			fixedDividend: null,
			parValue: 100
		});
		fireEvent.change(getByTestId('price-input'), { target: { value: 2 } });
		fireEvent.change(getByTestId('quantity-input'), { target: { value: 2 } });
		fireEvent.click(getByTestId('submit-button'));
		expect(store.getState().stock.tradeList.length).toEqual(1);
	});
});
