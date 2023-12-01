import { Category } from '@/types/category';
import { asynchrounousRequest } from '@/utils/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'data/fetchCategories',
  async () => {
    console.log('here?');
    try {
      const data = await asynchrounousRequest('categories', {
        query: {
          categoryId: 'all',
        },
      });
      console.log('data', data);

      return data?.categories.sort(
        (a: Category, b: Category) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      throw error; // Will be caught as a failure by createAsyncThunk
    }
  }
);

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
    editReduxCategory(state, action) {
      const categoryIndex = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (categoryIndex !== -1) {
        state.categories[categoryIndex] = action.payload;
      }
    },
    deleteReduxCategory(state, action) {
      const categoryIndex = state.categories.findIndex(
        (category) => category.id === action.payload
      );
      if (categoryIndex !== -1) {
        state.categories.splice(categoryIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { toggleTab, editReduxCategory, deleteReduxCategory } =
  categorySlice.actions;

export const selectActiveTabs = (state: { category: CategoryState }) =>
  state.category.activeTabs;

export const selectCategories = (state: { category: CategoryState }) =>
  state.category.categories;

export default categorySlice.reducer;
