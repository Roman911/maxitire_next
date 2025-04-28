import type { Metadata } from 'next';
import { Language, LanguageCode } from '@/models/language';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Filter from '@/components/Home/Filter';
import Title from '@/components/UI/Title';
import NoResult from '@/components/UI/NoResult';
import ProductList from '@/components/ProductList';
import TextSeo from '@/components/UI/TextSeo';
import TopBrands from '@/components/Home/TopBrands';
import PopularSizes from '@/components/Home/PopularSizes';
import Reviews from '@/components/Home/Reviews';
import PopularCarBrands from '@/components/Home/PopularCarBrands';

async function getSettings() {
	const res = await fetch(`${ process.env.SERVER_URL }/baseData/settings`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

async function getProducts() {
	const res = await fetch(`${ process.env.SERVER_URL }/api/getProducts?typeproduct=1`, {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'content-type': 'application/json',
		},
		body: JSON.stringify({ start: 0, length: 8 }),
	});
	return await res.json();
}

async function getFeatureParams() {
	const res = await fetch(`${ process.env.SERVER_URL }/api/getFeatureParams`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const response = await fetch(`${ process.env.SERVER_URL }/baseData/settings`)
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
	const products = await getProducts();
	const featureParams = await getFeatureParams();

	return (
		<>
			<Filter />
			<LayoutWrapper>
				<div className='max-w-7xl mx-auto'>
					<Title title={ response[lang].h2_top } className='mt-12 mb-5 text-2xl md:text-4xl font-bold px-3 md:px-0' />
					{ products.result ? <ProductList
						classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
						data={ products.data }
					/> : <NoResult noResultText='no result'/> }
					<Title title='popular brands' translations={ true } className='mt-24 mb-5 text-2xl md:text-4xl font-bold px-3 md:px-0' />
					<TopBrands />
				</div>
				{ featureParams.ProductTiporazmer && <PopularSizes locale={ locale } settings={ response } popularSizes={ featureParams.ProductTiporazmer } /> }
				{ featureParams.Car2Brand && <PopularCarBrands locale={ locale } settings={ response } popularCarBrands={ featureParams.Car2Brand } /> }
				<TextSeo description={ response[lang].description }/>
			</LayoutWrapper>
		</>
	);
};
