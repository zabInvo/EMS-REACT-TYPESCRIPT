import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  login: false,
};

const employeeReducer = createSlice({
  name: "Employee",
  initialState,
  reducers: {
    LOGIN_EMPLOYEE(state, action) {
      state.token = action.payload.user.token;
      state.login = true;
    },
    LOGOUT_EMPLOYEE(state, action) {
      state.token = null;
      state.login = false;
    },
  },
});

export const { LOGIN_EMPLOYEE, LOGOUT_EMPLOYEE } = employeeReducer.actions;
export default employeeReducer.reducer;
