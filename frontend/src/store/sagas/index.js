import { all, takeEvery } from "redux-saga/effects";
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  ADD_RECORD,
  EDIT_RECORD,
  GET_RECORDS,
} from "../actionTypes";
import { signupSaga, signinSaga, signoutSaga } from "./auth";
import { addRecordSaga, editRecordSaga, getRecordsSaga } from "./record";

export default function* rootSaga() {
  yield all([
    takeEvery(SIGN_UP, signupSaga),
    takeEvery(SIGN_IN, signinSaga),
    takeEvery(SIGN_OUT, signoutSaga),
    takeEvery(ADD_RECORD, addRecordSaga),
    takeEvery(EDIT_RECORD, editRecordSaga),
    takeEvery(GET_RECORDS, getRecordsSaga),
  ]);
}
