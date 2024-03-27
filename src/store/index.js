import { configureStore } from '@reduxjs/toolkit';
import blogsSlice from './blogsSlice';

export default configureStore({
  reducer: {
    blogs:blogsSlice
  }
});