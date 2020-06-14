import {
  requestPending,
  requestSuccess,
  requestFailed,
} from "../../utils/helpers/request";

const initialState = {
  records: null,
  loading: false,
  status: "INIT",
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
    default:
      return state;
  }
};
