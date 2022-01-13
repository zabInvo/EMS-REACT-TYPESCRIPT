import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginInterface {
  token: string | null;
  login: boolean;
}

const initialState: LoginInterface = {
  token: null,
  login: false,
};

const userReducer = createSlice({
  name: "User",
  initialState,
  reducers: {
    LOGIN_ADMIN(state, action: PayloadAction<LoginInterface>) {
      state.token = action.payload.token;
      state.login = true;
    },
    LOGOUT_ADMIN(state) {
      state.token = null;
      state.login = false;
    },
  },
});

export const { LOGIN_ADMIN, LOGOUT_ADMIN } = userReducer.actions;
export default userReducer.reducer;
