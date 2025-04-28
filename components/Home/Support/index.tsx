'use client';
import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import styles from './index.module.scss';
import PhoneMaskInput from '@/components/UI/PhoneMaskInput';

const Support = () => {
	const [ errors, setErrors ] = useState({});
	const [ phoneErrorMessage, setPhoneErrorMessage ] = useState<string | null>(null);
	const t = useTranslations('Main');

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	}

	return (
		<section
			className={ twMerge(styles.support, 'my-56 md:my-16 h-[724px] flex justify-between flex-col-reverse md:flex-row px-8 md:px-20 relative') }>
			<div className='py-10 flex justify-center flex-col text-white'>
				<h3 className='text-3xl font-bold uppercase'>
					{ t('contact manager') }
				</h3>
				<Form
					className='w-full max-w-xs flex flex-col gap-3'
					validationErrors={ errors }
					onSubmit={ onSubmit }
				>
					<Input
						name='comment'
						label={ t('what information interested') }
						type='text'
						variant='underlined'
						classNames={ {
							label: 'text-white',
							inputWrapper: 'after:bg-white shadow-white group-data-[focus=true]:after:bg-white'
						} }
					/>
					<PhoneMaskInput phoneErrorMessage={ phoneErrorMessage }/>
				</Form>
			</div>
		</section>
	)
};

export default Support;
