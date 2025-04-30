'use client'
import { Dispatch, FC, SetStateAction } from 'react';
import { LinkProps } from 'next/link';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Link } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { resetFilter, setParams } from '@/store/slices/filterSlice';
import { BusIcon, CargoIcon, CarIcon, MotorcyclesIcon, SpecialEquipmentIcon, SuvIcon } from '../Icons';
import { typeCatLinks } from './links';

interface TypeCarLinksProps {
	section: 'header' | 'catalog'
	setOpen?: Dispatch<SetStateAction<boolean>>
}

const Icons = {
	light: CarIcon,
	bus: BusIcon,
	cargo: CargoIcon,
	motorcycle: MotorcyclesIcon,
	special: SpecialEquipmentIcon,
	suv: SuvIcon,
};

interface ILinkComponent extends LinkProps {
	label: string
	section: 'header' | 'catalog'
	icon: keyof typeof Icons
}

const LinkComponent: FC<ILinkComponent> = (
	{
		section,
		href,
		icon,
		label,
	}) => {
	const IconComponent = Icons[icon];
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(resetFilter());
		dispatch(setParams({ 'vehicle_type': null }));
	}

	return <Link
		href={ href }
		onClick={ handleClick }
		className={ twMerge('flex items-center group/item',
			section === 'catalog' && 'flex-col', section === 'header' && 'mt-3 gap-2.5'
		) }
	>
		<IconComponent className={
			twMerge(
				'transition group-hover/item:text-gray-900 dark:group-hover/item:text-white text-gray-400',
			)
		}/>
		<span className={
			twMerge(
				'transition',
				section === 'catalog' && 'text-sm font-bold',
				section === 'header' && 'group-hover/item:underline',
			)
		}>
			{ label }
		</span>
	</Link>
}

const TypeCarLinks: FC<TypeCarLinksProps> = ({ setOpen, section }) => {
	const t = useTranslations('CarType');

	const handleClick = () => {
		if(setOpen) setOpen(false);
	}

	return <>
		{ typeCatLinks.map(item => {
			return <LinkComponent
				key={ item.label }
				section={ section }
				href={ item.href }
				icon={ item.icon as keyof typeof Icons }
				label={ t(item.label) }
				onClick={ handleClick }
			/>
		}) }
	</>
};

export default TypeCarLinks;