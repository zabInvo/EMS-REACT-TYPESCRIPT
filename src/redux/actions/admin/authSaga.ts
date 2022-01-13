import { call, put, takeLatest, takeEvery , StrictEffect} from "redux-saga/effects";

import { LOGIN_ADMIN, LOGOUT_ADMIN } from "../../reducers/admin/loginReducer";
import service from "../../../services/axiosService";
import { SET_SNACKBAR } from "../../reducers/admin/snackbarReducer";

const loginApi = async (data:any) => {
  try {
    const payload = data.data;
    const login = await service.post("admin/login", "", payload);
    localStorage.setItem("adminToken", JSON.stringify(login.data.token));
    return login.data;
  } catch (error:any) {
    throw new Error(
      error.response.data.error ? error.response.data.error : error
    );
  }
};

const uploadImageApi = async (data:any) => {
  try {
    const token:any = localStorage.getItem("adminToken");
    const uploadImage = await service.post(
      "admin/uploadImage",
      JSON.parse(token),
      data.formData
    );    
    return uploadImage.data;
  } catch (error:any) {
    throw new Error(
      error.response.data.message ? error.response.data.message : error
    );
  }
};

const updatePasswordApi = async (data:any) => {
  try {
    const token:any = localStorage.getItem("adminToken");
    const updatePassword = await service.post(
      "admin/updatePassword",
      JSON.parse(token),
      data.payload
    );
    console.log(updatePassword.data.message);
    return updatePassword.data;
  } catch (error:any) {
    throw new Error(
      error.response.data.message ? error.response.data.message : error
    );
  }
};

function* login(data:any):any {
  try {
    const token = yield call(loginApi, data);
    if (token) {
      yield put(LOGIN_ADMIN(token));
      const snackPayload = {
        status: true,
        type: "success",
        message: token.message,
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

function* logout():any {
  try {
    yield put(LOGOUT_ADMIN());
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
}

function* updatePassword(data:any):any {
  try {
    const updatePassword = yield call(updatePasswordApi, data);
    console.log(updatePassword);
    const snackPayload = {
      status: true,
      type: "success",
      message: updatePassword.message,
      error: false,
    };
    yield put(SET_SNACKBAR(snackPayload));
  } catch (error:any) {
    console.log(error);
    const snackPayloadError = {
      status: true,
      type: "error",
      message: error.toString(),
      error: true,
    };
    yield put(SET_SNACKBAR(snackPayloadError));
  }
}

function* uploadImage(data:any):any {
  try {
    const updatePassword = yield call(uploadImageApi, data);
    const snackPayload = {
      status: true,
      type: "success",
      message: updatePassword.message,
      error: false,
    };
    yield put(SET_SNACKBAR(snackPayload));
  } catch (error:any) {
    console.log(error);
    const snackPayloadError = {
      status: true,
      type: "error",
      message: error.toString(),
      error: true,
    };
    yield put(SET_SNACKBAR(snackPayloadError));
  }
}

function* adminSaga():Generator<StrictEffect> {
  yield takeLatest("ADMIN_LOGIN_REQUEST", login);
  yield takeEvery("ADMIN_LOGOUT_REQUEST", logout);
  yield takeEvery("UPDATE_PASSWORD_REQUEST", updatePassword);
  yield takeEvery("UPDATE_PROFILE_IMAGE_REQUEST", uploadImage);
}

export default adminSaga;
