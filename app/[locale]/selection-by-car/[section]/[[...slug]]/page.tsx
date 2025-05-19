import { Section } from '@/models/filter';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import ByCar from '@/components/Catalog/FilterAlt/ByCar';
import SwitchTabs from '@/components/SelectionByCar/SwitchTabs';
import Content from '@/components/SelectionByCar/Content';
import { getBaseData } from '@/app/api/api';

export default async function SelectionByCar({ params }: { params: Promise<{ section: Section, slug: string[] }> }) {
	const { section, slug } = await params;
	const baseData = await getBaseData();
	const numbers = slug && slug[0].split('-').filter(part => /^\d+$/.test(part)).map(Number);

	const path = [
		{
			title: 'selection tires and disks',
			translations: true,
			href: `/selection-by-car`,
		},
	];

	return (
		<LayoutWrapper>
			<Breadcrumbs path={ path } />
			<Title title='selection tires and disks' translations={ true } className='mt-3 text-lg font-medium px-0 lg:px-3 mb-3 lg:mb-1' />
			<div className='py-2 md:py-5 lg:flex lg:gap-10'>
				<div>
					<SwitchTabs section={ section } path={ slug ? slug[0] : '' } />
					<div
						className='relative pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto lg:overflow-y-visible'>
						<ByCar data={ baseData } section={ section } slug={ slug } />
					</div>
				</div>
				<Content
					section={ section }
					brand={ numbers ? numbers[1] : 0 }
					model={ numbers ? numbers[2] : 0 }
					year={ numbers ? numbers[0] : 0 }
					modification={ numbers ? numbers[3] : 0 }
					car={ slug ? baseData.auto.find((item: { value: number, label: string }) => item.value === numbers[numbers.length > 2 ? 1 : 0]).label : '' }
				/>
			</div>
		</LayoutWrapper>
	);
};
