'use client'
import { FC, JSX, ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import { Button, ButtonGroup } from '@heroui/button';
import { useAppDispatch } from '@/hooks/redux';
import { changeSection, reset as resetFilter } from '@/store/slices/filterSlice';
import { reset as resetFilterCar } from '@/store/slices/filterCarSlice';
import { Section } from '@/models/section';
import CustomButton from '@/components/UI/Button';

interface MyButtonProps {
	children: ReactNode
	handleClick: (section: Section) => void
	section: Section
	sectionBtn: Section
	name: 'tire' | 'car' | 'disk'
}

const MyButton = ({ children, handleClick, section, sectionBtn }: MyButtonProps) => {
	return (
		<Button
			size='lg'
			onPress={ () => handleClick(sectionBtn) }
			variant='light'
			radius='none'
			className={
			twMerge(
				'max-w-max h-14 text-lg md:text-xl font-bold uppercase text-gray-300 before:absolute before:bottom-0 before:w-full before:h-1 before:bg-transparent',
				section === sectionBtn && 'bg-gradient-to-l from-orange-500 to-orange-300 bg-clip-text text-transparent before:bg-amber-500 before:bg-gradient-to-l before:from-orange-500 before:to-orange-300'
			)}
		>
			{ children }
		</Button>
	)
}

interface Props {
	children: JSX.Element
	section: Section
	onSubmit: (section: Section) => void
}

const FilterBlock: FC<Props> = ({ children, section, onSubmit }) => {
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');

	const handleClick = (value: Section) => {
		dispatch(resetFilter());
		dispatch(resetFilterCar());
		dispatch(changeSection(value));
	};

	const onClick = () => {
		setIsLoading(true);
		onSubmit(section);
	}

	return (
		<div
			className='container max-w-6xl mx-auto py-6 lg:py-10 xl:py-12 px-4 lg:px-10 md:absolute md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2 bg-[#00000066] rounded-lg'>
			<div className='flex items-center justify-center gap-8 md:gap-20 mb-8 md:mb-0'>
				<ButtonGroup className='gap-4 mb-4'>
					<MyButton section={ section } sectionBtn={ Section.Tires } handleClick={ handleClick } name='tire'>
						{ t('tires') }
					</MyButton>
					<MyButton section={ section } sectionBtn={ Section.Disks } handleClick={ handleClick } name='disk'>
						{ t('disks') }
					</MyButton>
					<MyButton section={ section } sectionBtn={ Section.Car } handleClick={ handleClick } name='car'>
						{ t('by car') }
					</MyButton>
				</ButtonGroup>
			</div>
			<div
				className='grid grid-cols-1 md:grid-cols-4 gap-6 md:mt-7'>
				{ children }
				{ section !== Section.Car && <CustomButton
					isLoading={ isLoading }
					size='lg'
					onPress={ onClick }
					className='w-full font-semibold'
				>
					{ t('choose') }
				</CustomButton> }
			</div>
		</div>
	)
};

export default FilterBlock;
