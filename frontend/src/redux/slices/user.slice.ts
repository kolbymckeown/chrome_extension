import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  loading: true,
} as any;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => ({
      ...action.payload,
      loading: false,
    }),
    resetUser: () => {
      return { ...initialState, loading: false };
    },
    setNoUserFound: (state) => ({
      ...state,
      loading: false,
    }),
  },
});

export const { setUser, resetUser, setNoUserFound } = userSlice.actions;

export const selectUser = (state: { user: any }) => state.user;

export const userLoading = (state: { user: any }) => state.user.loading;

export default userSlice.reducer;
