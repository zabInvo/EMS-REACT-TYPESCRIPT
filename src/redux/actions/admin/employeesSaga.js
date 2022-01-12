import { call, put, takeLatest } from "redux-saga/effects";

import { SET_EMPLOYEES } from "../../reducers/admin/employeesReducers";
import { SET_SNACKBAR } from "../../reducers/admin/snackbarReducer";

import service from "../../../services/axiosService";

const fetchEmployeesApi = async (data) => {
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

const createEmployeesApi = async (data) => {
  try {
    const employees = await service.post(
      "employee/create",
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

const deleteEmployeeApi = async (data) => {
  try {
    const employees = await service.post(
      "employee/deleteEmployee",
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

function* fetchEmployees(data) {
  try {
    const employees = yield call(fetchEmployeesApi, data);
    if (employees) {
      yield put(SET_EMPLOYEES(employees));
    }
  } catch (error) {
    console.log(error);
  }
}

function* createEmployees(data) {
  try {
    const employees = yield call(createEmployeesApi, data);
    if (employees) {
      yield call(fetchEmployees);
      const snackPayload = {
        status: true,
        type: "success",
        message: employees.message,
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

function* deleteEmployee(data) {
  try {
    const employees = yield call(deleteEmployeeApi, data);
    if (employees) {
      yield call(fetchEmployees);
      const snackPayload = {
        status: true,
        type: "success",
        message: employees.message,
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

function* employeesSaga() {
  yield takeLatest("FETCH_ALL_EMPLOYEES_REQUEST", fetchEmployees);
  yield takeLatest("CREATE_EMPLOYEE_REQUEST", createEmployees);
  yield takeLatest("DELETE_EMPLOYEE_REQUEST", deleteEmployee);
}

export default employeesSaga;
