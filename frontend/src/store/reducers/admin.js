import {
  requestPending,
  requestSuccess,
  requestFailed,
} from "../../utils/helpers/request";

import { SAVE_USERS_PAGE_INFO } from "../actionTypes";

const initialState = {
  records: null,
  loading: false,
  status: "INIT",
  usersPageInfo: {
    order: "desc",
    orderBy: "added",
    page: 0,
    rowsPerPage: 5,
  },
};

export const adminReducer = function (state = initialState, action) {
  switch (action.type) {
    case requestPending("ADD_USER"):
      return {
        ...state,
        loading: true,
        status: requestPending("ADD_USER"),
      };
    case requestSuccess("ADD_USER"):
      return {
        ...state,
        loading: false,
        status: requestSuccess("ADD_USER"),
      };
    case requestFailed("ADD_USER"):
      return {
        ...state,
        loading: true,
        status: requestFailed("ADD_USER"),
        error: action.payload,
      };
    case requestPending("EDIT_USER"):
      return {
        ...state,
        loading: true,
        status: requestPending("EDIT_USER"),
      };
    case requestSuccess("EDIT_USER"):
      return {
        ...state,
        loading: false,
        status: requestSuccess("EDIT_USER"),
      };
    case requestFailed("EDIT_USER"):
      return {
        ...state,
        loading: true,
        status: requestFailed("EDIT_USER"),
        error: action.payload,
      };
    case requestPending("GET_USERS"):
      return {
        ...state,
        loading: true,
        status: requestPending("GET_USERS"),
      };
    case requestSuccess("GET_USERS"):
      return {
        ...state,
        records: action.payload,
        loading: false,
        status: requestSuccess("GET_USERS"),
      };
    case requestFailed("GET_USERS"):
      return {
        ...state,
        loading: true,
        status: requestFailed("GET_USERS"),
        error: action.payload,
      };
    case SAVE_USERS_PAGE_INFO:
      return {
        ...state,
        pageInfo: action.payload,
      };
    default:
      return state;
  }
};
