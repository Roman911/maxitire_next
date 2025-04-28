import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AliasAll } from '@/models/alias';
import { config } from '@/config';
import { SettingsProps } from '@/models/settings';

interface Props {
	alias: AliasAll
	settings: SettingsProps
}

const TopLine: FC<Props> = () => {
	const t = useTranslations('Main');

	return (
		<section className='top-line w-full bg-gray-900'>
			<div className='container mx-auto max-w-6xl grid grid-cols-2 py-2.5 px-4 text-white'>
				<div className='flex items-center gap-x-6'>
					<div>{t('light tires')}</div>
					{config.contacts.passengerTires.map((item, index) => {
						return <a key={ index } href={`tel:${item.phoneUrl}`} className='flex items-center gap-x-1.5'>
							<Image width={ 24 } height={ 24 } src={`/icons/${item.logo}-logo.svg`} alt=''/>
							<span>{item.phone}</span>
						</a>
					})}
				</div>
				<div className='flex items-center gap-x-6 justify-end'>
					<div>{t('cargo tires')}</div>
					{config.contacts.truckTires.map((item, index) => {
						return <a key={ index } href={`tel:${item.phoneUrl}`} className='flex items-center gap-x-1.5'>
							<Image width={ 24 } height={ 24 } src={`/icons/${item.logo}-logo.svg`} alt=''/>
							<span>{item.phone}</span>
						</a>
					})}
				</div>
				<div className='flex items-center gap-x-6 col-span-2 text-center justify-center mt-3'>
					<div>{t('tire repair')}</div>
					{config.contacts.truckTires.map((item, index) => {
						return <a key={ index } href={`tel:${item.phoneUrl}`} className='flex items-center gap-x-1.5'>
							<Image width={ 24 } height={ 24 } src={`/icons/${item.logo}-logo.svg`} alt=''/>
							<span>{item.phone}</span>
						</a>
					})}
				</div>
			</div>
		</section>
	)
};

export default TopLine;
