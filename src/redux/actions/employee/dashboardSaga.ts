import { call, put, takeLatest } from "redux-saga/effects";

import { SET_COMPANIES, SET_SALARY } from "../../reducers/employee/dashboardReducer";
import service from "../../../services/axiosService";


const getUserSalaryApi = async () => {
  try {
    const token:any = localStorage.getItem("employeeToken");
    const salary = await service.post(
      "salary/getUserSalary",
      JSON.parse(token),
    );
    return salary.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getCompaniesApi = async () => {
  try {
    const token:any = localStorage.getItem("employeeToken");
    const companies = await service.post(
      "company/getCompanies",
      JSON.parse(token)
    );
    return companies.data.data;
  } catch (error) {
    console.log(error);
  }
};

function* getUserSalary():any {
  try {
    const salary = yield call(getUserSalaryApi);
    if (salary) {
      yield put(SET_SALARY(salary));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getCompanies():any {
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
