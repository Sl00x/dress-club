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
  tagTypes: ['USER', 'PRODUCT', 'CAT', 'SUBCAT', 'GENDER', 'BRAND'],
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (body) => ({
        url: '/auth',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['USER'],
    }),

    register: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['USER'],
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: '/user',
      }),
      providesTags: ['USER'],
    }),
    getUserGender: builder.query<Gender, void>({
      query: () => ({
        url: '/user/gender',
      }),
      providesTags: ['USER'],
    }),
    //CATEGORY
    getCategoryByGender: builder.query<Category[], TypeCategory>({
      query: (type) => ({
        url: `/category/${type}/gender`,
      }),
      providesTags: ['CAT'],
    }),
    //SUB CATEGORY
    getSubCategoryFromCategory: builder.query<SubCategory[], string>({
      query: (id) => ({
        url: `/sub-category/${id}/category`,
      }),
      providesTags: ['SUBCAT'],
    }),
    getSubCategoryFromGender: builder.query<SubCategory[], string>({
      query: (gender) => ({
        url: `/sub-category/${gender}/gender`,
      }),
      providesTags: ['SUBCAT'],
    }),

    //PRODUCTS
    getProduct: builder.query<Product[], string>({
      query: (string) => ({
        url: `/product?${string}`,
      }),
      providesTags: ['PRODUCT'],
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `/product/${id}`,
      }),
    }),

    createProduct: builder.mutation<Product, FormData>({
      query: (body) => ({
        url: '/product',
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body,
      }),
      invalidatesTags: ['PRODUCT'],
    }),

    getBrandsFromCategory: builder.query<Brand[], string>({
      query: (id) => ({
        url: `/brand/${id}/category`,
      }),
      providesTags: ['BRAND'],
    }),

    getGender: builder.query<Gender[], void>({
      query: () => ({
        url: `/product/genders`,
      }),
      providesTags: ['GENDER'],
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
  useGetProductByIdQuery,
  useRegisterMutation,
} = rootApi;
