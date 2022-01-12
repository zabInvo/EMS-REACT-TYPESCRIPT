import { put, takeEvery } from "redux-saga/effects";

import { SET_SNACKBAR , CLEAR_SNACKBAR} from "../../reducers/admin/snackbarReducer";

function* creatingSnackbar(data) {
  try {
    yield put(SET_SNACKBAR(data));
  } catch (error) {
    console.log(error);
  }
}

function* clearSnackbar(data) {
  try {
    yield put(CLEAR_SNACKBAR(data));
  } catch (error) {
    console.log(error);
  }
}

function* snackbarSaga() {
  yield takeEvery("SNACKBAR_REQUEST", creatingSnackbar);
  yield takeEvery("CLEAR_SNACKBAR_REQUEST", clearSnackbar);

}

export default snackbarSaga;
