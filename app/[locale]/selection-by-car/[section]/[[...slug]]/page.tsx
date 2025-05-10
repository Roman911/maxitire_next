import { Section } from '@/models/filter';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import ByCar from '@/components/Catalog/FilterAlt/ByCar';
import SwitchTabs from '@/components/SelectionByCar/SwitchTabs';
import Content from '@/components/SelectionByCar/Content';
import { DEFAULT_HEADERS } from '@/config/api';

async function getBaseData() {
	const res = await fetch(`${ process.env.SERVER_URL }/baseData`, {
		method: 'GET',
		headers: DEFAULT_HEADERS
	});
	return await res.json();
}

export default async function SelectionByCar({ params }: { params: Promise<{ section: Section, slug: string[] }> }) {
	const { section, slug } = await params;
	const baseData = await getBaseData();
	const numbers = slug && slug[0].split('-').filter(part => /^\d+$/.test(part)).map(Number);

	const path = [
		{
			title: '123',
			translations: false,
			href: `/`,
		},
	];

	return (
		<LayoutWrapper>
			<Breadcrumbs path={ path } />
			<Title isMain={ true } title={ '123' } translations={ false } className='mt-3 text-lg font-medium px-0 lg:px-3 mb-3 lg:mb-1' />
			<div className='py-5 lg:flex lg:gap-10'>
				<div className='hidden lg:block'>
					<div
						className='filter lg:h-auto w-[calc(100%-70px)] lg:w-64 mr-6 pt-4 lg:pt-0 bg-white lg:bg-transparent'>
						<SwitchTabs section={ section }/>
					</div>
					<div
						className='relative pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto lg:overflow-y-visible'>
						<ByCar data={ baseData } section={ section } slug={ slug } />
					</div>
				</div>
				<Content
					section={ section }
					brand={ numbers ? numbers[1] : 0 }
					model={ numbers ? numbers[2] : 0 }
					year={ numbers ? numbers[0] : 0 }
					modification={ numbers ? numbers[3] : 0 }
					car={ slug ? baseData.auto.find((item: { value: number, label: string }) => item.value === numbers[1]).label : '' }
				/>
			</div>
		</LayoutWrapper>
	);
};
