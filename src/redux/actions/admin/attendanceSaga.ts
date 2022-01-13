import { put, takeLatest , StrictEffect } from "redux-saga/effects";
import * as Effects from "redux-saga/effects";


import { SET_ATTENDANCE } from "../../reducers/admin/attendanceReducer";
import { SET_SNACKBAR } from "../../reducers/admin/snackbarReducer";
import service from "../../../services/axiosService";

const call: any = Effects.call;

const fetchAttendanceApi = async (data:any) => {
  try {
    const payload = {
      companyId: data.currentCompany,
    };
    const token:any = localStorage.getItem("adminToken");
    const attendance = await service.post(
      "attendance/getAllAttendance",
      JSON.parse(token),
      payload
    );
    return attendance.data.data[0].Employees;
  } catch (error) {
    console.log(error);
  }
};

const createAttendanceApi = async (data:any) => {
  try {
    const token:any = localStorage.getItem("adminToken");
    const attendance = await service.post(
      "attendance/createAttendance",
      JSON.parse(token),
      data.payload
    );
    console.log(attendance.data.message);
    return attendance.data;
  } catch (error:any) {
    throw new Error(
      error.response.data.message ? error.response.data.message : error
    );
  }
};

function* fetchAttendance(data:any):any {
  try {
    const attendance = yield call(fetchAttendanceApi, data);
    if (attendance) {
      yield put(SET_ATTENDANCE(attendance));
    }
  } catch (error) {
    console.log(error);
  }
}

function* createAttendance(data:any):any {
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
  } catch (error:any) {
    const snackPayloadError = {
      status: true,
      type: "error",
      message: error.toString(),
      error: true,
    };
    yield put(SET_SNACKBAR(snackPayloadError));
  }
}

function* attendanceSaga():Generator<StrictEffect> {
  yield takeLatest("FETCH_ATTENDANCE_REQUEST", fetchAttendance);
  yield takeLatest("CREATE_ATTENDANCE_REQUEST", createAttendance);
}

export default attendanceSaga;
