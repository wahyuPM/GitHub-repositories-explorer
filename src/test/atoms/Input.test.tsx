import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '@/components/atoms/Input';

describe('Input Component', () => {
	test('testInputRendersWithDefaults', () => {
		const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
		const input = getByPlaceholderText('Enter text');
		expect(input).toBeInTheDocument();
		expect(input).toHaveValue('');
	});

	test('testInputDisplaysValue', () => {
		const { getByDisplayValue } = render(<Input defaultValue="Test Value" />);
		const input = getByDisplayValue('Test Value');
		expect(input).toBeInTheDocument();
	});

	test('testInputOnChangeEvent', () => {
		const handleChange = jest.fn();
		const { getByPlaceholderText } = render(
			<Input placeholder="Enter text" onChange={handleChange} />
		);
		const input = getByPlaceholderText('Enter text');
		fireEvent.change(input, { target: { value: 'New Value' } });
		expect(handleChange).toHaveBeenCalledTimes(1);
	});

	test('testInputHandlesNullValue', () => {
		const { getByPlaceholderText } = render(
			<Input placeholder="Enter text" defaultValue={''} />
		);
		const input = getByPlaceholderText('Enter text');
		expect(input).toHaveValue('');
	});

	test('testInputHandlesUndefinedOnChange', () => {
		const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
		const input = getByPlaceholderText('Enter text');
		fireEvent.change(input, { target: { value: 'New Value' } });
		expect(input).toHaveValue('New Value');
	});

	test('testInputAppliesAdditionalClassNames', () => {
		const { getByPlaceholderText } = render(
			<Input placeholder="Enter text" className="custom-class" />
		);
		const input = getByPlaceholderText('Enter text');
		expect(input).toHaveClass('custom-class');
	});
});
