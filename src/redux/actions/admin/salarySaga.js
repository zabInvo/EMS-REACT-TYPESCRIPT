import { call, put, takeLatest } from "redux-saga/effects";

import { SET_SALARIES } from "../../reducers/admin/salaryReducer";
import { SET_SNACKBAR } from "../../reducers/admin/snackbarReducer";

import service from "../../../services/axiosService";

const fetchSalariesApi = async (data) => {
  try {
    const payload = {
      companyId: data.currentCompany,
    };
    const employees = await service.post(
      "salary/getAllSalary",
      JSON.parse(localStorage.getItem("adminToken")),
      payload
    );
    return employees.data.company.Employees;
  } catch (error) {
    console.log(error);
  }
};

const createSalaryApi = async (data) => {
  try {
    const employees = await service.post(
      "salary/addSalary",
      JSON.parse(localStorage.getItem("adminToken")),
      data.payload
    );
    console.log(employees.data.message);
    return employees.data;
  } catch (error) {
    throw new Error(
      error.response.data.error ? error.response.data.error : error
    );
  }
};

const updateSalaryApi = async (data) => {
  try {
    const employees = await service.post(
      "salary/updateSalary",
      JSON.parse(localStorage.getItem("adminToken")),
      data.payload
    );
    console.log(employees.data.message);
    return employees.data;
  } catch (error) {
    throw new Error(
      error.response.data.error ? error.response.data.error : error
    );
  }
};

function* fetchSalaries(data) {
  try {
    const salaries = yield call(fetchSalariesApi, data);
    if (salaries) {
      yield put(SET_SALARIES(salaries));
    }
  } catch (error) {
    console.log(error);
  }
}

function* createSalary(data) {
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

function* updateSalary(data) {
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

function* salarySaga() {
  yield takeLatest("FETCH_SALARIES_REQUEST", fetchSalaries);
  yield takeLatest("CREATE_SALARY_REQUEST", createSalary);
  yield takeLatest("UPDATE_SALARY_REQUEST", updateSalary);
}

export default salarySaga;
