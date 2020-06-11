import { SIGN_UP, SIGN_IN } from "../actionTypes";

export const signup = (payload) => {
  return { type: SIGN_UP, payload };
};

export const signin = (payload) => {
  return { type: SIGN_IN, payload };
};
