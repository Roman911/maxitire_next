'use client'
import { useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { useTranslations } from 'next-intl';
import { Input } from '@heroui/input';

const PhoneMaskInput = ({ phoneErrorMessage }: { phoneErrorMessage: null | string }) => {
	const t = useTranslations('PhoneMask');
	const [ phone, setPhone ] = useState<string | null>(null);

	const handleChangeAmount = (values: { value: string }) => {
		setPhone(values.value);
	};

	return (
		<PatternFormat
			label={ t('phone number') }
			isRequired
			isInvalid={!!phoneErrorMessage && phone?.length !== 10}
			errorMessage={ phoneErrorMessage && t(phoneErrorMessage) }
			format="+38 (###)###-##-##" allowEmptyFormatting mask='_'
			value={ phone }
			onValueChange={ handleChangeAmount }
			customInput={ Input }
			aria-label="input-monto"
			name='phone'
			variant='underlined'
			classNames={{
				label: 'text-white',
				inputWrapper: 'after:bg-white shadow-white group-data-[focus=true]:after:bg-white'
			}}
		/>
	)
};

export default PhoneMaskInput;
