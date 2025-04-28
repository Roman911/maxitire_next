'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useAppSelector } from '@/hooks/redux';
import FilterBlock from './FilterBlock';
import TiresFilter from './TiresFilter';
import { baseDataAPI } from '@/services/baseDataService';
import { getFilters } from './getFilters';
import { Section } from '@/models/section';
import { generateUrl } from '@/lib/seo';
import FilterByCar from './FilterByCar';
import styles from './index.module.scss';
import { twMerge } from 'tailwind-merge';

const Filter = () => {
	const router = useRouter();
	const { section } = useAppSelector(state => state.filterReducer);
	const locale = useLocale();
	const [ filter, setFilter ] = useState({});
	const [ filterBattery, setFilterBattery ] = useState({});
	const { data } = baseDataAPI.useFetchBaseDataQuery('');

	const onChange = (name: string, value: number | string | null, section: Section) => {
		if(value) {
			if(section === Section.Battery) {
				setFilterBattery(prev => ({ ...prev, [name]: value }));
			} else {
				setFilter(prev => ({ ...prev, [name]: value }));
			}
		}
	}

	const submit = (section: Section) => {
		const searchUrl = generateUrl(section === Section.Battery ? filterBattery : filter);
		const rout = `/catalog/${ section }/`;
		const newRout = `/${ locale }${ rout }`;

		router.push(newRout + searchUrl);
	}

	return (
		<section className={ twMerge(styles['home-filter'], 'bg-tires lg:flex md:h-[820px] relative') }>
			<FilterBlock onSubmit={ submit } section={ section }>
				{ section === Section.Car ?
					<FilterByCar section={ section } /> :
					<TiresFilter filters={ getFilters({ locale, section, data }) } onChange={ onChange } section={ section } color='secondary' />}
			</FilterBlock>
		</section>
	)
};

export default Filter;