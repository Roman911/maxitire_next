import { FC } from 'react';
import Image from 'next/image';
import * as Icons from '@/components/UI/Icons';

const icons = {
	1: Icons.CarIcon,
	2: Icons.SuvIcon,
	7: Icons.MotorcyclesIcon,
	8: Icons.BusIcon,
	9: Icons.CargoIcon,
};

interface Props {
	season: string
	vehicle_type: string
}

const IconsBlock: FC<Props> = ({ season, vehicle_type }) => {
	const seasonIcon = season === '1' ? 'sun' : season === '2' ? 'snow' : season === '3' ? 'all-season' : undefined;
	const vehicle_type_number = vehicle_type as unknown as keyof typeof icons;
	const Icon = icons[vehicle_type_number] || null;

	return (
		<div className='absolute right-7 top-16'>
			{ seasonIcon && <Image
				src={ `/icons/${ seasonIcon }.svg` }
				alt=''
				width={ 24 }
				height={ 24 }
				priority
			/> }
			{ Icon && <Icon className='text-gray-400' /> }
		</div>
	)
};

export default IconsBlock;