'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import CarTireFilter from './CarTireFilter';
import CarDiskFilter from './CarDiskFilter';
import * as Icons from '@/components/UI/Icons';
import { Button } from '@heroui/button';
import { links } from '../links';
import { Section } from '@/models/section';
import { twMerge } from 'tailwind-merge';

const Navbar = () => {
	const [reset, setReset] = useState(false);
	const t = useTranslations('Main');

	const handleClick = () => {
		setReset(true);
		setTimeout(() => {
			setReset(false);
		}, 100)
	}

	const ButtonMeu = ({ sectionItem, label }: { sectionItem: string, label: string }) => (
		<div className='group'>
			<Button
				variant='light'
				size='lg'
				radius='none'
				className='font-semibold h-14 uppercase'
				endContent={ <Icons.ChevronDownIcon
					width='14'
					height='14'
					strokeWidth='2'
					className='stroke-gray-900 transition group-hover:rotate-180'
				/> }>
				{ label }
			</Button>
			<div
				className={twMerge('absolute container left-1/2 top-14 z-30 w-full -translate-x-1/2 px-4 hidden group group-hover:flex', reset && 'hidden')}>
				<div
					className='w-full flex-auto overflow-hidden bg-white shadow-lg ring-1 ring-gray-900/5 py-8 px-12 grid grid-cols-4'>
					{ sectionItem === Section.Tires ? <CarTireFilter onClick={ handleClick } /> : <CarDiskFilter onClick={ handleClick } /> }
				</div>
			</div>
		</div>
	)

	return (
		<div className='bg-white hidden lg:block relative'>
			<nav className='container mx-auto max-w-6xl flex justify-between items-center'>
				{[{ section: 'tires', label: t('tires') }, { section: 'disks', label: t('disks') }]
					.map((item, i) => {
						return <ButtonMeu key={ i } sectionItem={ item.section } label={ item.label } />
					})}
				{ links.map((item, index) => {
					return <Link key={ index } href={ item.url } className='font-semibold hover:bg-gray-200 h-14 px-6 flex items-center uppercase'>
						{ t(item.title) }
					</Link>
				}) }
			</nav>
		</div>
	)
};

export default Navbar;
