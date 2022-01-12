import { createSlice } from "@reduxjs/toolkit";

interface dashboardState {
  employees : Number,
  admins : Number,
  companies : Number
}

const initialState = {
  employees: 0,
  admins: 0,
  companies: 0,
};

const adminDashboardReducer = createSlice({
  name: "adminDashboad",
  initialState,
  reducers: {
    SET_STATS(state, action) {
      state.employees = action.payload.employees;
      state.admins = action.payload.admin;
      state.companies = action.payload.company;
    },
  },
});

export const { SET_STATS } = adminDashboardReducer.actions;
export default adminDashboardReducer.reducer;
