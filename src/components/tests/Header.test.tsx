import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import Header from '../Header';

describe('<Header>', () => {
	test('Should render app header', () => {
		const { getByText } = render(<Header />);

		expect(getByText(/Super Simple Stock Market/i)).toBeInTheDocument();
	});
});
