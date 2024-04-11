import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const UserSlice = createSlice({
  name: "Auth",
  initialState: {
    User: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.User = action.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;

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
        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
