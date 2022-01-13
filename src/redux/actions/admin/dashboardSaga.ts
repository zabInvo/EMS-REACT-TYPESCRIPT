import { call, put, takeLatest , StrictEffect } from "redux-saga/effects";

import { SET_STATS } from "../../reducers/admin/dashboardReducer";

import service from "../../../services/axiosService";

const dashboardStatsApi = async (data:any) => {
  try {
    const payload = {
      companyId: data.currentCompanyId,
    };
    const token:any = localStorage.getItem("adminToken");
    const stats = await service.post(
      "admin/getDashboardStats",
      JSON.parse(token),
      payload
    );
    return stats.data.data;
  } catch (error) {
    console.log(error);
  }
};

function* dashboardStats(data:any):any {
  try {
    const stats = yield call(dashboardStatsApi, data);
    if (stats) {
      yield put(SET_STATS(stats));
    }
  } catch (error) {
    console.log(error);
  }
}

function* dashboardSaga():Generator<StrictEffect> {
  yield takeLatest("FETCH_DASHBOARD_STATS_REQUEST", dashboardStats);
}

export default dashboardSaga;
