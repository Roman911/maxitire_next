import { FC } from 'react';
import * as Icons from '@/components/UI/Icons';
import { twMerge } from 'tailwind-merge';
import { addBookmarks, removeBookmarks } from '@/store/slices/bookmarksSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addToStorage, getFromStorage, removeFromStorage } from '@/lib/localeStorage';
import { Section } from '@/models/filter';
import { Button } from '@heroui/button';

const toggleStorageItem = (storageKey: string, id: number, section: string, isInStorage: boolean) => {
	if(isInStorage) {
		removeFromStorage(storageKey, id);
	} else {
		const storage = getFromStorage(storageKey) || [];
		addToStorage(storageKey, [ ...storage, { id, section } ]);
	}
};

interface Props {
	group: number
	sectionNew: Section.Disks | 'cargo' | 'tires' | 'battery'
}

const ActionsBlock: FC<Props> = ({ group, sectionNew }) => {
	const dispatch = useAppDispatch();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const isBookmarks = bookmarksItems.some(i => i.id === group);

	const handleToggle = (
		id: number,
		isItem: boolean,
		addAction: ({ id, section }: { id: number, section: string }) => {
			type: string,
			payload: { id: number, section: string }
		}, // Ensure actions return objects
		removeAction: (id: number) => { type: string, payload: number },
		storageKey: string
	) => {
		dispatch(isItem ? removeAction(id) : addAction({ id, section: sectionNew }));
		toggleStorageItem(storageKey, id, sectionNew, isItem);
	};

	const addToDefense = () => {
		handleToggle(group, isBookmarks, addBookmarks, removeBookmarks, 'reducerBookmarks')
	}

	return (
		<div className='absolute top-5 right-5 flex flex-col z-10'>
			<Button isIconOnly onPress={ addToDefense } radius='full' variant='light' color='default' aria-label='Bookmarks'
							className='group/item hover:bg-gray-100 rounded-md'>
				<Icons.HeartIcon className={
					twMerge('text-gray-400 group-hover/item:text-primary', isBookmarks && 'text-primary fill-primary')
				}/>
			</Button>
		</div>
	)
};

export default ActionsBlock;
