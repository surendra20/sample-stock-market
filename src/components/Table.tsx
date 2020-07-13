import React from 'react';
import { Table, Row, Container, Col } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import { Column } from '../features/stock/stockReducer';

export const Header = ({ columns }: { columns: Array<Column> }) => {
	const list = columns.map((column: Column) => <th key={uuid()}>{column.value}</th>);
	return <tr>{list}</tr>;
};

export const TableBody = ({
	data,
	columns
}: {
	data: Array<Record<string, string | number>>;
	columns: Array<Column>;
}) => {
	let list = data.map((item: Record<string, string | number>) => {
		const columnsList = columns.map(
			(column: Column) =>
				item[column.key] ? (
					<td key={uuid()}>{`${column.prepend || ''}${column.isPrice
						? (item[column.key] as number).toFixed(2)
						: item[column.key]}`}</td>
				) : (
					<td key={uuid()} />
				)
		);
		return <tr key={uuid()}>{columnsList}</tr>;
	});
	if (data.length === 0) {
		list = [
			<tr key={uuid()}>
				<td align="center" colSpan={columns.length}>
					No transactions found
				</td>
			</tr>
		];
	}
	return <tbody>{list}</tbody>;
};

const DataTable = ({
	columns = [],
	data = [],
	title,
	subTitle = <React.Fragment />
}: {
	columns: Array<Column>;
	data: Array<Record<string, string | number>>;
	title: string;
	subTitle?: React.ReactElement;
}) => {
	return (
		<React.Fragment>
			<Container>
				<Row>
					<Col md={3} className="pl-0">
						<b>{title}</b>
					</Col>
					<Col className="text-right">{subTitle}</Col>
				</Row>
			</Container>
			<Table striped bordered className="mt-2">
				<thead>
					<Header columns={columns} />
				</thead>
				<TableBody columns={columns} data={data} />
			</Table>
		</React.Fragment>
	);
};

export default DataTable;
