import { CartItem } from '@/types/item';
import { asynchrounousRequest } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCartItems = createAsyncThunk(
  'data/fetchCartItems',
  async () => {
    try {
      const data = await asynchrounousRequest('cart-item', {
        query: {
          cartItemId: 'all',
        },
      });
      return data?.cartItems;
    } catch (error) {
      throw error;
    }
  }
);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { fetchItemsStart } = itemsSlice.actions;

export const selectItems = (state: { items: ItemsState }) => state.items.items;

export default itemsSlice.reducer;
