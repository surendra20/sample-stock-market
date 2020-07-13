import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, ButtonGroup, InputGroup, InputGroupAddon, Input, Form } from 'reactstrap';
import { getSelectedStock, updateTradeList } from './stockReducer';
import { getDividend, getPERatio } from '../../common';

const TradeForm = () => {
	const selectedStock = useSelector(getSelectedStock);

	const dispatch = useDispatch();

	const [ tradeType, updateTradetype ] = useState<string>('Buy');
	const [ quantity, updateQuantity ] = useState<number>(0);
	const [ price, updatePrice ] = useState<number>(0);
	const [ peRatio, updateRatio ] = useState<number>(0);
	const [ dividend, updateDividend ] = useState<number>(0);
	const [ totalPrice, updatetotalPrice ] = useState<number>(0);

	const [ visible, setVisible ] = useState<boolean>(false);
	const closeError = () => setVisible(false);

	useEffect(
		() => {
			if (price && quantity) {
				if (selectedStock) {
					const dividendValue = getDividend(
						selectedStock.lastDividend,
						price,
						selectedStock.parValue,
						selectedStock.type === 'common'
					);
					const quantityValue = getPERatio(selectedStock.lastDividend, price);
					updateDividend(dividendValue);
					updateRatio(quantityValue);
					setVisible(false);
				}
				updatetotalPrice(price * quantity);
			}
		},
		[ price, quantity, selectedStock ]
	);

	const handleSubmission = (e: any) => {
		e.preventDefault();
		if (selectedStock) {
			dispatch(updateTradeList({ type: tradeType, quantity: quantity || 1, price: price || 1 }));
			updateQuantity(0);
			updatePrice(0);
			updateDividend(0);
			updateRatio(0);
			updatetotalPrice(0);
		} else {
			setVisible(true);
		}
	};
	const getTradeType = (type: string) => {
		return tradeType === type ? 'success' : 'secondary';
	};

	const handleTradeTypeSelection = (e: any) => {
		updateTradetype(e.target.value);
	};
	return (
		<Form onSubmit={handleSubmission}>
			<Container>
				{visible && (
					<Row className="mb-1">
						<Col className="card-header align-middle text-danger text-center" xs="11">
							Select a stock to proceed.
						</Col>
						<Col className="card-header" xs="1">
							<Button data-testid="close-error" close type="button" onClick={closeError} />
						</Col>
					</Row>
				)}

				<Row className="mt-3">
					<Col md={4} />
					<Col md={4}>
						<ButtonGroup className="w-100" onClick={handleTradeTypeSelection}>
							<Button data-testid="buy-button" type="button" color={getTradeType('Buy')} value="Buy">
								Buy
							</Button>
							<Button data-testid="sell-button" type="button" color={getTradeType('Sell')} value="Sell">
								Sell
							</Button>
						</ButtonGroup>
					</Col>
					<Col md={4} />
				</Row>
				<Row className="mt-4">
					<Col md={4} className="pl-0">
						<InputGroup>
							<InputGroupAddon addonType="prepend">Price $</InputGroupAddon>
							<Input
								data-testid="price-input"
								placeholder="Price"
								min={1}
								max={100}
								type="number"
								step="1"
								onChange={(e: any) => {
									updatePrice(+e.target.value);
								}}
								value={price}
								required
							/>
							<InputGroupAddon addonType="append">.00</InputGroupAddon>
						</InputGroup>
					</Col>
					<Col md={4}>
						<InputGroup>
							<InputGroupAddon addonType="prepend">Quantity #</InputGroupAddon>
							<Input
								data-testid="quantity-input"
								placeholder="Quantity"
								min={1}
								max={100}
								type="number"
								step="1"
								onChange={(e: any) => updateQuantity(+e.target.value)}
								value={quantity}
								required
							/>
						</InputGroup>
					</Col>
					<Col md={2}>
						<Button data-testid="submit-button" color="success">
							{tradeType.toUpperCase()}
						</Button>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col className="pl-0" md={4}>
						<InputGroup>
							<InputGroupAddon addonType="prepend">Dividend Yield</InputGroupAddon>
							<Input type="text" value={dividend} disabled />
						</InputGroup>
					</Col>
					<Col md={4}>
						<InputGroup>
							<InputGroupAddon addonType="prepend">P/E Ratio</InputGroupAddon>
							<Input type="text" value={peRatio} disabled />
						</InputGroup>
					</Col>
					<Col>
						<InputGroup>
							<InputGroupAddon addonType="prepend">Total price $</InputGroupAddon>
							<Input type="text" value={totalPrice.toFixed(2)} disabled />
						</InputGroup>
					</Col>
				</Row>
			</Container>
		</Form>
	);
};
export default TradeForm;
