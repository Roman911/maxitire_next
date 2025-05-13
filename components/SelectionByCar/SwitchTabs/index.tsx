import { Link } from '@/i18n/routing';
import { twMerge } from 'tailwind-merge';
import { Section } from '@/models/filter';
import { useTranslations } from 'next-intl';

const SwitchTabs = ({ section, path }: { section: Section, path: string }) => {
	const t = useTranslations('Main');

	const renderTab = (value: Section) => {
		const url = `/selection-by-car/${ value }/${path}`;

		return (
			<Link
				href={ url }
				className={ twMerge(
					'text-sm font-bold uppercase py-3.5 rounded-t-sm border border-slate-200 border-b-0 text-center bg-white',
					section !== value && 'bg-gray-200 text-gray-500'
				) }
			>
				{ t(value) }
			</Link>
		);
	};

	return (
		<div className='filter h-auto w-[calc(100%-70px)] lg:w-full lg:pt-0'>
			<div className='filter-tabs grid grid-cols-2 gap-2.5 -mb-0.5'>
				{ renderTab(Section.Tires) }
				{ renderTab(Section.Disks) }
			</div>
		</div>
	)
};

export default SwitchTabs;
