import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import {
	getStock,
	getSelectedStock,
	getTradeList,
	selectStock,
	getTradeListColumns,
	clearStockSelection,
	getAllPrices
} from './stockReducer';
import { mapDropdownValues, getVolumeWeightedStockPrice, mapStockDetails } from '../../common';
import Dropdown from '../../components/Dropdown';
import DataTable from '../../components/Table';
import StockDetails from '../../components/StockDetails';
import TradeForm from './TradeForm';

export const Stock = () => {
	const stockDetails = useSelector(getStock);
	const selectedStock = useSelector(getSelectedStock);
	const tradeListColumns = useSelector(getTradeListColumns);
	const tradeList = useSelector(getTradeList);
	const priceList = useSelector(getAllPrices);

	const selectedTradeList = selectedStock
		? tradeList.filter((trade) => selectedStock.symbol === trade.stock)
		: tradeList;
	const allSharePrice = (
		<span>
			All Share Index Price <b>${priceList.toFixed(2)}</b>
		</span>
	);
	const subTitle = selectedStock ? (
		<React.Fragment>
			<span>
				Volume Weighted Stock Price : <b>${getVolumeWeightedStockPrice(tradeList).toFixed(2)} | </b>
			</span>
			{allSharePrice}
		</React.Fragment>
	) : (
		allSharePrice
	);

	const dispatch = useDispatch();

	const [ title, updateTitle ] = useState('Select Stock');

	const handleStockSelection = (e: any, clear = false) => {
		if (clear) {
			dispatch(clearStockSelection());
			updateTitle('Select Stock');
		} else {
			dispatch(selectStock(e.target.value));
			updateTitle(e.target.innerText);
		}
	};

	return (
		<Container>
			<Row className="mt-3">
				<Col xs="2">
					<Row>
						<Col xs="10">
							<Dropdown
								testId="dropdown-select"
								onClick={handleStockSelection}
								options={mapDropdownValues(stockDetails)}
								title={title}
							/>
						</Col>
						{selectedStock && (
							<Col xs="2">
								<Button
									data-testid="clear-stock-selection"
									title="Clear stock selection"
									className="float-left h-100"
									close
									onClick={(e) => handleStockSelection(e, true)}
								/>
							</Col>
						)}
					</Row>
				</Col>
				<StockDetails list={selectedStock ? mapStockDetails(selectedStock) : []} />
			</Row>
			<Row className="mt-3">
				<Container>
					<Row>
						<Col>
							<TradeForm />
						</Col>
					</Row>
				</Container>
			</Row>
			<Row className="mt-3 m-0">
				<DataTable columns={tradeListColumns} data={selectedTradeList} title="Trade List" subTitle={subTitle} />
			</Row>
		</Container>
	);
};
