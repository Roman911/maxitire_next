import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Input } from '@heroui/input';
import Button from '@/components/UI/Button';
import * as Icons from '@/components/UI/Icons';

interface SearchInputProps {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const placeHolderExamples = [
	'235/45 R18 RunFlat',
	'Bridgestone 205 55 16',
	'зима 185 65 14',
	'Nexen r15 91H',
	'R22 RunFlat',
	'Nokian R17',
	'Michelin 225 R17',
	'Premiorri Solazo',
	'245 R18 FR',
];

export const SearchInput = ({ value, onChange, onSubmit }: SearchInputProps) => {
	const [placeholder, setPlaceholder] = useState('');
	const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
	const currentLetter = useRef(0);

	useEffect(() => {
		const typePlaceholder = () => {
			const currentPlaceholder = placeHolderExamples[currentPlaceholderIndex];

			if (currentLetter.current <= currentPlaceholder.length) {
				setPlaceholder(currentPlaceholder.slice(0, currentLetter.current));
				currentLetter.current += 1;
			} else {
				setTimeout(() => {
					placeholderRenderNext();
				}, 1000);
				return;
			}

			const timer = setTimeout(typePlaceholder, 50);
			return () => clearTimeout(timer);
		};

		typePlaceholder();
	}, [currentPlaceholderIndex]);

	const placeholderRenderNext = () => {
		currentLetter.current = 0;
		const nextIndex = (currentPlaceholderIndex + 1) % placeHolderExamples.length;
		setCurrentPlaceholderIndex(nextIndex);
	};

	return (
		<form className='w-full' onSubmit={onSubmit}>
			<Input
				placeholder={ placeholder }
				onChange={onChange}
				classNames={{
					base: 'max-w-full sm:max-w-full h-11',
					mainWrapper: 'h-full',
					input: 'text-[15px]',
					inputWrapper: 'h-full font-normal text-default-500 w-full pl-4 pr-0 border-gray-200 dark:border-gray-500 focus:border-gray-200',
				}}
				value={value}
				size="sm"
				radius='sm'
				variant='bordered'
				endContent={
					<Button
						type='submit'
						isIconOnly
						aria-label='Search'
						className='w-16 h-11 -mr-1'
					>
						<Icons.SearchIcon />
					</Button>
				}
				type='search'
			/>
		</form>
	);
};
