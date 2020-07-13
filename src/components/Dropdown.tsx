import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Dropdown as DropdownComponent, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Dropdown = ({
	options = [],
	onClick,
	title = 'Select',
	testId = ''
}: {
	options: Array<{ value: any; name: string }>;
	onClick: React.MouseEventHandler<HTMLInputElement>;
	title?: string;
	testId?: string;
}) => {
	const [ dropdownOpen, setDropdownOpen ] = useState(false);
	const [ dropdownTitle, setTitle ] = useState(title);

	useEffect(
		() => {
			setTitle(title);
		},
		[ title ]
	);

	const toggle = () => setDropdownOpen((prevState) => !prevState);
	return (
		<DropdownComponent isOpen={dropdownOpen} toggle={toggle} data-testid={testId}>
			<DropdownToggle caret className="w-100 text-center">
				{dropdownTitle}
			</DropdownToggle>
			<DropdownMenu>
				{options.map(({ value, name }) => (
					<DropdownItem key={uuid()} value={value} onClick={onClick} data-testid={`${testId}-${name}`}>
						{name}
					</DropdownItem>
				))}
			</DropdownMenu>
		</DropdownComponent>
	);
};

export default Dropdown;
