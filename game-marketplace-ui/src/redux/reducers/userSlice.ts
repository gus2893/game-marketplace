import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';
import { RootState } from '../store';

export interface UserState {
  value: IUser | undefined;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  value: undefined,
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.value = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;
export const selectuser = (state: RootState) => state.user.value;
export default userSlice.reducer;
