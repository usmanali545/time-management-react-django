import {
  ADD_RECORD,
  GET_RECORDS,
  EDIT_RECORD,
  SAVE_RECORD_PAGE_INFO,
} from "../actionTypes";

export const addRecord = (payload) => {
  return { type: ADD_RECORD, payload };
};

export const editRecord = (payload) => {
  return { type: EDIT_RECORD, payload };
};

export const getRecords = (payload) => {
  return { type: GET_RECORDS, payload };
};

export const saveRecordPageInfo = (payload) => {
  return { type: SAVE_RECORD_PAGE_INFO, payload };
};
