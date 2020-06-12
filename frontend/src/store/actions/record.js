import { ADD_RECORD } from "../actionTypes";

export const addRecord = (payload) => {
  console.log("---------------------");
  return { type: ADD_RECORD, payload };
};
