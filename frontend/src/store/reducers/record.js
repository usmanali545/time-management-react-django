import {
  requestPending,
  requestSuccess,
  requestFailed,
} from "../../utils/helpers/request";

const initialState = {
  records: null,
};

export const recordReducer = function (state = initialState, action) {
  switch (action.type) {
    case requestPending("ADD_RECORD"):
      return {
        ...state,
        status: requestPending("ADD_RECORD"),
      };
    case requestSuccess("ADD_RECORD"):
      return {
        ...state,
        status: requestSuccess("ADD_RECORD"),
      };
    case requestFailed("ADD_RECORD"):
      return {
        ...state,
        status: requestFailed("ADD_RECORD"),
        error: action.payload,
      };
    default:
      return state;
  }
};
