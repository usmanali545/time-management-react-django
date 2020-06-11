import { all, takeEvery } from "redux-saga/effects";

import { SIGN_IN, SIGN_UP, SIGN_OUT } from "../actionTypes";

import { signupSaga, signinSaga, signoutSaga } from "./auth";

export default function* rootSaga() {
  yield all([
    takeEvery(SIGN_UP, signupSaga),
    takeEvery(SIGN_IN, signinSaga),
    takeEvery(SIGN_OUT, signoutSaga),
  ]);
}
