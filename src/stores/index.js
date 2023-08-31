import { configureStore } from "@reduxjs/toolkit";
import filterSearchReducer from "./productsFilter";
import authReducer from "./auth";

export const store = configureStore({
  reducer: {
    filterSearch: filterSearchReducer,
    auth: authReducer,
  },
});
