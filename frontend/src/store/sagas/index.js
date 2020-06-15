import { all, takeEvery } from "redux-saga/effects";
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  ADD_RECORD,
  EDIT_RECORD,
  DELETE_RECORD,
  GET_RECORDS,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  GET_USERS,
} from "../actionTypes";
import { signupSaga, signinSaga, signoutSaga } from "./auth";
import {
  addRecordSaga,
  editRecordSaga,
  deleteRecordSaga,
  getRecordsSaga,
} from "./record";

import {
  addUserSaga,
  editUserSaga,
  deleteUserSaga,
  getUsersSaga,
} from "./admin";

export default function* rootSaga() {
  yield all([
    takeEvery(SIGN_UP, signupSaga),
    takeEvery(SIGN_IN, signinSaga),
    takeEvery(SIGN_OUT, signoutSaga),
    takeEvery(ADD_RECORD, addRecordSaga),
    takeEvery(EDIT_RECORD, editRecordSaga),
    takeEvery(DELETE_RECORD, deleteRecordSaga),
    takeEvery(GET_RECORDS, getRecordsSaga),
    takeEvery(ADD_USER, addUserSaga),
    takeEvery(EDIT_USER, editUserSaga),
    takeEvery(DELETE_USER, deleteUserSaga),
    takeEvery(GET_USERS, getUsersSaga),
  ]);
}
