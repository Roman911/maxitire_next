'use client';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { baseDataAPI } from '@/services/baseDataService';
import SelectionByCar from '@/components/Catalog/SelectionByCar';
import { Section } from '@/models/filter';

interface Props {
	section: Section
	brand: number | undefined
	model: number | undefined
	year: number | undefined
	car: string | undefined
	modification: number | undefined
}

const Content: FC<Props> = ({ brand, model, year, car, section, modification }) => {
	const [src, setSrc] = useState('');
	const { data } = baseDataAPI.useFetchAutoModelQuery(brand?.toString() ?? '');

	useEffect(() => {
		if(car) {
			const carModal = data ? data.find(item => item.value === model)?.label : '';
			setSrc(`https://opt.tyreclub.com.ua/api/public/img/car2/${car.split(' ').join('-').toLowerCase()}_${carModal}_${year}-300.jpg`)
		}
	}, [car, data, model, year]);

	return (
		<>
			<div className='flex-1'>
				<SelectionByCar section={ section } modification={ modification } />
			</div>
			<Image
				src={ src.length === 0 ? '/images/car-blank.webp' : src }
				width={410}
				height={232}
				alt=''
				onError={ () => setSrc('/images/car-blank.webp')}
			/>
		</>
	)
};

export default Content;
