import { Category } from '@/types/category';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  activeTabs: number[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  activeTabs: [],
  categories: [],
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    toggleTab: (state, action: PayloadAction<number>) => {
      const index = state.activeTabs.indexOf(action.payload);
      if (index === -1) {
        state.activeTabs.push(action.payload);
      } else {
        state.activeTabs.splice(index, 1);
      }
    },
    fetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.loading = false;
      state.categories = action.payload;
    },
  },
});

export const { toggleTab, fetchCategoriesStart, fetchCategoriesSuccess } =
  categorySlice.actions;

export const selectActiveTabs = (state: { category: CategoryState }) =>
  state.category.activeTabs;

export const selectCategories = (state: { category: CategoryState }) =>
  state.category.categories;

export default categorySlice.reducer;
