import {
  ADD_USER,
  GET_USERS,
  GET_TOTAL_USERS,
  EDIT_USER,
  DELETE_USER,
  SAVE_USERS_PAGE_INFO,
} from "../actionTypes";

export const addUser = (payload) => {
  return { type: ADD_USER, payload };
};

export const editUser = (payload) => {
  return { type: EDIT_USER, payload };
};

export const deleteUser = (payload) => {
  return { type: DELETE_USER, payload };
};

export const getUsers = (payload) => {
  return { type: GET_USERS, payload };
};

export const getTotalUsers = () => {
  return { type: GET_TOTAL_USERS };
};

export const saveUsersPageInfo = (payload) => {
  return { type: SAVE_USERS_PAGE_INFO, payload };
};
