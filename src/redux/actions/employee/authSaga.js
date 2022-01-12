import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { SET_SNACKBAR } from "../../reducers/admin/snackbarReducer";

import {
  LOGIN_EMPLOYEE,
  LOGOUT_EMPLOYEE,
} from "../../reducers/employee/loginReducer";
import service from "../../../services/axiosService";

const loginApi = async (data) => {
  try {
    const payload = data.data;
    const login = await service.post("employee/login", "", payload);
    localStorage.setItem(
      "employeeToken",
      JSON.stringify(login.data.user.token)
    );
    return login.data;
  } catch (error) {
    throw new Error(
      error.response.data.error ? error.response.data.error : error
    );
  }
};

const updatePasswordApi = async (data) => {
  try {
    const updatePassword = await service.post(
      "employee/updatePassword",
      JSON.parse(localStorage.getItem("employeeToken")),
      data.payload
    );
    console.log(updatePassword.data.message);
    return updatePassword.data;
  } catch (error) {
    throw new Error(
      error.response.data.message ? error.response.data.message : error
    );
  }
};

function* login(data) {
  try {
    const token = yield call(loginApi, data);
    if (token) {
      yield put(LOGIN_EMPLOYEE(token));
      const snackPayload = {
        status: true,
        type: "success",
        message: token.message,
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
    console.log(error);
  }
}

function* logout() {
  try {
    yield put(LOGOUT_EMPLOYEE());
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
}

function* updatePassword(data) {
  try {
    const updatePassword = yield call(updatePasswordApi, data);

    const snackPayload = {
      status: true,
      type: "success",
      message: updatePassword.message,
      error: false,
    };
    yield put(SET_SNACKBAR(snackPayload));
  } catch (error) {
    const snackPayloadError = {
      status: true,
      type: "error",
      message: error.toString(),
      error: true,
    };
    yield put(SET_SNACKBAR(snackPayloadError));
    console.log(error);
  }
}

function* employeeSaga() {
  yield takeLatest("EMPLOYEE_LOGIN_REQUEST", login);
  yield takeEvery("EMPLOYEE_LOGOUT_REQUEST", logout);
  yield takeEvery("EMPLOYEE_UPDATE_PASSWORD_REQUEST", updatePassword);
}

export default employeeSaga;
