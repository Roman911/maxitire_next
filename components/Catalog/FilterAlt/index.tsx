'use client'
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@heroui/modal';
import { Drawer, DrawerContent } from '@heroui/drawer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SwitchTabsByParams from './SwitchTabsByParams';
import { Section } from '@/models/filter';
import type { BaseDataProps } from '@/models/baseData';
import { SubmitFloat } from '@/components/Catalog/FilterAlt/SubmitFloat';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';
import FilterBtn from '@/components/Catalog/FilterByCar/FilterBtn';
import SectionTires from '@/components/Catalog/FilterAlt/SectionTires';
import SectionDisks from '@/components/Catalog/FilterAlt/SectionDisks';
import FilterActive from '@/components/Catalog/FilterActive';
import { Language } from '@/models/language';
import { setParams } from '@/store/slices/filterSlice';

interface Props {
	filterData: BaseDataProps | undefined
	section: Section
	locale: Language
	slug?: string[]
}

const FilterAlt: FC<Props> = ({ filterData, section, locale, slug }) => {
	const t = useTranslations('Filters');
	const [ element, setElement ] = useState<HTMLElement | null>(null);
	const dispatch = useAppDispatch();
	const { subsection } = useAppSelector(state => state.filterReducer);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onChange = (name: string, value: number | string | undefined | null, element: HTMLElement) => {
		if(name === 'brand') {
			dispatch(setParams({ model_id: null }));
		}
		setElement(element);
		dispatch(setParams({ [name]: value }));
	}

	return (
		<div>
			<FilterBtn openFilter={ onOpen } title={ t('filters') }/>
			<div className='hidden lg:block bg-white max-w-72'>
				<div
					className='relative pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto lg:overflow-y-visible'>
					<SubmitFloat element={ element } btnTitle={ t('to apply') } setElement={ setElement } offset={ Section.Battery ? 354 : 360 }/>
					<FilterActive locale={ locale } className='hidden lg:flex' slug={ slug } />
					{ section === Section.Tires && <SectionTires onChange={ onChange } filterData={ filterData } /> }
					{ section === Section.Disks && <SectionDisks onChange={ onChange } filterData={ filterData } /> }
					<SelectFromTo name='price' nameMin='minPrice' nameMax='maxPrice' from={ 200 } to={ 10000 }
												title={ `${ t('price range') } (грн)` } btnTitle={ t('to apply') }/>
				</div>
			</div>
			<Drawer isOpen={ isOpen } placement='left' onOpenChange={ onOpenChange } classNames={{ closeButton: 'z-10' }}>
				<DrawerContent>
					{ () => (
						<>
							<div
								className='relative pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 overflow-y-auto lg:overflow-y-visible'>
								<SwitchTabsByParams subsection={ subsection }/>
								{ section === Section.Tires && <SectionTires onChange={ onChange } filterData={ filterData } /> }
								{ section === Section.Disks && <SectionDisks onChange={ onChange } filterData={ filterData } /> }
								<SelectFromTo name='price' nameMin='minPrice' nameMax='maxPrice' from={ 200 } to={ 10000 }
															title={ `${ t('price range') } (грн)` } btnTitle={ t('to apply') }/>
							</div>
						</>
					) }
				</DrawerContent>
			</Drawer>
		</div>
	)
};

export default FilterAlt;
