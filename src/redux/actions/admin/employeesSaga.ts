import { put, takeLatest , StrictEffect } from "redux-saga/effects";
import * as Effects from "redux-saga/effects";
import { SET_EMPLOYEES } from "../../reducers/admin/employeesReducers";
import { SET_SNACKBAR } from "../../reducers/admin/snackbarReducer";

import service from "../../../services/axiosService";
const call: any = Effects.call;


const fetchEmployeesApi = async (data:any) => {
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

const createEmployeesApi = async (data:any) => {
  try {
    const token:any = localStorage.getItem("adminToken");
    const employees = await service.post(
      "employee/create",
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

const deleteEmployeeApi = async (data:any) => {
  try {
    const token:any = localStorage.getItem("adminToken");
    const employees = await service.post(
      "employee/deleteEmployee",
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

function* fetchEmployees(data:any):any {
  try {
    const employees = yield call(fetchEmployeesApi, data);
    if (employees) {
      yield put(SET_EMPLOYEES(employees));
    }
  } catch (error) {
    console.log(error);
  }
}

function* createEmployees(data:any):any {
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

function* deleteEmployee(data:any):any {
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

function* employeesSaga():Generator<StrictEffect> {
  yield takeLatest("FETCH_ALL_EMPLOYEES_REQUEST", fetchEmployees);
  yield takeLatest("CREATE_EMPLOYEE_REQUEST", createEmployees);
  yield takeLatest("DELETE_EMPLOYEE_REQUEST", deleteEmployee);
}

export default employeesSaga;
