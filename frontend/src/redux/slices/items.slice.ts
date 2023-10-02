import { CartItem } from '@/types/item';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemsState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    fetchItemsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchItemsSuccess(state, action: PayloadAction<CartItem[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchItemsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchItemsStart, fetchItemsSuccess, fetchItemsFailure } =
  itemsSlice.actions;

export default itemsSlice.reducer;
