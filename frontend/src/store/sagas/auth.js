import { put, call } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  requestSuccess,
  requestPending,
  requestFailed,
} from "../../utils/helpers/request";
import { http } from "../../utils/helpers/http";

export function* signupSaga(action) {
  try {
    yield put({ type: requestPending("SIGN_UP") });
    yield call(
      http,
      "/signup/",
      "POST",
      {
        ...action.payload,
      },
      false
    );
    yield put({ type: requestSuccess("SIGN_UP") });
    yield put(push("/signin"));
  } catch (error) {
    yield put({ type: requestFailed("SIGN_UP"), payload: error.response });
  }
}

export function* signinSaga(action) {
  try {
    yield put({ type: requestPending("SIGN_IN") });
    const response = yield call(
      http,
      "/signin/",
      "POST",
      {
        ...action.payload,
      },
      false
    );
    yield put({ type: requestSuccess("SIGN_IN") });
    const { token } = response.data;
    window.localStorage.setItem("working_hour_auth_token", token);
    yield put({ type: "SET_USER_INFO", payload: response.data });
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed("SIGN_IN") });
  }
}

export function* signoutSaga(action) {
  yield put({ type: "REMOVE_USER" });
  window.localStorage.removeItem("working_hour_auth_token");
  yield put(push("/"));
}
