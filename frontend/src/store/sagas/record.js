import { put, call, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  requestSuccess,
  requestPending,
  requestFailed,
} from "../../utils/helpers/request";
import { http } from "../../utils/helpers/http";
import { GET_RECORDS } from "../actionTypes";

export function* addRecordSaga(action) {
  try {
    const state = yield select();
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
    yield put({
      type: GET_RECORDS,
      payload: { order: "desc", ...state.record.pageInfo },
    });
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed("ADD_RECORD") });
  }
}

export function* editRecordSaga(action) {
  try {
    const state = yield select();
    yield put({ type: requestPending("EDIT_RECORD") });
    yield call(
      http,
      `/records/${action.payload.id}/`,
      "PUT",
      {
        ...action.payload,
      },
      true
    );
    yield put({ type: requestSuccess("EDIT_RECORD") });
    yield put({
      type: GET_RECORDS,
      payload: state.record.pageInfo,
    });
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed("EDIT_RECORD") });
  }
}

export function* deleteRecordSaga(action) {
  try {
    const state = yield select();
    yield put({ type: requestPending("DELETE_RECORD") });
    yield call(
      http,
      `/records/${action.payload.id}/`,
      "DELETE",
      {
        ...action.payload,
      },
      true
    );
    yield put({ type: requestSuccess("DELETE_RECORD") });
    yield put({
      type: GET_RECORDS,
      payload: state.record.pageInfo,
    });
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed("DELETE_RECORD") });
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
