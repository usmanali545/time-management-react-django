import { all, takeEvery } from "redux-saga/effects";

import { SIGN_IN, SIGN_UP } from "../actionTypes";

import { signupSaga, signinSaga } from "./auth";

export default function* rootSaga() {
  yield all([takeEvery(SIGN_UP, signupSaga)]);
  yield all([takeEvery(SIGN_IN, signinSaga)]);
}
