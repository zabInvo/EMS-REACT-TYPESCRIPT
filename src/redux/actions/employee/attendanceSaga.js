import { call, put, takeLatest } from "redux-saga/effects";

import { SET_ATTENDANCE } from "../../reducers/employee/attendanceReducer";

import service from "../../../services/axiosService";

const fetchAttendanceApi = async () => {
  try {
    const attendance = await service.post(
      "attendance/getAttendance",
      JSON.parse(localStorage.getItem("employeeToken"))
    );
    return attendance.data.data;
  } catch (error) {
    console.log(error);
  }
};

function* fetchAttendance() {
  try {
    const attendance = yield call(fetchAttendanceApi);
    if (attendance) {
      yield put(SET_ATTENDANCE(attendance));
    }
  } catch (error) {
    console.log(error);
  }
}

function* employeeAttendanceSaga() {
  yield takeLatest("FETCH_USER_ATTENDANCE_REQUEST", fetchAttendance);
}

export default employeeAttendanceSaga;
