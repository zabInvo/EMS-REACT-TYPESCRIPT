import { call, put, takeLatest } from "redux-saga/effects";

import { SET_ATTENDANCE } from "../../reducers/admin/attendanceReducer";
import { SET_SNACKBAR } from "../../reducers/admin/snackbarReducer";
import service from "../../../services/axiosService";

const fetchAttendanceApi = async (data) => {
  try {
    const payload = {
      companyId: data.currentCompany,
    };
    const attendance = await service.post(
      "attendance/getAllAttendance",
      JSON.parse(localStorage.getItem("adminToken")),
      payload
    );
    return attendance.data.data[0].Employees;
  } catch (error) {
    console.log(error);
  }
};

const createAttendanceApi = async (data) => {
  try {
    const attendance = await service.post(
      "attendance/createAttendance",
      JSON.parse(localStorage.getItem("adminToken")),
      data.payload
    );
    console.log(attendance.data.message);
    return attendance.data;
  } catch (error) {
    throw new Error(
      error.response.data.message ? error.response.data.message : error
    );
  }
};

function* fetchAttendance(data) {
  try {
    const attendance = yield call(fetchAttendanceApi, data);
    if (attendance) {
      yield put(SET_ATTENDANCE(attendance));
    }
  } catch (error) {
    console.log(error);
  }
}

function* createAttendance(data) {
  try {
    const attendance = yield call(createAttendanceApi, data);
    if (attendance) {
      yield call(fetchAttendance);
      const snackPayload = {
        status: true,
        type: "success",
        message: attendance.message,
        error: false,
      };
      yield put(SET_SNACKBAR(snackPayload));
    }
  } catch (error) {
    const snackPayloadError = {
      status: true,
      type: "error",
      message: error.toString(),
      error: true,
    };
    yield put(SET_SNACKBAR(snackPayloadError));
  }
}

function* attendanceSaga() {
  yield takeLatest("FETCH_ATTENDANCE_REQUEST", fetchAttendance);
  yield takeLatest("CREATE_ATTENDANCE_REQUEST", createAttendance);
}

export default attendanceSaga;
