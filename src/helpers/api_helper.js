import axios from "axios";
// import accessToken from "./jwt-token-access/accessToken";

//pass new generated access token here
// const token = accessToken;

//apply base url for axios
const API_URL = "https://bafana-backend.azurewebsites.net";

const axiosApi = axios.create({
  baseURL: API_URL,
  // withCredentials:true
});

// axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config = {}) {


  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}

export async function getwithToken(url, config = {}) {

  const token = JSON.parse(localStorage.getItem("authUser")).token
  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };

  return await axiosApi
    .get(url, { ...config, headers })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}


export async function getAfter(url, config = {}) {

  const token = localStorage.getItem("tokenemployeeRegister")
  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };

  return await axiosApi
    .get(url, { ...config, headers })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}

export async function getMethodResponse(url, data, config = {}) {

  console.log("urururur", url, data)
  const token = localStorage.getItem("tokenemployeeRegister")
  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };
  return axiosApi
    .get(url, { ...config, headers }, data)
    .then((response) => {

      return response
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}

export async function post(url, data, config = {}) {

  // console.log("UJUJU", JSON.parse(localStorage.getItem("authUser")).token)
  const token = JSON.parse(localStorage.getItem("authUser")) != null ? JSON.parse(localStorage.getItem("authUser")).token : '';
  // console.log("HAHAHA", token)

  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };
  return axiosApi
    .post(url, { ...data }, { ...config, headers })
    .then((response) => response)
    .catch((error) => {
      if (error.response) {
        // console.log("Server responded with an error:", error.response);
        window.alert(error.response.data.message)
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}



export async function put(url, data, config = {}) {


  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}


export async function addEmployeeAPImethod(url, data, config = {}) {
  console.log("urururur", url, data)
  const token = localStorage.getItem("tokenemployeeRegister")
  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };
  return axiosApi
    .post(url, { ...data }, { ...config, headers })
    .then((response) => response)
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}



export async function forgetPasswordAPI(url, data, config = {}) {
  console.log("APIII", url, data)
  const payload = {
    "emailId": data
  }

  return axiosApi
    .post(url, payload)
    .then((response) => response)
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}