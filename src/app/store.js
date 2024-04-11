import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/users/user";
import CustomerReducer from "../features/customers/customer";

export default configureStore({
  reducer: {
    user: UserReducer,
    customer: CustomerReducer,
  },
});
