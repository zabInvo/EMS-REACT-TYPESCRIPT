import { call, put, takeLatest } from "redux-saga/effects";
import { SET_SNACKBAR } from "../../reducers/admin/snackbarReducer";

import {
  SET_COMPANIES,
  SET_CURRENT_COMPANIES,
} from "../../reducers/admin/companyReducer";
import service from "../../../services/axiosService";

const fetchCompaniesApi = async () => {
  try {
    const companies = await service.post(
      "company/getCompanies",
      JSON.parse(localStorage.getItem("adminToken"))
    );
    return companies.data.data;
  } catch (error) {
    console.log(error);
  }
};

const createCompanyApi = async (data) => {
  try {
    const companies = await service.post(
      "company/create",
      JSON.parse(localStorage.getItem("adminToken")),
      data.payload
    );
    console.log(companies.data.message);
    return companies.data;
  } catch (error) {
    throw new Error(
      error.response.data.error ? error.response.data.error : error
    );
  }
};

const deleteCompanyApi = async (data) => {
  try {
    const companies = await service.post(
      "company/delete",
      JSON.parse(localStorage.getItem("adminToken")),
      data.payload
    );
    console.log(companies.data.message);
    return companies.data;
  } catch (error) {
    throw new Error(
      error.response.data.error ? error.response.data.error : error
    );
  }
};

const updateCompanyApi = async (data) => {
  try {
    const companies = await service.post(
      "company/update",
      JSON.parse(localStorage.getItem("adminToken")),
      data.payload
    );
    console.log(companies.data.message);
    return companies.data;
  } catch (error) {
    throw new Error(
      error.response.data.error ? error.response.data.error : error
    );
  }
};

function* fetchCompanies() {
  try {
    const companies = yield call(fetchCompaniesApi);
    if (companies) {
      yield put(SET_COMPANIES(companies));
    }
  } catch (error) {
    console.log(error);
  }
}

function* createCompany(data) {
  try {
    const companies = yield call(createCompanyApi, data);
    if (companies) {
      yield call(fetchCompanies);
      const snackPayload = {
        status: true,
        type: "success",
        message: companies.message,
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

function* deleteCompany(data) {
  try {
    const companies = yield call(deleteCompanyApi, data);
    if (companies) {
      yield call(fetchCompanies);
      const snackPayload = {
        status: true,
        type: "success",
        message: companies.message,
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

function* updateCompany(data) {
  try {
    const companies = yield call(updateCompanyApi, data);
    if (companies) {
      yield call(fetchCompanies);
      const snackPayload = {
        status: true,
        type: "success",
        message: companies.message,
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

function* setCurrentCompany(id) {
  try {
    yield put(SET_CURRENT_COMPANIES(id));
  } catch (error) {
    console.log(error);
  }
}

function* companySaga() {
  yield takeLatest("FETCH_ALL_COMPANIES_REQUEST", fetchCompanies);
  yield takeLatest("CREATE_COMPANIES_REQUEST", createCompany);
  yield takeLatest("DELETE_COMPANIES_REQUEST", deleteCompany);
  yield takeLatest("UPDATE_COMPANIES_REQUEST", updateCompany);
  yield takeLatest("SET_CURRENT_COMPANIES_REQUEST", setCurrentCompany);
}

export default companySaga;
