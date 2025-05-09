'use client';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { baseDataAPI } from '@/services/baseDataService';
import FilterByCar from '@/components/SelectionByCar/Content/FilterByCar';

interface Props {
	brand: number | undefined
	model: number | undefined
	year: number | undefined
	car: string | undefined
}

const Content: FC<Props> = ({ brand, model, year, car }) => {
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
			<FilterByCar />
			<Image
				src={ src }
				width={410}
				height={232}
				alt=''
				onError={ () => setSrc('/images/car-blank.webp')}
			/>
		</>
	)
};

export default Content;
