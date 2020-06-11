import { put, call } from "redux-saga/effects";
import { push } from "connected-react-router";
import { requestPending, requestFailed } from "../../utils/helpers/request";
import { http } from "../../utils/helpers/http";
import { requestSuccess } from "../../utils/helpers/request";

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
    
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed("SIGN_IN") });
  }
}
