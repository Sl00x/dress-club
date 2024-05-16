import { User } from '@/interfaces/user.interface';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/root-store';

interface UserState {
  user?: User | null;
  token?: string;
}

const initialState: UserState = {};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = userReducer.actions;

export const getUser = (state: RootState) => state.user.user;

export default userReducer;
