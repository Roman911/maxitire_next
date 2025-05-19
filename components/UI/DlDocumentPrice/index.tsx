'use client'
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppSelector } from '@/hooks/redux';
import Spinner from '@/components/UI/Spinner';

const postpaid = {
	const: 0,
	cof: 1.02
};

interface NpDocumentPriceProps {
	offer_id: number | undefined
	quantity: number
	price: number
}

const NpDocumentPrice: FC<NpDocumentPriceProps> = ({ offer_id, quantity, price }) => {
	const { city } = useAppSelector(state => state.orderReducer);
	const dlCity = baseDataAPI.useFetchDlSearchQuery(city.label)
	const { data, isLoading } = baseDataAPI.useFetchDlWarehousesQuery((dlCity && dlCity.data?.length) ? dlCity?.data?.[0].id : '');
	const { data: calculateData } = baseDataAPI.useFetchDlCalculateQuery({ offer_id, ref: data ? data[0].CityId : 0, count: quantity });
	const t = useTranslations('Delivery');
	const totalPrice = price * quantity;
	const num = (e: number) => {
		return (e % 1) === 0 ? e.toFixed(0) : e.toFixed(2);
	}

	return <Spinner height='h-40' show={ isLoading }>
		<p className='mt-4'>
			{ `${ t('estimated shipping') } ${ quantity } шт.` }
		</p>
		<h3 className="text-base font-semibold leading-6 text-gray-900 mt-6">
			{ t('cost') + ':' } { data?.[0].Cost } грн
		</h3>
		<h3 className="text-base font-semibold leading-6 text-gray-900 mt-3">
			{ t('with cash') + ': ' }
			{ num(totalPrice * postpaid.cof + postpaid.const + data?.[0].Cost) } грн
		</h3>
	</Spinner>
};

export default NpDocumentPrice;
