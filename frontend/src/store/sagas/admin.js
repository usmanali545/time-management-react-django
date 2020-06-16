import { put, call, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  requestSuccess,
  requestPending,
  requestFailed,
} from "../../utils/helpers/request";
import { http } from "../../utils/helpers/http";
import { GET_USERS } from "../actionTypes";

export function* addUserSaga(action) {
  try {
    const state = yield select();
    yield put({ type: requestPending("ADD_USER") });
    yield call(
      http,
      "/users/",
      "POST",
      {
        ...action.payload,
      },
      true
    );
    yield put({ type: requestSuccess("ADD_USER") });
    yield put({
      type: GET_USERS,
      payload: { order: "desc", ...state.admin.usersPageInfo },
    });
    yield put(push("/users"));
  } catch (error) {
    yield put({ type: requestFailed("ADD_USER") });
  }
}

export function* editUserSaga(action) {
  try {
    const state = yield select();
    yield put({ type: requestPending("EDIT_USER") });
    yield call(
      http,
      `/users/${action.payload.id}/`,
      "PATCH",
      {
        ...action.payload,
      },
      true
    );
    yield put({ type: requestSuccess("EDIT_USER") });
    yield put({
      type: GET_USERS,
      payload: state.admin.usersPageInfo,
    });
    yield put(push("/users"));
  } catch (error) {
    yield put({ type: requestFailed("EDIT_USER") });
  }
}

export function* deleteUserSaga(action) {
  try {
    const state = yield select();
    yield put({ type: requestPending("DELETE_USER") });
    yield call(
      http,
      `/users/${action.payload.id}/`,
      "DELETE",
      {
        ...action.payload,
      },
      true
    );
    yield put({ type: requestSuccess("DELETE_USER") });
    yield put({
      type: GET_USERS,
      payload: state.admin.usersPageInfo,
    });
    yield put(push("/users"));
  } catch (error) {
    yield put({ type: requestFailed("DELETE_USER") });
  }
}

export function* getUsersSaga(action) {
  try {
    yield put({ type: requestPending("GET_USERS") });
    const response = yield call(
      http,
      "/users/",
      "GET",
      {},
      true,
      action.payload
    );
    yield put({ type: requestSuccess("GET_USERS"), payload: response.data });
    yield put(push("/users"));
  } catch (error) {
    yield put({ type: requestFailed("GET_USERS") });
  }
}

export function* getTotalUsersSaga(action) {
  try {
    yield put({ type: requestPending("GET_TOTAL_USERS") });
    const response = yield call(http, "/users/", "GET", {}, true);
    yield put({
      type: requestSuccess("GET_TOTAL_USERS"),
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: requestFailed("GET_TOTAL_USERS") });
  }
}
