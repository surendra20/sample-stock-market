import React from 'react';
import { Col, Badge } from 'reactstrap';
import { v4 as uuid } from 'uuid';

interface StockDetailsProps {
	list: Array<{ name: string; value: any }>;
}
const StockDetails: React.FC<StockDetailsProps> = ({ list = [] }): React.ReactElement => {
	return (
		<React.Fragment>
			{list.map((item: { name: string; value: any }) => (
				<Col key={uuid()} className="pt-2">
					<Badge color="info">{item.name}</Badge>
					<Badge color="light">{item.value || '-'}</Badge>
				</Col>
			))}
		</React.Fragment>
	);
};

export default StockDetails;
