'use client';
import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { config } from '@/config';
import { SettingsProps } from '@/models/settings';
import { Language, LanguageCode } from '@/models/language';
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@heroui/react';
import { Button } from '@heroui/button';
import * as Icons from '@/components/UI/Icons';
import Image from 'next/image';

interface Props {
	settings: SettingsProps
}

const Contacts: FC<Props> = ({ settings }) => {
	const locale = useLocale();
	const t = useTranslations('Main');
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;

	return (
		<>
			<div className='items-center gap-2 mr-8 hidden md:flex'>
				<div className='whitespace-pre-wrap'>
					{ settings[lang].config_address }
				</div>
			</div>
			<Dropdown>
				<DropdownTrigger className='lg:hidden'>
					<Button variant='light' className='p-0 min-w-12 gap-1'>
						<div className='pt-2 pb-1 pl-2 pr-1 bg-primary rounded-full'>
							<Icons.PhoneIcon className='h-6 w-6 fill-white'/>
						</div>
						<Icons.ChevronDownIcon className='h-2 w-2 stroke-black'/>
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label="Dynamic Actions">
					<DropdownSection showDivider title={ t('light tires') }>
						{ config.contacts.passengerTires.map((item, index) => {
							return <DropdownItem
								key={ index }
								startContent={ item.logo ?
									<Image width={ 24 } height={ 24 } src={ `/icons/${ item.logo }-logo.svg` } alt=''/> :
									<Icons.PhoneIcon className='fill-primary'/> }
							>
								<a href={ `tel:${ item.phoneUrl }` } className='ml-2.5 font-medium'>
									{ item.phone }
								</a>
							</DropdownItem>
						}) }
					</DropdownSection>
					<DropdownSection showDivider title={ t('cargo tires') }>
						{ config.contacts.truckTires.map((item, index) => {
							return <DropdownItem
								key={ index }
								startContent={ item.logo ?
									<Image width={ 24 } height={ 24 } src={ `/icons/${ item.logo }-logo.svg` } alt=''/> :
									<Icons.PhoneIcon className='fill-primary'/> }
							>
								<a href={ `tel:${ item.phoneUrl }` } className='ml-2.5 font-medium'>
									{ item.phone }
								</a>
							</DropdownItem>
						}) }
					</DropdownSection>
					<DropdownSection title={ t('tire repair') }>
						{ config.contacts.truckTires.map((item, index) => {
							return <DropdownItem
								key={ index }
								startContent={ item.logo ?
									<Image width={ 24 } height={ 24 } src={ `/icons/${ item.logo }-logo.svg` } alt=''/> :
									<Icons.PhoneIcon className='fill-primary'/> }
							>
								<a href={ `tel:${ item.phoneUrl }` } className='ml-2.5 font-medium'>
									{ item.phone }
								</a>
							</DropdownItem>
						}) }
					</DropdownSection>
				</DropdownMenu>
			</Dropdown>
		</>
	)
};

export default Contacts;
