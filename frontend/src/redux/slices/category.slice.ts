import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  activeTabs: string[];
}

const initialState: CategoryState = {
  activeTabs: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    toggleTab: (state, action: PayloadAction<string>) => {
      const index = state.activeTabs.indexOf(action.payload);
      if (index === -1) {
        state.activeTabs.push(action.payload);
      } else {
        state.activeTabs.splice(index, 1);
      }
    },
  },
});

export const { toggleTab } = categorySlice.actions;

export const selectActiveTabs = (state: { category: CategoryState }) =>
  state.category.activeTabs;

export default categorySlice.reducer;
