'use client';
import { FormEvent, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import styles from './index.module.scss';
import { baseDataAPI } from '@/services/baseDataService';
import PhoneMaskInput from '@/components/UI/PhoneMaskInput';
import Button from '@/components/UI/Button';

const Support = () => {
	const [ phoneErrorMessage, setPhoneErrorMessage ] = useState<string | null>(null);
	const [ loadingBtn, setLoadingBtn ] = useState(false);
	const [ createCallback ] = baseDataAPI.useCreateAddAskMutation();
	const t = useTranslations('Main');

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const phone = formData.get('phone') as string;
		const comment = formData.get('comment') as string;

		setLoadingBtn(true);
		await createCallback({
			phone,
			product_id: '1',
			quantity: '1',
			comment,
		}).then((response: {
			data?: { result: boolean };
			error?: FetchBaseQueryError | SerializedError
		}) => {
			const data = response?.data;
			console.log(data);
			// if(data) {
			// 	event.currentTarget.reset(); // Reset form fields
			// 	if(data?.linkpay?.length > 0) window.open(data?.linkpay, "_blank")
			// 	if(data?.result) {
			// 		dispatch(reset());
			// 		resetStorage('reducerCart');
			// 		router.push(`/${ params.locale }/order/successful`);
			// 	}
			// } else if(response.error) {
			// 	console.error('An error occurred:', response.error);
			// }
		}).finally(() => {
			setLoadingBtn(false);
		});
	}

	return (
		<section
			className={ twMerge(styles.support, 'my-56 md:my-16 h-[724px] flex justify-between flex-col-reverse md:flex-row px-8 md:px-20 relative') }>
			<div className='py-10 flex justify-center flex-col text-white'>
				<h3 className='text-3xl font-bold uppercase'>
					{ t('contact manager') }
				</h3>
				<Form
					className='mt-8 w-full flex flex-col gap-6'
					onSubmit={ onSubmit }
				>
					<Input
						name='comment'
						label={ t('what information interested') }
						type='text'
						variant='underlined'
						classNames={ {
							input: 'group-data-[has-value=true]:text-white text-lg',
							label: 'text-white text-base',
							inputWrapper: 'after:bg-white shadow-white group-data-[focus=true]:after:bg-white',
						} }
					/>
					<PhoneMaskInput phoneErrorMessage={ phoneErrorMessage }/>
					<Button isLoading={ loadingBtn } type='submit' size='lg' className='mt-8 w-full'>
						{ t('send') }
					</Button>
				</Form>
			</div>
		</section>
	)
};

export default Support;
