// import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import { Accordion } from '@/components/organisms';

describe('Accordion Component', () => {
	const mockUser = { login: 'testuser' };
	const mockRepos = [
		{
			id: 1,
			name: 'Repo 1',
			description: 'Description 1',
			stargazers_count: 10,
		},
		{
			id: 2,
			name: 'Repo 2',
			description: 'Description 2',
			stargazers_count: 20,
		},
	];
	const mockOnToggle = jest.fn();

	test('testComponentRendersSuccessfully', () => {
		const { getByText } = render(
			<Accordion
				user={mockUser}
				repos={mockRepos}
				onToggle={mockOnToggle}
				isOpen={false}
				loading={false}
			/>
		);
		expect(getByText('testuser')).toBeInTheDocument();
	});

	test('testComponentStateUpdatesOnInteraction', () => {
		const { getByText } = render(
			<Accordion
				user={mockUser}
				repos={mockRepos}
				onToggle={mockOnToggle}
				isOpen={false}
				loading={false}
			/>
		);
		fireEvent.click(getByText('testuser'));
		expect(mockOnToggle).toHaveBeenCalledWith('testuser');
	});

	test('testComponentDisplaysDataFromProps', () => {
		const { getByText } = render(
			<Accordion
				user={mockUser}
				repos={mockRepos}
				onToggle={mockOnToggle}
				isOpen={true}
				loading={false}
			/>
		);
		expect(getByText('Repo 1')).toBeInTheDocument();
		expect(getByText('Description 1')).toBeInTheDocument();
	});

	test('testComponentHandlesMissingProps', () => {
		const { getByText } = render(
			<Accordion
				user={mockUser}
				repos={[]}
				onToggle={mockOnToggle}
				isOpen={true}
				loading={false}
			/>
		);
		expect(getByText('No repositories to display.')).toBeInTheDocument();
	});

	test('testComponentHandlesUnexpectedInput', () => {
		const { getByText } = render(
			<Accordion
				user={mockUser}
				repos={[{ id: 1, name: '', description: '', stargazers_count: null }]}
				onToggle={mockOnToggle}
				isOpen={true}
				loading={false}
			/>
		);
		expect(getByText('No description available.')).toBeInTheDocument();
	});

	test('testComponentPerformanceUnderHighLoad', () => {
		const largeRepos = Array.from({ length: 1000 }, (_, i) => ({
			id: i,
			name: `Repo ${i}`,
			description: `Description ${i}`,
			stargazers_count: i,
		}));
		const { getByText } = render(
			<Accordion
				user={mockUser}
				repos={largeRepos}
				onToggle={mockOnToggle}
				isOpen={true}
				loading={false}
			/>
		);
		expect(getByText('Repo 999')).toBeInTheDocument();
	});
});
