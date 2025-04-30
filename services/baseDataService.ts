import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	API_CONSTANTS,
	// DEFAULT_HEADERS,
	FORM_HEADERS,
	baseEndpoints,
	productEndpoints,
	deliveryEndpoints,
	orderEndpoints,
	formEndpoints
} from '@/config/api';
import { SettingsProps } from '@/models/settings';
import { ProductsProps } from '@/models/products';
import { BaseDataProps, CarModelProps, KitDiskSize, KitTyreSize, ManufModels } from '@/models/baseData';
import { OrdersParamProps } from '@/models/ordersParam';

export const baseDataAPI = createApi({
	reducerPath: 'baseDataAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_CONSTANTS.BASE_URL }),
	tagTypes: ['Product'],
	endpoints: (build) => ({
		fetchSettings: build.query<SettingsProps, string>({
			query: () => ({
				url: baseEndpoints.settings,
			}),
		}),
		fetchBaseData: build.query<BaseDataProps, string>({
			query: () => ({
				url: baseEndpoints.baseData,
			}),
		}),
		fetchProducts: build.query<ProductsProps | undefined, {id: string, start?: number, length?: number}>({
			query: ({ id, start = 0, length = 10 }) => ({
				url: productEndpoints.products(id),
				method: API_CONSTANTS.METHODS.POST,
				body: { start, length }
			}),
		}),
		createOrder: build.mutation({
			query: (data) => ({
				url: orderEndpoints.create,
				method: API_CONSTANTS.METHODS.POST,
				body: JSON.stringify(data),
				headers: FORM_HEADERS
			}),
		}),
		createCallback: build.mutation({
			query: (data) => ({
				url: formEndpoints.callback,
				method: API_CONSTANTS.METHODS.POST,
				body: JSON.stringify(data),
				headers: FORM_HEADERS
			}),
		}),
		createAddAsk: build.mutation({
			query: (data) => ({
				url: formEndpoints.ask,
				method: API_CONSTANTS.METHODS.POST,
				body: JSON.stringify(data),
				headers: FORM_HEADERS
			}),
		}),
		fetchKitTyreSize: build.query<KitTyreSize[], string>({
			query: (id) => ({
				url: baseEndpoints.kitTyreSize(id),
			}),
		}),
		fetchKitDiskSize: build.query<KitDiskSize[], string>({
			query: ([section]) => ({
				url: baseEndpoints.kitDiskSize(section),
			}),
		}),
		fetchManufModels: build.query<ManufModels[], string>({
			query: ([section]) => ({
				url: baseEndpoints.manufModels(section),
			}),
		}),
		fetchOrdersParam: build.query<OrdersParamProps, string>({
			query: () => ({
				url: orderEndpoints.params,
			}),
		}),
		createComment: build.mutation({
			query: (comment) => ({
				url: productEndpoints.reviews,
				method: API_CONSTANTS.METHODS.POST,
				body: JSON.stringify(comment),
				headers: FORM_HEADERS
			}),
			invalidatesTags: ['Product'],
		}),
		fetchNpSearch: build.query({
			query: (name) => ({
				url: deliveryEndpoints.novaPoshta.search,
				method: API_CONSTANTS.METHODS.POST,
				body: {
					name: name
				}
			}),
		}),
		fetchNpWarehouses: build.query({
			query: (ref) => ({
				url: deliveryEndpoints.novaPoshta.warehouses(ref),
			}),
		}),
		fetchNpDocumentPrice: build.query({
			query: (params) => ({
				url: deliveryEndpoints.novaPoshta.documentPrice,
				method: API_CONSTANTS.METHODS.POST,
				body: JSON.stringify(params),
			}),
		}),
		fetchAutoModel: build.query<CarModelProps[], string>({
			query: (id) => ({
				url: baseEndpoints.autoBrandModel(id),
			}),
		}),
		fetchAutoYear: build.query<number[], string>({
			query: (id) => ({
				url: baseEndpoints.autoBrandModelYear(id),
			}),
		}),
		fetchAutoModelKit: build.query<CarModelProps[], string>({
			query: (id) => ({
				url: baseEndpoints.autoBrandModelKit(id),
			}),
		}),
	}),
});
