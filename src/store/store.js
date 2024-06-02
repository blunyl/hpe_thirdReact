import { configureStore } from "@reduxjs/toolkit";
import user from "./userStore";
import stock from "./stockStore";
import cart from "./cartStore";
import products from "./productStore";

export const store = configureStore({
  reducer: {
    user: user.reducer, //유저 변수가 store 에 등록돼있어서 다른 컴포넌트에서 사용가능
    stock: stock.reducer,
    cart: cart.reducer,
    products: products.reducer,
  },
});
