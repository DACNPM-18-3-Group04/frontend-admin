import { configureStore } from '@reduxjs/toolkit';
import PropertyLocationReducer from './slices/propertyLocation';
import UserReducer from './slices/user';

const store = configureStore({
  reducer: {
    user: UserReducer,
    propertyLocation: PropertyLocationReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
