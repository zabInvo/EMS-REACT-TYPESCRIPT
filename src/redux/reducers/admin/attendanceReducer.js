import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendance: [],
};

const attendanceReducer = createSlice({
  name: "Attendance",
  initialState,
  reducers: {
    SET_ATTENDANCE(state, action) {
      state.attendance = action.payload;
    },
  },
});

export const { SET_ATTENDANCE } = attendanceReducer.actions;
export default attendanceReducer.reducer;
