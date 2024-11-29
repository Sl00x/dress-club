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
  vintage?: boolean;
  blockchain?: boolean;
  model?: string;
  price?: number;
  state?: { label: string; value: string };
  files?: { uri: string; name: string; type: string }[];
}

interface ProductState {
  product?: CreateProduct;
}

const initialState: ProductState = {
  product: {
    blockchain: false,
    vintage: false,
  },
};

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

    clearAll: (state) => {
      state.product = undefined;
    },
  },
});

export const { addKeyValue, clearAll } = productReducer.actions;
export default productReducer;
