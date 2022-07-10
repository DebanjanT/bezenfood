import axios from "axios";

import { BASE_API_URL } from "../../Variables/Urls";
const axiosjwt = axios.create({
  baseURL: BASE_API_URL,
});

axiosjwt.interceptors.request.use(function (config) {
  let user = localStorage.getItem("bezenuser");
  config.headers["Authorization"] = `Bearer ${
    JSON.parse(user).data.accessToken
  }`;

  return config;
});

export default axiosjwt;
