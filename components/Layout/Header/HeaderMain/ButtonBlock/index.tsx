'use client'
import { useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Badge } from '@heroui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addBookmarksFromStorage } from '@/store/slices/bookmarksSlice';
import { addCartFromStorage } from '@/store/slices/cartSlice';
import * as Icons from '@/components/UI/Icons';
import { getFromStorage } from '@/lib/localeStorage';

const ButtonBlock = () => {
	const dispatch = useAppDispatch();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { cartItems } = useAppSelector(state => state.cartReducer);

	useEffect(() => {
		const bookmarksStorage = getFromStorage('reducerBookmarks') || [];
		const cartStorage = getFromStorage('reducerCart') || [];

		if(bookmarksStorage.length !== 0) {
			dispatch(addBookmarksFromStorage(bookmarksStorage));
		}
		if(cartStorage.length !== 0) {
			dispatch(addCartFromStorage(cartStorage));
		}
	}, [ dispatch ]);

	return (
		<>
			<Link href='/bookmarks' className='relative'>
				<Badge
					color='primary'
					content={ bookmarksItems.length }
					isInvisible={ bookmarksItems.length === 0 }
					className='border-white bg-gradient-to-t from-orange-500 to-orange-300'
				>
					<Icons.HeartIcon className='stroke-gray-900'/>
				</Badge>
			</Link>
			<Link href='/cart' className='relative'>
				<Badge
					color='primary'
					content={ cartItems.length }
					isInvisible={ cartItems.length === 0 }
					className='border-white bg-gradient-to-t from-orange-500 to-orange-300'
				>
					<Icons.CartIcon className='stroke-gray-900'/>
				</Badge>
			</Link>
		</>
	)
};

export default ButtonBlock;
