import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AttendanceObject {
  status: string | null;
  date: string | null;
}

export interface Attendance {
  name: string;
  email: string;
  Attendances: Array<AttendanceObject> | null | [];
}

export interface AttendanceInterface {
  attendance: Array<Attendance> | [];
}

const initialState: AttendanceInterface = {
  attendance: [],
};

const attendanceReducer = createSlice({
  name: "Attendance",
  initialState,
  reducers: {
    SET_ATTENDANCE(state, action: PayloadAction<Array<Attendance>>) {
      state.attendance = action.payload;
    },
  },
});

export const { SET_ATTENDANCE } = attendanceReducer.actions;
export default attendanceReducer.reducer;
