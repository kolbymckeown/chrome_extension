import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/user.slice';
import categoryReducer from './slices/category.slice';
import itemsReducer from './slices/items.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
