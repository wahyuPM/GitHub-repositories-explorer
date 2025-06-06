import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@/components/atoms/Button';

describe('Button Component', () => {
	test('testButtonRendersWithDefaults', () => {
		const { getByRole } = render(<Button>Click Me</Button>);
		const button = getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent('Click Me');
		expect(button).not.toBeDisabled();
	});

	test('testButtonOnClickHandler', () => {
		const handleClick = jest.fn();
		const { getByRole } = render(
			<Button onClick={handleClick}>Click Me</Button>
		);
		const button = getByRole('button');
		fireEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test('testButtonLoadingSpinnerVisible', () => {
		const { getByRole } = render(<Button loading>Click Me</Button>);
		const spinner = getByRole('status');
		expect(spinner).toBeInTheDocument();
	});

	test('testButtonDisabledState', () => {
		const { getByRole } = render(<Button disabled>Click Me</Button>);
		const button = getByRole('button');
		expect(button).toBeDisabled();
	});

	test('testButtonCustomClassNames', () => {
		const { getByRole } = render(
			<Button className="custom-class">Click Me</Button>
		);
		const button = getByRole('button');
		expect(button).toHaveClass('custom-class');
	});

	test('testButtonOnClickWhenDisabled', () => {
		const handleClick = jest.fn();
		const { getByRole } = render(
			<Button onClick={handleClick} disabled>
				Click Me
			</Button>
		);
		const button = getByRole('button');
		fireEvent.click(button);
		expect(handleClick).not.toHaveBeenCalled();
	});
});
