'use client'
import { FC, JSX, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ButtonGroup } from '@heroui/button';
import { useAppDispatch } from '@/hooks/redux';
import { changeSection, reset as resetFilter } from '@/store/slices/filterSlice';
import { reset as resetFilterCar } from '@/store/slices/filterCarSlice';
import { Section } from '@/models/section';
import CustomButton from '@/components/UI/Button';
import FilterButton from './FilterButton';

interface Props {
	children: JSX.Element;
	section: Section;
	onSubmit: (section: Section) => void;
}

const FilterBlock: FC<Props> = ({ children, section, onSubmit }) => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');

	const handleClick = (value: Section) => {
		dispatch(resetFilter());
		dispatch(resetFilterCar());
		dispatch(changeSection(value));
	};

	const handleSubmit = () => {
		setIsLoading(true);
		onSubmit(section);
	};

	const filterButtons = [
		{ section: Section.Tires, name: 'tire', label: t('tires by size') },
		{ section: Section.Disks, name: 'disk', label: t('disks by size') },
		{ section: Section.Car, name: 'car', label: t('selection by car') },
	] as const;

	return (
		<div className='container max-w-6xl mx-auto py-6 lg:py-10 xl:py-12 px-4 lg:px-10 md:absolute md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2 bg-[#00000066] rounded-lg'>
			<div className='flex items-center justify-center gap-8 md:gap-20 mb-8 md:mb-0'>
				<ButtonGroup className='md:gap-4 md:mb-4 flex-col md:flex-row'>
					{filterButtons.map(({ section: sectionBtn, name, label }) => (
						<FilterButton
							key={name}
							section={section}
							sectionBtn={sectionBtn}
							handleClick={handleClick}
							name={name}
						>
							{label}
						</FilterButton>
					))}
				</ButtonGroup>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-6 md:mt-7'>
				{children}
				{section !== Section.Car && (
					<CustomButton
						isLoading={isLoading}
						size='lg'
						onPress={handleSubmit}
						className='w-full font-semibold'
					>
						{t('choose')}
					</CustomButton>
				)}
			</div>
		</div>
	);
};

export default FilterBlock;
