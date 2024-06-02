import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProductList = createAsyncThunk(
  "products/getProductList", //action name
  async (category) => {
    //app.js getProductList 가져옴
    let url = `https://my-json-server.typicode.com/blunyl/hpe_thirdReact/products`;
    if (category) {
      url += `?category=${category}`;
    }
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }
);

let products = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle", //초기상태를 의미
    error: null,
  },
  reducers: {
    loadDate: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.state = "loading";
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { extraReducers } = products.actions;
export default products;
