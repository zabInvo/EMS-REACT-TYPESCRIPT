import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompanyObject {
  id: number;
  name: string;
  address: string;
  type: string;
}

export interface SalaryObject {
  amount : number | null
}

export interface CompanyInterface {
  companies: Array<CompanyObject>,
  salary : SalaryObject | null
}

const initialState:CompanyInterface = {
  companies: [],
  salary: null,
};

const dashboardReducer = createSlice({
  name: "EmployeeDashboard",
  initialState,
  reducers: {
    SET_COMPANIES(state, action:PayloadAction<Array<CompanyObject>>) {
      state.companies = action.payload;
    },
    SET_SALARY(state, action:PayloadAction<SalaryObject>) {
      state.salary = action.payload;
    },
  },
});

export const { SET_COMPANIES, SET_SALARY } = dashboardReducer.actions;
export default dashboardReducer.reducer;
