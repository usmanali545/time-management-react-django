import axios from "axios";

export const http = (
  url,
  method = "GET",
  body = null,
  hasToken = true,
  params = {}
) => {
  const token = window.localStorage.getItem("workinghour_auth_token");
  let headers = {
    Accept: "application/json",
    "Contect-Type": "application/json",
  };

  if (hasToken) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  console.log("==== env", process.env.REACT_APP_SERVER_URL);
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
  return axios.request({
    headers,
    url,
    method,
    data: body,
    params,
  });
};
