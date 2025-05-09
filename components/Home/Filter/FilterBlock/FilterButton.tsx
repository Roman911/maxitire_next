import { FC, ReactNode } from 'react';
import { Button } from '@heroui/button';
import { twMerge } from 'tailwind-merge';
import { Section } from '@/models/section';

interface FilterButtonProps {
	children: ReactNode;
	handleClick: (section: Section) => void;
	section: Section;
	sectionBtn: Section;
	name: 'tire' | 'car' | 'disk';
}

const FilterButton: FC<FilterButtonProps> = ({ children, handleClick, section, sectionBtn }) => (
	<Button
		size='lg'
		onPress={() => handleClick(sectionBtn)}
		variant='light'
		radius='none'
		className={twMerge(
			'max-w-max h-14 text-lg md:text-xl font-bold uppercase text-gray-300 before:absolute before:bottom-0 before:w-full before:h-1 before:bg-transparent',
			section === sectionBtn && 'bg-gradient-to-l from-orange-500 to-orange-300 bg-clip-text text-transparent before:bg-amber-500 before:bg-gradient-to-l before:from-orange-500 before:to-orange-300'
		)}
	>
		{children}
	</Button>
);

export default FilterButton;
