import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import currencyReducer from "./slices/currencySlice";

export default function () {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      currency: currencyReducer,
    },
  });
  return store;
}
