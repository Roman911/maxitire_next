'use client';
import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import MySelect from '@/components/UI/Select';
import type { BaseDataProps } from '@/models/baseData';
import { baseDataAPI } from '@/services/baseDataService';
import { Section } from '@/models/filter';

interface CarFilters {
	brand: string | number;
	model: string | number;
	year: string | number;
	modification: string | number;
}

interface Props {
	data: BaseDataProps | undefined
	section: Section
	slug: string[]
}

const ByCar: FC<Props> = ({ data, slug}  ) => {
	const t = useTranslations('Filters');
	const [ filter, setFilter ] = useState<CarFilters>({brand: 0, model: 0, modification: 0, year: 0});
	const { data: model, refetch: modelRefetch } = baseDataAPI.useFetchAutoModelQuery(filter.brand?.toString() ?? '');
	const { data: modelYear } = baseDataAPI.useFetchAutoYearQuery(filter.model?.toString() ?? '');
	const { data: modelKit, refetch: modelKitRefetch } = baseDataAPI.useFetchAutoModelKitQuery(
		`${filter.model}/${filter.year}`
	);

	useEffect(() => {
		if(slug) {
			const numbers = slug[0].split('-').filter(part => /^\d+$/.test(part)).map(Number);
			setFilter({ brand: numbers[1], model: numbers[2], modification: numbers[3], year: numbers[0] });
		}
	}, [slug]);

	const onChangeByCar = (name: string, value: number | string | null) => {
		setFilter({ ...filter, [name]: value });
		if(name === 'model') {
			modelRefetch();
		} else if(name === 'modification' || name === 'year') {
			modelKitRefetch();
		}
	};

	return (
		<>
			<div className='mt-2'>
				{ <MySelect
					name='brand'
					label={ t('car brand') }
					options={ data?.auto?.map(item => ({ value: item.value, label: item.label })) }
					onChange={ onChangeByCar }
					defaultValue={ filter.brand ? filter.brand.toString() : '' }
				/> }
			</div>
			<div className='mt-2'>
				<MySelect
					name='model'
					label={ t('model') }
					options={ model?.map(item => ({ value: item.value, label: item.label })) }
					isDisabled={ model?.length === 0 }
					onChange={ onChangeByCar }
					defaultValue={ filter.model ? filter.model.toString() : '' }
				/>
			</div>
			<div className='mt-2'>
				<MySelect
					name='year'
					label={ t('graduation year') }
					options={ modelYear?.map(item => ({ value: item, label: `${item}` })) }
					isDisabled={ modelYear?.length === 0 }
					onChange={ onChangeByCar }
					defaultValue={ filter.year ? filter.year.toString() : '' }
				/>
			</div>
			<div className='mt-2'>
				<MySelect
					name='modification'
					label={ t('modification') }
					options={ modelKit?.map(item => ({ value: item.value, label: item.label })) }
					isDisabled={ modelKit?.length === 0 }
					onChange={ onChangeByCar }
					defaultValue={ filter.modification ? filter.modification.toString() : '' }
				/>
			</div>
		</>
	)
};

export default ByCar;
