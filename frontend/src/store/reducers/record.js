import {
  requestPending,
  requestSuccess,
  requestFailed,
} from "../../utils/helpers/request";

import { SAVE_RECORD_PAGE_INFO } from "../actionTypes";

const initialState = {
  records: null,
  loading: false,
  status: "INIT",
  pageInfo: {
    order: "desc",
    orderBy: "added",
    page: 0,
    rowsPerPage: 5,
  },
};

export const recordReducer = function (state = initialState, action) {
  switch (action.type) {
    case requestPending("ADD_RECORD"):
      return {
        ...state,
        loading: true,
        status: requestPending("ADD_RECORD"),
      };
    case requestSuccess("ADD_RECORD"):
      return {
        ...state,
        loading: false,
        status: requestSuccess("ADD_RECORD"),
      };
    case requestFailed("ADD_RECORD"):
      return {
        ...state,
        loading: true,
        status: requestFailed("ADD_RECORD"),
        error: action.payload,
      };
    case requestPending("EDIT_RECORD"):
      return {
        ...state,
        loading: true,
        status: requestPending("EDIT_RECORD"),
      };
    case requestSuccess("EDIT_RECORD"):
      return {
        ...state,
        loading: false,
        status: requestSuccess("EDIT_RECORD"),
      };
    case requestFailed("EDIT_RECORD"):
      return {
        ...state,
        loading: true,
        status: requestFailed("EDIT_RECORD"),
        error: action.payload,
      };
    case requestPending("GET_RECORDS"):
      return {
        ...state,
        loading: true,
        status: requestPending("GET_RECORDS"),
      };
    case requestSuccess("GET_RECORDS"):
      return {
        ...state,
        records: action.payload,
        loading: false,
        status: requestSuccess("GET_RECORDS"),
      };
    case requestFailed("GET_RECORDS"):
      return {
        ...state,
        loading: true,
        status: requestFailed("GET_RECORDS"),
        error: action.payload,
      };
    case SAVE_RECORD_PAGE_INFO:
      return {
        ...state,
        pageInfo: action.payload,
      };
    default:
      return state;
  }
};
