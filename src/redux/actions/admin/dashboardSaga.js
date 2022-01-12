import { call, put, takeLatest } from "redux-saga/effects";

import { SET_STATS } from "../../reducers/admin/dashboardReducer";

import service from "../../../services/axiosService";

const dashboardStatsApi = async (data) => {
  try {
    const payload = {
      companyId: data.currentCompanyId,
    };
    const stats = await service.post(
      "admin/getDashboardStats",
      JSON.parse(localStorage.getItem("adminToken")),
      payload
    );
    return stats.data.data;
  } catch (error) {
    console.log(error);
  }
};

function* dashboardStats(data) {
  try {
    const stats = yield call(dashboardStatsApi, data);
    if (stats) {
      yield put(SET_STATS(stats));
    }
  } catch (error) {
    console.log(error);
  }
}

function* dashboardSaga() {
  yield takeLatest("FETCH_DASHBOARD_STATS_REQUEST", dashboardStats);
}

export default dashboardSaga;
