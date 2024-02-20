import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );
    console.log('response',response)
    return response.data?.[0]?.title;
  }
);

const demoStore = createSlice({
  name: "demo",
  initialState: typeof window !=='undefined' ? (window as any)?.context?.state?.demo : {content: "demo"},
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addNewPost.pending, (state, action) => {
        state.content = "loading";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.content = action.payload;
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.content= "请求失败";
      });
  },
});

export default demoStore.reducer