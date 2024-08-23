import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { TypeCategory } from '../../interfaces/category.interface';

interface GenderReducer {
  gender?: TypeCategory;
}

const initialState: GenderReducer = {};

const genderReducer = createSlice({
  name: 'gender',
  initialState,
  reducers: {
    setGender: (state, action: PayloadAction<TypeCategory | undefined>) => {
      state.gender = action.payload;
    },
  },
});

export const { setGender } = genderReducer.actions;

export default genderReducer;
