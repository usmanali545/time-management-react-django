import { put, call, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  requestSuccess,
  requestPending,
  requestFailed,
} from "../../utils/helpers/request";
import { http } from "../../utils/helpers/http";
import { GET_RECORDS, GET_OWN_RECORDS } from "../actionTypes";

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
    yield put(push("/records"));
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
      "PATCH",
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
    yield put(push("/records"));
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
    yield put(push("/records"));
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
    yield put(push("/records"));
  } catch (error) {
    yield put({ type: requestFailed("GET_RECORDS") });
  }
}

export function* addOwnRecordSaga(action) {
  try {
    const state = yield select();
    yield put({ type: requestPending("ADD_OWN_RECORD") });
    yield call(
      http,
      "/own/",
      "POST",
      {
        ...action.payload,
      },
      true
    );
    yield put({ type: requestSuccess("ADD_OWN_RECORD") });
    yield put({
      type: GET_OWN_RECORDS,
      payload: { order: "desc", ...state.record.pageInfo },
    });
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed("ADD_OWN_RECORD") });
  }
}

export function* editOwnRecordSaga(action) {
  try {
    const state = yield select();
    yield put({ type: requestPending("EDIT_OWN_RECORD") });
    yield call(
      http,
      `/own/${action.payload.id}/`,
      "PUT",
      {
        ...action.payload,
      },
      true
    );
    yield put({ type: requestSuccess("EDIT_OWN_RECORD") });
    yield put({
      type: GET_OWN_RECORDS,
      payload: state.record.pageInfo,
    });
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed("EDIT_OWN_RECORD") });
  }
}

export function* deleteOwnRecordSaga(action) {
  try {
    const state = yield select();
    yield put({ type: requestPending("DELETE_OWN_RECORD") });
    yield call(
      http,
      `/own/${action.payload.id}/`,
      "DELETE",
      {
        ...action.payload,
      },
      true
    );
    yield put({ type: requestSuccess("DELETE_OWN_RECORD") });
    yield put({
      type: GET_OWN_RECORDS,
      payload: state.record.pageInfo,
    });
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed("DELETE_OWN_RECORD") });
  }
}

export function* getOwnRecordsSaga(action) {
  try {
    yield put({ type: requestPending("GET_OWN_RECORDS") });
    const response = yield call(http, "/own/", "GET", {}, true, action.payload);
    yield put({
      type: requestSuccess("GET_OWN_RECORDS"),
      payload: response.data,
    });
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed("GET_OWN_RECORDS") });
  }
}

export function* setWorkingHourSaga(action) {
  try {
    const state = yield select();
    yield put({ type: requestPending("SET_WORKING_HOUR") });
    const response = yield call(
      http,
      "/workinghour/",
      "PUT",
      {
        ...action.payload,
      },
      true
    );
    yield put({
      type: "SET_USER_INFO",
      payload: {
        ...state.auth.me,
        working_hour: response.data.working_hour,
      },
    });
    yield put({
      type: requestSuccess("SET_WORKING_HOUR"),
    });
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed("SET_WORKING_HOUR") });
  }
}
