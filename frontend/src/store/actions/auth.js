import { SIGN_UP, SIGN_IN, SIGN_OUT } from "../actionTypes";

export const signup = (payload) => {
  return { type: SIGN_UP, payload };
};

export const signin = (payload) => {
  return { type: SIGN_IN, payload };
};

export const signout = () => {
  return { type: SIGN_OUT };
};
