import { useEffect, useState } from 'react';
import { baseDataAPI } from '@/services/baseDataService';
import { removeFromStorage } from '@/lib/localeStorage';
import { useAppDispatch } from '@/hooks/redux';
import { removeCart } from '@/store/slices/cartSlice';
import { removeBookmarks } from '@/store/slices/bookmarksSlice';
import { removeComparison } from '@/store/slices/comparisonSlice';
import { Product } from '@/models/products';

interface ProductItem {
	id: number;
	section: string;
	quantity?: number;
}

type GroupedIds = { tires: number[]; cargo: number[]; disks: number[]; battery: number[] };
type GroupedItems = { tiresItems: Product[]; cargoItems: Product[]; disksItems: Product[]; batteryItems: Product[] };

const emptyIds: GroupedIds = { tires: [], cargo: [], disks: [], battery: [] };

export const useAppGetProducts = (
	products: ProductItem[] = [],
	reducer: 'reducerCart' | 'reducerBookmarks' | 'reducerComparison' | 'recentlyViewed',
	byOffer?: boolean
) => {
	const dispatch = useAppDispatch();

	const [groupedIds, setGroupedIds] = useState<GroupedIds>(emptyIds);
	const [groupedItems, setGroupedItems] = useState<GroupedItems>({
		tiresItems: [],
		cargoItems: [],
		disksItems: [],
		batteryItems: [],
	});
	const [newProducts, setNewProducts] = useState<Product[]>([]);

	// Group products by section
	useEffect(() => {
		const grouped: GroupedIds = { tires: [], cargo: [], disks: [], battery: [] };
		products.forEach(({ id, section }) => {
			if (grouped[section as keyof GroupedIds]) {
				grouped[section as keyof GroupedIds].push(id);
			}
		});
		setGroupedIds(grouped);
	}, [products]);

	// Query definitions
	const { data: dataTires, isLoading: tiresIsLoading } = baseDataAPI.useFetchProductsQuery({
		id: `${byOffer ? '?Offer_id' : '?product_ids'}=${groupedIds.tires.join(',')}`,
		length: groupedIds.tires.length || 1,
	}, { skip: groupedIds.tires.length === 0 });

	const { data: dataCargo, isLoading: cargoIsLoading } = baseDataAPI.useFetchProductsQuery({
		id: `${byOffer ? '?typeproduct=2&Offer_id' : '?typeproduct=2&product_ids'}=${groupedIds.cargo.join(',')}`,
		length: groupedIds.cargo.length || 1,
	}, { skip: groupedIds.cargo.length === 0 });

	const { data: dataDisks, isLoading: disksIsLoading } = baseDataAPI.useFetchProductsQuery({
		id: `${byOffer ? '?typeproduct=3&Offer_id' : '?typeproduct=3&product_ids'}=${groupedIds.disks.join(',')}`,
		length: groupedIds.disks.length || 1,
	}, { skip: groupedIds.disks.length === 0 });

	const { data: dataBattery, isLoading: batteryIsLoading } = baseDataAPI.useFetchProductsQuery({
		id: `${byOffer ? '?typeproduct=4&Offer_id' : '?typeproduct=4&product_ids'}=${groupedIds.battery.join(',')}`,
		length: groupedIds.battery.length || 1,
	}, { skip: groupedIds.battery.length === 0 });

	// Helper for removing invalid products
	const cleanInvalidProducts = (data: Product[] | undefined, ids: number[]) => {
		if (!data) return;
		ids.forEach(id => {
			const found = data.find(item => (byOffer ? item.best_offer?.id : item.group) === id);
			if (!found && reducer !== 'recentlyViewed') {
				removeFromStorage(reducer, id);
				dispatch(
					reducer === 'reducerCart'
						? removeCart(id)
						: reducer === 'reducerBookmarks'
							? removeBookmarks(id)
							: removeComparison(id)
				);
			}
		});
	};

	// Sync fetched items and cleanup
	useEffect(() => {
		cleanInvalidProducts(dataTires?.data?.products, groupedIds.tires);
		cleanInvalidProducts(dataCargo?.data?.products, groupedIds.cargo);
		cleanInvalidProducts(dataDisks?.data?.products, groupedIds.disks);
		cleanInvalidProducts(dataBattery?.data?.products, groupedIds.battery);

		setGroupedItems({
			tiresItems: dataTires?.data?.products || [],
			cargoItems: dataCargo?.data?.products || [],
			disksItems: dataDisks?.data?.products || [],
			batteryItems: dataBattery?.data?.products || [],
		});
	}, [dataTires, dataCargo, dataDisks, dataBattery]);

	// Sort returned products to match original order
	useEffect(() => {
		const all = [
			...groupedItems.tiresItems,
			...groupedItems.cargoItems,
			...groupedItems.disksItems,
			...groupedItems.batteryItems,
		];
		const sorted = products
			.map(({ id }) => all.find(product => product.product_id === id))
			.filter((item): item is Product => Boolean(item));
		setNewProducts(sorted);
	}, [groupedItems, products]);

	return {
		products: newProducts,
		tires: groupedItems.tiresItems,
		cargo: groupedItems.cargoItems,
		disks: groupedItems.disksItems,
		battery: groupedItems.batteryItems,
		isLoading: tiresIsLoading || cargoIsLoading || disksIsLoading || batteryIsLoading,
	};
};