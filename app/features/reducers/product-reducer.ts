import { Brand } from '@/interfaces/brand.interface';
import { Category } from '@/interfaces/category.interface';
import { Gender } from '@/interfaces/gender.interface';
import { SubCategory } from '@/interfaces/sub-category.interface';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface CreateProduct {
  gender?: Gender;
  subCategory?: SubCategory;
  category?: Category;
  brand?: Brand;
  model?: string;
  price?: number;
  state?: { label: string; value: string };
  files?: { uri: string; name: string; type: string }[];
}

interface ProductState {
  product?: CreateProduct;
}

const initialState: ProductState = {};

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addKeyValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      const stateCopy = { ...state.product };
      (stateCopy as any)[action.payload.key] = action.payload.value;
      state.product = stateCopy;
    },
  },
});

export const { addKeyValue } = productReducer.actions;
export default productReducer;
