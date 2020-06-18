import {
  requestPending,
  requestSuccess,
  requestFailed,
} from "../../utils/helpers/request";
import { formatDate } from "../../utils/helpers/helper";

import {
  SAVE_RECORD_PAGE_INFO,
  SAVE_OWN_RECORD_PAGE_INFO,
} from "../actionTypes";

const initialState = {
  ownRecords: null,
  records: null,
  loading: false,
  status: "INIT",
  ownRecordPageInfo: {
    order: "desc",
    orderBy: "added",
    page: 0,
    rowsPerPage: 5,
    from: formatDate(new Date()),
    to: formatDate(new Date()),
  },
  recordPageInfo: {
    order: "desc",
    orderBy: "added",
    page: 0,
    rowsPerPage: 5,
    from: formatDate(new Date()),
    to: formatDate(new Date()),
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
        loading: false,
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
        loading: false,
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
        loading: false,
        status: requestFailed("GET_RECORDS"),
        error: action.payload,
      };
    case SAVE_RECORD_PAGE_INFO:
      return {
        ...state,
        recordPageInfo: action.payload,
      };
    case requestPending("ADD_OWN_RECORD"):
      return {
        ...state,
        loading: true,
        status: requestPending("ADD_OWN_RECORD"),
      };
    case requestSuccess("ADD_OWN_RECORD"):
      return {
        ...state,
        loading: false,
        status: requestSuccess("ADD_OWN_RECORD"),
      };
    case requestFailed("ADD_OWN_RECORD"):
      return {
        ...state,
        loading: false,
        status: requestFailed("ADD_OWN_RECORD"),
        error: action.payload,
      };
    case requestPending("EDIT_OWN_RECORD"):
      return {
        ...state,
        loading: true,
        status: requestPending("EDIT_OWN_RECORD"),
      };
    case requestSuccess("EDIT_OWN_RECORD"):
      return {
        ...state,
        loading: false,
        status: requestSuccess("EDIT_OWN_RECORD"),
      };
    case requestFailed("EDIT_OWN_RECORD"):
      return {
        ...state,
        loading: false,
        status: requestFailed("EDIT_OWN_RECORD"),
        error: action.payload,
      };
    case requestPending("GET_OWN_RECORDS"):
      return {
        ...state,
        loading: true,
        status: requestPending("GET_OWN_RECORDS"),
      };
    case requestSuccess("GET_OWN_RECORDS"):
      return {
        ...state,
        ownRecords: action.payload,
        loading: false,
        status: requestSuccess("GET_OWN_RECORDS"),
      };
    case requestFailed("GET_OWN_RECORDS"):
      return {
        ...state,
        loading: false,
        status: requestFailed("GET_OWN_RECORDS"),
        error: action.payload,
      };
    case requestPending("SET_WORKING_HOUR"):
      return {
        ...state,
        loading: true,
        status: requestPending("SET_WORKING_HOUR"),
      };
    case requestSuccess("SET_WORKING_HOUR"):
      return {
        ...state,
        loading: false,
        status: requestSuccess("SET_WORKING_HOUR"),
      };
    case requestFailed("SET_WORKING_HOUR"):
      return {
        ...state,
        loading: false,
        status: requestFailed("SET_WORKING_HOUR"),
        error: action.payload,
      };
    case requestPending("EXPORT_OWN_RECORDS"):
      return {
        ...state,
        loading: true,
        status: requestPending("EXPORT_OWN_RECORDS"),
      };
    case requestSuccess("EXPORT_OWN_RECORDS"):
      return {
        ...state,
        loading: false,
        status: requestSuccess("EXPORT_OWN_RECORDS"),
      };
    case requestFailed("EXPORT_OWN_RECORDS"):
      return {
        ...state,
        loading: false,
        status: requestFailed("EXPORT_OWN_RECORDS"),
        error: action.payload,
      };
    case SAVE_OWN_RECORD_PAGE_INFO:
      return {
        ...state,
        ownRecordPageInfo: action.payload,
      };
    default:
      return state;
  }
};
