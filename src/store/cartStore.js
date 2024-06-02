import { createSlice } from "@reduxjs/toolkit";
// import { cartData } from "./cartData";

let cartData = localStorage.getItem("cartData")
  ? JSON.parse(localStorage.getItem("cartData"))
  : [];

export let cart = createSlice({
  name: "cart",
  initialState: cartData,
  reducers: {
    //cart func
    //count ++
    addCount(state, action) {
      let num = state.findIndex((item) => item.id === action.payload);
      state[num].count++;
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    //count --
    minusCount(state, action) {
      let num = state.findIndex((item) => item.id === action.payload);
      state[num].count--;
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    //delete
    delItem(state, action) {
      let num = state.findIndex((item) => item.id === action.payload);
      state.splice(num, 1);
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    //add
    addItem(state, action) {
      let num = state.findIndex((item) => item.id === action.payload.id);
      if (num === -1) state.push(action.payload);
      if (num !== -1) state[num].count += action.payload.count;
      localStorage.setItem("cartData", JSON.stringify(state));
    },
  },
});

export default cart;
export const { addCount, minusCount, delItem, addItem } = cart.actions;
