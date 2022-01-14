import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AttendanceObject {
  date: string;
  status: string;
}

export interface AttendanceInterface {
  attendance: Array<AttendanceObject>
}

const initialState : AttendanceInterface = {
  attendance: [],
};

const employeeAttendanceReducer = createSlice({
  name: "Attendance",
  initialState,
  reducers: {
    SET_ATTENDANCE(state, action:PayloadAction<Array<AttendanceObject>>) {
      state.attendance = action.payload;
    },
  },
});

export const { SET_ATTENDANCE } = employeeAttendanceReducer.actions;
export default employeeAttendanceReducer.reducer;
