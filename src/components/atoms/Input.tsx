import React from 'react';
import { cn } from '@/utils/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	className?: string;
}

const Input: React.FC<InputProps> = ({
	value,
	onChange,
	placeholder,
	className,
	...rest
}) => {
	return (
		<input
			type="text"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={cn(
				'border border-gray-300 focus:border-blue-500 p-3 rounded bg-gray-100',
				className
			)}
			{...rest}
		/>
	);
};

export default Input;
