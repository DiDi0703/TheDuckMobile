import axios from "axios";

var qs = require("qs");
const axiosInstance = axios.create({
  baseURL: "https://localhost:7008/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export const updateToken = (token) => {
  axiosInstance.defaults.headers["Authorization"] = "Bearer " + token;
};

const handleRequest = async (requestMethod, url, data, headers, params) => {
  const result = {
    success: false,
    data: null,
    error: null,
  };

  try {
    let response = null;
    if (requestMethod === axiosInstance.get)
      response = await requestMethod(url, {
        headers: headers,
        params: params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
    else
      response = await requestMethod(url, data, {
        headers: headers,
        params: params,
      });

    result.success = true;
    result.data = response.data;
  } catch (error) {
    result.error = error.message;
    if (error.response) {
      result.error = error.response.data.message;
    }
  }

  return result;
};

export const get = async (url, params, headers) => {
  return handleRequest(axiosInstance.get, url, null, headers, params);
};

export const post = async (url, data, headers) => {
  return handleRequest(axiosInstance.post, url, data, headers, null);
};

export const put = async (url, data, headers) => {
  return handleRequest(axiosInstance.put, url, data, headers, null);
};

export const del = async (url, params, headers) => {
  return handleRequest(axiosInstance.delete, url, null, headers, params);
};

export default axiosInstance;
