import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendance: [],
};

const employeeAttendanceReducer = createSlice({
  name: "Attendance",
  initialState,
  reducers: {
    SET_ATTENDANCE(state, action) {
      state.attendance = action.payload;
    },
  },
});

export const { SET_ATTENDANCE } = employeeAttendanceReducer.actions;
export default employeeAttendanceReducer.reducer;
