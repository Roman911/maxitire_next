import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface CountryInfoProps {
	country: string
	year: number
	mobileHidden?: boolean
}

const CountryInfo: FC<CountryInfoProps> = ({ country, year, mobileHidden }) => {
	return <div className='flex items-center justify-center'>
		<p className='ml-2.5 text-xs text-gray-600'>
			<span className={ twMerge( mobileHidden && 'hidden sm:inline') }>
				{ country + ', ' }
			</span>{ year > 0 && year }
		</p>
	</div>
};

export default CountryInfo;