'use client'
import { FC } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';

interface Props {
	isFooter?: boolean
}

const Logo: FC<Props> = ({ isFooter }) => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const handleClick = () => {
		if(pathname !== '/') dispatch(setProgress(true));
	}

	return (
		<Link href='/' onClick={ handleClick } className='logo w-32 md:w-auto'>
			{ isFooter ? <Image
				src='/logo-footer.png'
				alt="logo"
				width={ 200 }
				height={ 134 }
				priority
			/> : <Image
				src='/logo.svg'
				alt="logo"
				width={ 168 }
				height={ 113 }
				priority
			/> }
		</Link>
	)
};

export default Logo;
