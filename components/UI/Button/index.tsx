import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button, ButtonProps } from '@heroui/button';

const MyButton: FC<ButtonProps> = ({ children, className = '', ...arg }) => {
	return (
		<Button
			{ ...arg }
			radius='sm'
			className={ twMerge('bg-gradient-to-t from-orange-500 to-orange-300 text-white', className) }
		>{ children }</Button>
	)
};

export default MyButton;
