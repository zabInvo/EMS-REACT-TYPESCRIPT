import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
};

const employeesReducer = createSlice({
  name: "Employees",
  initialState,
  reducers: {
    SET_EMPLOYEES(state, action) {
      state.employees = action.payload;
    },
  },
});

export const { SET_EMPLOYEES } = employeesReducer.actions;
export default employeesReducer.reducer;
