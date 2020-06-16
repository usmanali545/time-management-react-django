import {
  ADD_RECORD,
  GET_RECORDS,
  EDIT_RECORD,
  DELETE_RECORD,
  SAVE_RECORD_PAGE_INFO,
  ADD_OWN_RECORD,
  GET_OWN_RECORDS,
  EDIT_OWN_RECORD,
  DELETE_OWN_RECORD,
  SAVE_OWN_RECORD_PAGE_INFO,
} from "../actionTypes";

export const addRecord = (payload) => {
  return { type: ADD_RECORD, payload };
};

export const editRecord = (payload) => {
  return { type: EDIT_RECORD, payload };
};

export const deleteRecord = (payload) => {
  return { type: DELETE_RECORD, payload };
};

export const getRecords = (payload) => {
  return { type: GET_RECORDS, payload };
};

export const saveRecordPageInfo = (payload) => {
  return { type: SAVE_RECORD_PAGE_INFO, payload };
};

export const addOwnRecord = (payload) => {
  return { type: ADD_OWN_RECORD, payload };
};

export const editOwnRecord = (payload) => {
  return { type: EDIT_OWN_RECORD, payload };
};

export const deleteOwnRecord = (payload) => {
  return { type: DELETE_OWN_RECORD, payload };
};

export const getOwnRecords = (payload) => {
  return { type: GET_OWN_RECORDS, payload };
};

export const saveOwnRecordPageInfo = (payload) => {
  return { type: SAVE_OWN_RECORD_PAGE_INFO, payload };
};
