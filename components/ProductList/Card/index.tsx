'use client';
import { useRouter, usePathname } from 'next/navigation';
import { FC, useMemo } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Button from '@/components/UI/Button';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { addCart } from '@/store/slices/cartSlice';
import type { Product } from '@/models/products';
import { Language } from '@/models/language';
import { addToStorage, getFromStorage } from '@/lib/localeStorage';
import { Section } from '@/models/filter';
import IconsBlock from '@/components/ProductList/Card/IconsBlock';
import ActionsBlock from '@/components/ProductList/Card/ActionsBlock';
import CountryInfo from '@/components/UI/CountryInfo';

const regex = /\/(auto-goods|services)/;
const cargo = [ '3', '4', '5', '6', '9', '10', '11' ];

interface Props {
	item: Product
}

const ProductCard: FC<Props> = ({ item }) => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');
	const { default_photo, full_name, min_price, season, vehicle_type, page_url, best_offer, group } = item;
	const cartStorage = useMemo(() => getFromStorage('reducerCart'), []);
	const section = item.vehicle_type ? Section.Tires : item.diameter ? Section.Disks : Section.Battery;
	const sectionNew = section === Section.Tires ? cargo.includes(item.vehicle_type) ? 'cargo' : 'tires' : section;
	const hasMatch = regex.test(pathname);
	const url = hasMatch ? `#` : `/${page_url}`;

	const handleClick = () => {
		if(!cartStorage?.find((item: { id: number, quantity: number }) => item.id === best_offer.id)) {
			const cart = [ ...cartStorage, {
				id: best_offer.id,
				section: sectionNew,
				quantity: 1
			} ];
			dispatch(addCart({ id: best_offer.id, quantity: 1, section }));
			addToStorage('reducerCart', cart);
		}
		router.push(`/${ locale }/cart`)
	};

	return (
		<Card radius='sm' className='relative group p-0'>
			<CardBody className='p-0'>
				<div className='relative min-h-72 dark:bg-white p-5 sm:min-h-52 text-center'>
					<IconsBlock season={ season } vehicle_type={ vehicle_type }/>
					{ !hasMatch && <ActionsBlock sectionNew={ sectionNew } group={ group } /> }
					<Image
						className='mx-auto'
						src={ default_photo || (locale === Language.UK ? '/images/no-photo.jpg' : '/images/no-photo-ru.jpg') }
						alt={ full_name }
						width={ 220 }
						height={ 220 }
					/>
				</div>
				<div className='px-5 flex flex-col text-center'>
					<Link href={ url }
								className='font-medium my-2.5 min-h-12 after:absolute after:inset-0'>{ full_name }</Link>
					{ section !== Section.Battery && <div className='mb-3.5'>
						<CountryInfo
							country={ locale === Language.UK ? best_offer.country : best_offer.country_ru }
							year={ best_offer.year }
						/>
					</div> }
					<div className='text-2xl font-bold'>{ min_price } грн</div>
				</div>
			</CardBody>
			<CardFooter className='px-5 pb-5'>
				<Button className='w-full' onPress={ handleClick } size='lg'>
					{ t('buy') }
				</Button>
			</CardFooter>
		</Card>
	)
};

export default ProductCard;