import { createSlice } from '@reduxjs/toolkit';

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
  },
  reducers: {
    updateBlogs: (state,action) => {
      // state.blogs= action.payload;
      return Object.assign(state,action.payload);
    },
  }
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { updateBlogs } = blogsSlice.actions;

export default blogsSlice.reducer;