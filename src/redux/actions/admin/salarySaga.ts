import { put, takeLatest } from "redux-saga/effects";
import * as Effects from "redux-saga/effects";
import { SET_SALARIES } from "../../reducers/admin/salaryReducer";
import { SET_SNACKBAR } from "../../reducers/admin/snackbarReducer";

import service from "../../../services/axiosService";
const call: any = Effects.call;

const fetchSalariesApi = async (data:any) => {
  try {
    const payload = {
      companyId: data.currentCompany,
    };
    const token:any = localStorage.getItem("adminToken");
    const employees = await service.post(
      "salary/getAllSalary",
      JSON.parse(token),
      payload
    );
    return employees.data.company.Employees;
  } catch (error) {
    console.log(error);
  }
};

const createSalaryApi = async (data:any) => {
  try {
    const token:any = localStorage.getItem("adminToken");
    const employees = await service.post(
      "salary/addSalary",
      JSON.parse(token),
      data.payload
    );
    console.log(employees.data.message);
    return employees.data;
  } catch (error:any) {
    throw new Error(
      error.response.data.error ? error.response.data.error : error
    );
  }
};

const updateSalaryApi = async (data:any) => {
  try {
    const token:any = localStorage.getItem("adminToken");
    const employees = await service.post(
      "salary/updateSalary",
      JSON.parse(token),
      data.payload
    );
    console.log(employees.data.message);
    return employees.data;
  } catch (error:any) {
    throw new Error(
      error.response.data.error ? error.response.data.error : error
    );
  }
};

function* fetchSalaries(data:any):any {
  try {
    const salaries = yield call(fetchSalariesApi, data);
    if (salaries) {
      yield put(SET_SALARIES(salaries));
    }
  } catch (error) {
    console.log(error);
  }
}

function* createSalary(data:any):any {
  try {
    const salaries = yield call(createSalaryApi, data);
    if (salaries) {
      yield call(fetchSalaries);
      const snackPayload = {
        status: true,
        type: "success",
        message: salaries.message,
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
    console.log(error);
  }
}

function* updateSalary(data:any):any {
  try {
    const salaries = yield call(updateSalaryApi, data);
    if (salaries) {
      yield call(fetchSalaries);
      const snackPayload = {
        status: true,
        type: "success",
        message: salaries.message,
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
    console.log(error);
  }
}

function* salarySaga() {
  yield takeLatest("FETCH_SALARIES_REQUEST", fetchSalaries);
  yield takeLatest("CREATE_SALARY_REQUEST", createSalary);
  yield takeLatest("UPDATE_SALARY_REQUEST", updateSalary);
}

export default salarySaga;
