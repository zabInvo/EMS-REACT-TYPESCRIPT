import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  salary: null,
};

const dashboardReducer = createSlice({
  name: "EmployeeDashboard",
  initialState,
  reducers: {
    SET_COMPANIES(state, action) {
      state.companies = action.payload;
    },
    SET_SALARY(state, action) {
      state.salary = action.payload;
    },
  },
});

export const { SET_COMPANIES, SET_SALARY } = dashboardReducer.actions;
export default dashboardReducer.reducer;
