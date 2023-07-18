import { configureStore } from '@reduxjs/toolkit';
import editReducer from './EditSlice';

export const store = configureStore({
  reducer: {
    EditModelOpen: editReducer
  }
});