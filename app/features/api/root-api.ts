import { Brand } from '@/interfaces/brand.interface';
import { Category, TypeCategory } from '@/interfaces/category.interface';
import { Gender } from '@/interfaces/gender.interface';
import { Product } from '@/interfaces/product.interface';
import { SubCategory } from '@/interfaces/sub-category.interface';
import { User } from '@/interfaces/user.interface';
import { createApi } from '@reduxjs/toolkit/query/react';
import { getFetchBaseQuery } from './constant-api';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: getFetchBaseQuery(''),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (body) => ({
        url: '/auth',
        method: 'POST',
        body,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: '/user',
      }),
    }),
    getUserGender: builder.query<Gender, void>({
      query: () => ({
        url: '/user/gender',
      }),
    }),
    //CATEGORY
    getCategoryByGender: builder.query<Category[], TypeCategory>({
      query: (type) => ({
        url: `/category/${type}/gender`,
      }),
      keepUnusedDataFor: 30,
    }),
    //SUB CATEGORY
    getSubCategoryFromCategory: builder.query<SubCategory[], string>({
      query: (id) => ({
        url: `/sub-category/${id}/category`,
      }),
    }),
    getSubCategoryFromGender: builder.query<SubCategory[], string>({
      query: (gender) => ({
        url: `/sub-category/${gender}/gender`,
      }),
    }),

    //PRODUCTS
    getProduct: builder.query<
      Product[],
      { subId: string; gender: TypeCategory }
    >({
      query: ({ subId, gender }) => ({
        url: `/product/${subId}/subcat/${gender}/gender`,
      }),
    }),

    createProduct: builder.mutation<Product, FormData>({
      query: (body) => ({
        url: '/product',
        method: 'POST',
        body,
      }),
    }),

    getBrandsFromCategory: builder.query<Brand[], string>({
      query: (id) => ({
        url: `/brand/${id}/category`,
      }),
    }),

    getGender: builder.query<Gender[], void>({
      query: () => ({
        url: `/product/genders`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyGetMeQuery,
  useGetCategoryByGenderQuery,
  useLazyGetCategoryByGenderQuery,
  useGetSubCategoryFromCategoryQuery,
  useGetUserGenderQuery,
  useLazyGetProductQuery,
  useGetGenderQuery,
  useGetSubCategoryFromGenderQuery,
  usePrefetch,
  useGetBrandsFromCategoryQuery,
  useCreateProductMutation,
} = rootApi;
