import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AliasAll } from '@/models/alias';
import { SettingsProps } from '@/models/settings';
import type { PhoneLogo } from '@/models/config';

interface Props {
	alias: AliasAll
	settings: SettingsProps
}

const TopLine: FC<Props> = ({ settings }) => {
	const t = useTranslations('Main');

	const telephones: {
		phone: string
		url: string
		logo: PhoneLogo
	}[] = [
		{ phone: settings.ua.config_telephone_kievstar, url: settings.ua.config_telephone_kievstar_url, logo: 'kievstar' },
		{ phone: settings.ua.config_telephone_vodafone, url: settings.ua.config_telephone_vodafone_url, logo: 'vodafone' },
	];

	const telephones2: {
		phone: string
		url: string
		logo: PhoneLogo
	}[] = [
		{ phone: settings.ua.config_telephone_kievstar2, url: settings.ua.config_telephone_kievstar2_url, logo: 'kievstar' },
		{ phone: settings.ua.config_telephone_vodafone2, url: settings.ua.config_telephone_vodafone2_url, logo: 'vodafone' },
	];

	const telephones3: {
		phone: string
		url: string
		logo: PhoneLogo
	}[] = [
		{ phone: settings.ua.config_telephone_besk, url: settings.ua.config_telephone_besk_url, logo: 'kievstar' },
	];

	return (
		<section className='top-line w-full bg-gray-900 hidden md:block'>
			<div className='container mx-auto max-w-6xl grid grid-cols-2 py-2.5 px-4 text-white'>
				<div className='flex items-center gap-x-6'>
					<div>{ t('light tires') }</div>
					{ telephones.map((item, index) => {
						return <a key={ index } href={ `tel:${ item.url }` } className='flex items-center gap-x-1.5'>
							<Image width={ 24 } height={ 24 } src={ `/icons/${ item.logo }-logo.svg` } alt=''/>
							<span>{ item.phone }</span>
						</a>
					}) }
				</div>
				<div className='flex items-center gap-x-6 justify-end'>
					<div>{ t('cargo tires') }</div>
					{ telephones2.map((item, index) => {
						return <a key={ index } href={ `tel:${ item.url }` } className='flex items-center gap-x-1.5'>
							<Image width={ 24 } height={ 24 } src={ `/icons/${ item.logo }-logo.svg` } alt=''/>
							<span>{ item.phone }</span>
						</a>
					}) }
				</div>
				<div className='flex items-center gap-x-6 col-span-2 text-center justify-center mt-3'>
					<div>{ t('tire repair') }</div>
					{ telephones3.map((item, index) => {
						return <a key={ index } href={ `tel:${ item.url }` } className='flex items-center gap-x-1.5'>
							<Image width={ 24 } height={ 24 } src={ `/icons/${ item.logo }-logo.svg` } alt=''/>
							<span>{ item.phone }</span>
						</a>
					}) }
				</div>
			</div>
		</section>
	)
};

export default TopLine;
