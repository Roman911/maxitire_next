'use client';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { useLocale } from 'next-intl';
import { SettingsProps } from '@/models/settings';
import { Language, LanguageCode } from '@/models/language';

interface Props {
	isTopLine: boolean
	settings: SettingsProps
}

const Contacts: FC<Props> = ({ isTopLine, settings }) => {
	const locale = useLocale();
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;

	return (
		<div className={ twMerge('flex items-center gap-2', isTopLine && 'md:hidden') }>
			<div className='whitespace-pre-wrap'>
				{ settings[lang].config_address }
			</div>
		</div>
	)
};

export default Contacts;
