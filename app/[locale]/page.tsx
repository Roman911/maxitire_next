import type { Metadata } from 'next';
import { Language, LanguageCode } from '@/models/language';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Filter from '@/components/Home/Filter';
import Title from '@/components/UI/Title';
import NoResult from '@/components/UI/NoResult';
import ProductList from '@/components/ProductList';
import Support from '@/components/Home/Support';
import { getProducts, getSettings } from '@/app/api/api';

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/baseData/settings`)
		.then((res) => res.json());

	return {
		title: response[lang].meta_title,
		description: response[lang].meta_description,
	}
}

export default async function Home({ params }: { params: Promise<{ locale: Language }> }) {
	const locale = (await params).locale;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const response = await getSettings();
	const products = await getProducts('?typeproduct=1', 0, 8);

	return (
		<>
			<Filter />
			<LayoutWrapper>
				<div className='max-w-6xl mx-auto'>
					<Title title={ response[lang].h2_top } className='mt-12 mb-5 text-2xl md:text-4xl font-bold px-3 md:px-0' />
					{ products.result ? <ProductList
						classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
						data={ products.data }
					/> : <NoResult noResultText='no result'/> }
				</div>
			</LayoutWrapper>
			<Support />
		</>
	);
};
