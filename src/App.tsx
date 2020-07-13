import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { Stock } from './features/stock';

function App() {
	return (
		<Container>
			<Row className="mt-1">
				<Col>
					<Header />
				</Col>
			</Row>
			<Row>
				<Col>
					<Stock />
				</Col>
			</Row>
			<Row>
				<Col>
					<Footer />
				</Col>
			</Row>
		</Container>
	);
}
export default App;
