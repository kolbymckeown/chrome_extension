import { CartItem } from '@/types/item';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemsState {
  items: { [key: number]: CartItem[] };
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
      const sortedItems = action.payload.reduce((acc, item) => {
        if (acc[item.categoryId]) {
          acc[item.categoryId].push(item);
        } else {
          acc[item.categoryId] = [item];
        }
        return acc;
      }, {} as { [key: number]: CartItem[] });
      state.items = sortedItems;
    },
    fetchItemsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchItemsStart, fetchItemsSuccess, fetchItemsFailure } =
  itemsSlice.actions;

export const selectItems = (state: { items: ItemsState }) => state.items.items;

export default itemsSlice.reducer;
