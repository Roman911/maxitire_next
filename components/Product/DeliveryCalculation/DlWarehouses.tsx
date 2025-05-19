import { FC } from 'react';
import { baseDataAPI } from '@/services/baseDataService';
import Calculate from './Calculate';

interface Props {
	id: string
	offer_id: number | undefined
	quantity: number
	price: number
}

const DlWarehouses: FC<Props> = ({ id, offer_id, quantity, price }) => {
	const { data } = baseDataAPI.useFetchDlWarehousesQuery(id);

	if(!data) return null;

	return <Calculate id={ data[0].CityId } offer_id={ offer_id } quantity={ quantity } price={ price } />
};

export default DlWarehouses;
