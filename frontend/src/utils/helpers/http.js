import axios from "axios";

export const http = (
  url,
  method = "GET",
  body = null,
  hasToken = true,
  params = {}
) => {
  const token = window.localStorage.getItem("working_hour_auth_token");
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (hasToken) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
  return axios.request({
    headers,
    url,
    method,
    data: body,
    params,
  });
};
