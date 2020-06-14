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
    yield call(
      http,
      "/records/",
      "POST",
      {
        ...action.payload,
      },
      true
    );
    yield put({ type: requestSuccess("ADD_RECORD") });
    yield put(push("/main"));
    // yield put({ type: "SET_RECORD_INFO", payload: response.data });
  } catch (error) {
    yield put({ type: requestFailed("ADD_RECORD") });
  }
}

export function* getRecordsSaga(action) {
  try {
    yield put({ type: requestPending("GET_RECORDS") });
    const response = yield call(
      http,
      "/records/",
      "GET",
      {},
      true,
      action.payload
    );
    yield put({ type: requestSuccess("GET_RECORDS"), payload: response.data });
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed("GET_RECORDS") });
  }
}
