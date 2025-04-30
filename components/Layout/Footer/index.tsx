'use client'
import { FC, JSX } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import DOMPurify from 'isomorphic-dompurify';
import { Link, usePathname } from '@/i18n/routing';
import { linksCatalog } from './linksCatalog';
import * as Icons from '@/components/UI/Icons';
import { AliasAll, AliasItem } from '@/models/alias';
import { Language, LanguageCode } from '@/models/language';
import { SettingsProps } from '@/models/settings';
import Phones from '@/components/UI/Phones';
import Logo from '@/components/UI/Logo';
import styles from './index.module.scss';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';

type IconType = 'telegram' | 'facebook' | 'viber';

const social = {
	links: [
		{ link: 'https://t.me', logo: 'telegram' },
		{ link: 'https://www.facebook.com', logo: 'facebook' },
		{ link: 'https://www.viber.com', logo: 'viber' },
	],
}

interface Props {
	alias: AliasAll
	settings: SettingsProps
}

const Footer: FC<Props> = ({ alias, settings }) => {
	const t = useTranslations('Footer');
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const locale = useLocale();
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;

	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString, {
			ADD_TAGS: [ 'iframe' ],
			ADD_ATTR: [ 'allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading', 'referrerpolicy' ]
		});
		return (
			<div
				className='mb-5'
				dangerouslySetInnerHTML={ { __html: sanitizedHtml } }
			/>
		);
	};

	const icons: Record<IconType, JSX.Element> = {
		telegram: <Icons.TelegramIcon/>,
		facebook: <Icons.FacebookIcon/>,
		viber: <Icons.ViberIcon/>,
	};

	const handleClick = (href: string) => {
		if(pathname !== href) dispatch(setProgress(true));
	}

	const link = (link: string, title: string, index: number) => {
		return <Link
			key={ index }
			className='block font-medium mt-5 transition hover:text-primary hover:underline'
			href={ link }
			onClick={ () => handleClick(link) }
		>
			{ title }
		</Link>
	}

	return <footer className={ styles['bg-tires'] }>
		<div className='bg-black/75'>
			<div className='container mx-auto py-12 px-4 flex flex-col md:flex-row text-white'>
				<div className='md:w-1/4'>
					<Logo isFooter={ true }/>
					<div className='flex mt-8 gap-x-5'>
						{ social.links.map((item, index) => {
							return <a
								key={ index }
								target='_blank'
								href={ item.link }
								className='w-9 h-9 rounded-full cursor-pointer bg-white flex items-center justify-center transition text-gray-800 hover:bg-gray-200'
							>
								{ icons[item.logo as IconType] }
							</a>
						}) }
					</div>
					<p className='mt-7 mb-7 leading-6 text-sm text-gray-600'>
						© { settings && settings[lang].config_name } { new Date().getFullYear() }. { t('all rights reserved') }.
					</p>
				</div>
				<div className='md:w-1/4 mt-6 md:mt-0 md:pl-12 font-medium'>
					<h6 className='text-lg font-bold mb-6 text-gray-600'>
						{ t('contacts') }
					</h6>
					<Phones settings={ settings } isInfo={ false } className='flex-col items-start gap-4 font-medium mb-5'/>
					<p className='block whitespace-pre-wrap mb-5'>
						{ settings[lang].config_address }
					</p>
				</div>
				<div className='md:w-1/4 mt-6 md:mt-0 md:pl-12'>
					<h6 className='text-lg font-bold mb-6 text-gray-600'>
						{ t('goods') }
					</h6>
					{ linksCatalog.map((item, index) => {
						return link(item.link, t(item.title), index)
					}) }
				</div>
				<div className='md:w-1/4 mt-6 md:mt-0 md:pl-12'>
					<h6 className='text-lg font-bold mb-6 text-gray-600'>
						{ t('information') }
					</h6>
					{ alias.footer.map((item: AliasItem, index: number) => {
						return link(`/page/${ item.slug }`, item.descriptions[lang].title, index)
					}) }
					<HtmlContent htmlString={ settings[lang].config_open || '' }/>
				</div>
			</div>
		</div>
	</footer>
};

export default Footer;
