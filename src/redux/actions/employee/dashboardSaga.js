import { call, put, takeLatest } from "redux-saga/effects";

import { SET_COMPANIES, SET_SALARY } from "../../reducers/employee/dashboardReducer";
import service from "../../../services/axiosService";


const getUserSalaryApi = async () => {
  try {
    const salary = await service.post(
      "salary/getUserSalary",
      JSON.parse(localStorage.getItem("employeeToken")),
    );
    return salary.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getCompaniesApi = async () => {
  try {
    const companies = await service.post(
      "company/getCompanies",
      JSON.parse(localStorage.getItem("employeeToken")),
    );
    return companies.data.data;
  } catch (error) {
    console.log(error);
  }
};

function* getUserSalary() {
  try {
    const salary = yield call(getUserSalaryApi);
    if (salary) {
      yield put(SET_SALARY(salary));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getCompanies() {
  try {
    const companies = yield call(getCompaniesApi);
    if (companies) {
      yield put(SET_COMPANIES(companies));
    }
  } catch (error) {
    console.log(error);
  }
}


function* dashboardSaga() {
  yield takeLatest("FETCH_USER_SALARY_REQUEST", getUserSalary);
  yield takeLatest("FETCH_USER_COMPANIES_REQUEST", getCompanies);
}

export default dashboardSaga;
