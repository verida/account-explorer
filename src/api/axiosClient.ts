import axios from "axios";

const { VUE_APP_API_BASE_URL } = process.env;

console.log(VUE_APP_API_BASE_URL);

const axiosClient = axios.create({
  baseURL: VUE_APP_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const res = error.response;
    if (res.status == 401) {
      window.location.href = "https://example.com/login";
    }
    console.error("Looks like there was a problem.Status Code: “ + res.status");
    return Promise.reject(error);
  }
);

export default axiosClient;
