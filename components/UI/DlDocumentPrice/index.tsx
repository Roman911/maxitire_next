'use client'
import { FC } from 'react';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppSelector } from '@/hooks/redux';
import DlWarehouses from '@/components/Product/DeliveryCalculation/DlWarehouses';

interface Props {
	offer_id: number | undefined
	quantity: number
	price: number
}

const NpDocumentPrice: FC<Props> = ({ offer_id, quantity, price }) => {
	const { city } = useAppSelector(state => state.orderReducer);
	const { data } = baseDataAPI.useFetchDlSearchQuery(city.label);

	if(!data) return null;

	return <DlWarehouses id={ data?.[0].id as string } offer_id={ offer_id } quantity={ quantity } price={ price } />
};

export default NpDocumentPrice;
