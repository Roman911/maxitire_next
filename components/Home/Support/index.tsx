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
import { formatPhoneNumber } from '@/lib/formatPhoneNumber';
import { addToast } from '@heroui/toast';

const Support = () => {
	const [ phoneErrorMessage, setPhoneErrorMessage ] = useState<string | null>(null);
	const [ loadingBtn, setLoadingBtn ] = useState(false);
	const [ createAddAsk ] = baseDataAPI.useCreateAddAskMutation();
	const t = useTranslations('Main');

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		setPhoneErrorMessage(null);
		const formData = new FormData(event.currentTarget);
		const phone = formData.get('phone') as string;
		const phoneTransform = formatPhoneNumber(phone);
		const comment = formData.get('comment') as string;

		setLoadingBtn(true);
		if(phoneTransform.length < 13) {
			setPhoneErrorMessage('enter your phone number');
		} else {
			await createAddAsk({
				ask: comment,
				email: phoneTransform,
				product_id: 1,
			}).then((response: { data?: { result: boolean }; error?: FetchBaseQueryError | SerializedError }) => {
				if(response?.data?.result) {
					addToast({
						title: t('ask send'),
					});
					form.reset(); // Reset form fields
				} else if(response.error) {
					console.error('An error occurred:', response.error);
				}
			}).finally(() => {
				setLoadingBtn(false);
			});
		}
	}

	return (
		<section className={ twMerge(styles.support, 'my-16 h-[524px] md:h-[724px]') }>
			<div className='container max-w-6xl mx-auto h-full'>
				<div className='flex justify-between flex-col-reverse md:flex-row relative h-full'>
					<div className='py-10 flex justify-center flex-col text-white bg-gray-900/80 h-full md:bg-transparent p-8 md:p-0'>
						<h3 className='text-lg md:text-3xl font-bold uppercase'>
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
									input: twMerge('input group-data-[has-value=true]:text-white text-lg', styles.input),
									label: 'text-white text-base',
									inputWrapper: 'after:bg-white shadow-white group-data-[focus=true]:after:bg-white',
								} }
							/>
							<PhoneMaskInput phoneErrorMessage={ phoneErrorMessage } isDark={ true } inputClass={ styles.input } />
							<Button isLoading={ loadingBtn } type='submit' size='lg' className='mt-8 w-full'>
								{ t('send') }
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</section>
	)
};

export default Support;
