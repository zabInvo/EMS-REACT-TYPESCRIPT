import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salaries: [],
};

const salaryReducer = createSlice({
  name: "Salaries",
  initialState,
  reducers: {
    SET_SALARIES(state, action) {
      state.salaries = action.payload;
    },
  },
});

export const { SET_SALARIES } = salaryReducer.actions;
export default salaryReducer.reducer;
