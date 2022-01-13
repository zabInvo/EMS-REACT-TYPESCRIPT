import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SalaryObject {
  amount: number | null;
}

export interface EmployeeObject {
  email: string;
  id: number;
  name: string;
  Salary: SalaryObject | null;
}

export interface SalaryInterface {
  salaries: Array<EmployeeObject>;
}

const initialState: SalaryInterface = {
  salaries: [],
};

const salaryReducer = createSlice({
  name: "Salaries",
  initialState,
  reducers: {
    SET_SALARIES(state, action: PayloadAction<Array<EmployeeObject>>) {
      state.salaries = action.payload;
    },
  },
});

export const { SET_SALARIES } = salaryReducer.actions;
export default salaryReducer.reducer;
