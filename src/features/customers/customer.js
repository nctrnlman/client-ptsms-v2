import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const CustomerSlice = createSlice({
  name: "Customer",
  initialState: {
    Customer: [],
  },
  reducers: {
    setCustomer: (state, action) => {
      state.Customer = action.payload;
    },
  },
});

export const { setCustomer } = CustomerSlice.actions;

export default CustomerSlice.reducer;

export function user() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");
      if (token) {
        let response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/user`,
          {
            token: token,
          }
        );
        dispatch(setCustomer(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
