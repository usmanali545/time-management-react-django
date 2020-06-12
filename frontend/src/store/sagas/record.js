import { put, call } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  requestSuccess,
  requestPending,
  requestFailed,
} from "../../utils/helpers/request";
import { http } from "../../utils/helpers/http";

export function* addRecordSaga(action) {
  try {
    yield put({ type: requestPending("ADD_RECORD") });
    const response = yield call(
      http,
      "/records/",
      "POST",
      {
        ...action.payload,
      },
      true
    );
    yield put({ type: requestSuccess("ADD_RECORD") });
    // yield put({ type: "SET_USER_INFO", payload: response.data });
  } catch (error) {
    yield put({ type: requestFailed("ADD_RECORD") });
  }
}
