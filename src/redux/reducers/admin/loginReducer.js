import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  login: false,
};

const userReducer = createSlice({
  name: "User",
  initialState,
  reducers: {
    LOGIN_ADMIN(state, action) {
      state.token = action.payload.token;
      state.login = true;
    },
    LOGOUT_ADMIN(state, action) {
      state.token = null;
      state.login = false;
    },
  },
});

export const { LOGIN_ADMIN, LOGOUT_ADMIN } = userReducer.actions;
export default userReducer.reducer;
