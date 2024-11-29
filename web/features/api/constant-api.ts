import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from '../store/root-store';

export const API_HOST = process.env.NEXT_PUBLIC_API_URL;

export const getFetchBaseQuery = (path: string) =>
  fetchBaseQuery({
    baseUrl: `${API_HOST}${path}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
