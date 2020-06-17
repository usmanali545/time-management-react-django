import { all, takeEvery } from "redux-saga/effects";
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  ADD_OWN_RECORD,
  EDIT_OWN_RECORD,
  DELETE_OWN_RECORD,
  GET_OWN_RECORDS,
  ADD_RECORD,
  EDIT_RECORD,
  DELETE_RECORD,
  GET_RECORDS,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  GET_USERS,
  GET_TOTAL_USERS,
  SET_WORKING_HOUR,
  EXPORT_OWN_RECORDS,
} from "../actionTypes";
import { signupSaga, signinSaga, signoutSaga } from "./auth";
import {
  addOwnRecordSaga,
  editOwnRecordSaga,
  deleteOwnRecordSaga,
  getOwnRecordsSaga,
  addRecordSaga,
  editRecordSaga,
  deleteRecordSaga,
  getRecordsSaga,
  setWorkingHourSaga,
  exportOwnRecordsSaga,
} from "./record";

import {
  addUserSaga,
  editUserSaga,
  deleteUserSaga,
  getUsersSaga,
  getTotalUsersSaga,
} from "./admin";

export default function* rootSaga() {
  yield all([
    takeEvery(SIGN_UP, signupSaga),
    takeEvery(SIGN_IN, signinSaga),
    takeEvery(SIGN_OUT, signoutSaga),
    takeEvery(ADD_OWN_RECORD, addOwnRecordSaga),
    takeEvery(EDIT_OWN_RECORD, editOwnRecordSaga),
    takeEvery(DELETE_OWN_RECORD, deleteOwnRecordSaga),
    takeEvery(GET_OWN_RECORDS, getOwnRecordsSaga),
    takeEvery(ADD_RECORD, addRecordSaga),
    takeEvery(EDIT_RECORD, editRecordSaga),
    takeEvery(DELETE_RECORD, deleteRecordSaga),
    takeEvery(GET_RECORDS, getRecordsSaga),
    takeEvery(ADD_USER, addUserSaga),
    takeEvery(EDIT_USER, editUserSaga),
    takeEvery(DELETE_USER, deleteUserSaga),
    takeEvery(GET_USERS, getUsersSaga),
    takeEvery(GET_TOTAL_USERS, getTotalUsersSaga),
    takeEvery(SET_WORKING_HOUR, setWorkingHourSaga),
    takeEvery(EXPORT_OWN_RECORDS, exportOwnRecordsSaga),
  ]);
}
