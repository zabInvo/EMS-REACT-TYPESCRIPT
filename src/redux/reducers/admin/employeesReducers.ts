import { createSlice , PayloadAction } from "@reduxjs/toolkit";

export interface EmployeeObject{
  name:string;
  id:number;
  email:number;
}

export interface EmployeesInterface {
  employees: Array<EmployeeObject> | [];
}

export const initialState:EmployeesInterface = {
  employees: [],
};

const employeesReducer = createSlice({
  name: "Employees",
  initialState,
  reducers: {
    SET_EMPLOYEES(state, action:PayloadAction<Array<EmployeeObject>>) {
      state.employees = action.payload;
    },
  },
});

export const { SET_EMPLOYEES } = employeesReducer.actions;
export default employeesReducer.reducer;
