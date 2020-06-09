import { put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { requestPending, requestFailed } from "../../utils/helpers/request";

export function* signupSaga(action) {
  try {
    yield put({ type: requestPending("SIGN_UP") });
  } catch (error) {
    yield put({ type: requestFailed("SIGN_UP") });
  }
}

export function* signinSaga(action) {
  try {
    yield put({ type: requestPending("SIGN_IN") });
    yield put(push("/"));
  } catch (error) {
    yield put({ type: requestFailed("SIGN_IN") });
  }
}
