import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface dashboardInterface {
  employees: Number;
  admins: Number;
  companies: Number;
}

interface dashboardPayload {
  employees: Number;
  admin: Number;
  company: Number;
}

const initialState: dashboardInterface = {
  employees: 0,
  admins: 0,
  companies: 0,
};

const adminDashboardReducer = createSlice({
  name: "adminDashboad",
  initialState,
  reducers: {
    SET_STATS(state, action: PayloadAction<dashboardPayload>) {
      state.employees = action.payload.employees;
      state.admins = action.payload.admin;
      state.companies = action.payload.company;
    },
  },
});

export const { SET_STATS } = adminDashboardReducer.actions;
export default adminDashboardReducer.reducer;
