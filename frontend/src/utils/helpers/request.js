export const requestPending = (actionType) => {
  return `${actionType}_PENDING`;
};

export const requestSuccess = (actionType) => {
  return `${actionType}_SUCCESS`;
};

export const requestFailed = (actionType) => {
  return `${actionType}_FAILED`;
};
