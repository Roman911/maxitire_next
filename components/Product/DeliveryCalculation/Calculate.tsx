import { FC } from 'react';
import { baseDataAPI } from '@/services/baseDataService';
import { useTranslations } from 'next-intl';
import Spinner from '@/components/UI/Spinner';

const postpaid = {
	const: 20,
	cof: 1.02
};

interface Props {
	id: string
	offer_id: number | undefined
	quantity: number
	price: number
}

const Calculate: FC<Props> = ({ id, offer_id, quantity, price }) => {
	const t = useTranslations('Delivery');
	const { data, isLoading } = baseDataAPI.useFetchDlCalculateQuery({ offer_id, ref: id, count: quantity });
	const totalPrice = price * quantity;
	const num = (e: number) => {
		return (e % 1) === 0 ? e.toFixed(0) : e.toFixed(2);
	}

	return <Spinner height='h-40' show={ isLoading }>
		<p className='mt-4'>
			{ `${ t('estimated shipping') } ${ quantity } шт.` }
		</p>
		<h3 className="text-base font-semibold leading-6 text-gray-900 mt-6">
			{ t('cost') + ':' } { data?.data.SummaryTransportCost } грн
		</h3>
		<h3 className="text-base font-semibold leading-6 text-gray-900 mt-3">
			{ t('with cash') + ': ' }
			{ num(totalPrice * postpaid.cof + postpaid.const + data?.data.SummaryTransportCost) } грн
		</h3>
	</Spinner>
};

export default Calculate;
