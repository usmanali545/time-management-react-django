import { ADD_RECORD, GET_RECORDS } from "../actionTypes";

export const addRecord = (payload) => {
  return { type: ADD_RECORD, payload };
};

export const getRecords = (payload) => {
  return { type: GET_RECORDS, payload };
};
