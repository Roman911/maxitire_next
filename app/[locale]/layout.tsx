import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import '../colors.css';
import '../globals.css';
import { Language } from '@/models/language';
// import { ToastProvider } from "@heroui/toast";

const notoSans = localFont({
	src: [
		{
			path: '../../public/fonts/NotoSans-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/NotoSans-SemiBold.ttf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/NotoSans-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
	],
})

async function getSettings() {
	const res = await fetch(`${ process.env.SERVER_URL }/baseData/settings`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

async function getAlias() {
	const res = await fetch(`${ process.env.SERVER_URL }/baseData/StatiAlias`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export default async function RootLayout(
	{
		children,
		params,
	}: Readonly<{
		children: React.ReactNode;
		params: Promise<{ locale: Language }>;
	}>) {
	const { locale } = await params;
	const messages = await getMessages();
	const response = await getSettings();
	const alias = await getAlias();

	return (
		<html lang={ locale } suppressHydrationWarning>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
		</head>
		<body className={ notoSans.className }>
		<StoreProvider>
			<NextIntlClientProvider messages={ messages }>
				<Header settings={ response } alias={ alias }/>
				<main>
					{ children }
				</main>
				<Footer settings={ response } alias={ alias }/>
			</NextIntlClientProvider>
			{/*<ToastProvider placement='top-right'/>*/}
		</StoreProvider>
		</body>
		</html>
	);
};
