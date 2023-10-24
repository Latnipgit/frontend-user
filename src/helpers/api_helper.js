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

export async function post(url, data, config = {}) {
  
  console.log("UJUJU", JSON.parse(localStorage.getItem("authUser")))
  const token = JSON.parse(localStorage.getItem("authUser"))!= null ? JSON.parse(localStorage.getItem("authUser")).token :'';
  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token :'',
  };  
    return axiosApi
        .post(url, { ...data }, { ...config,headers })
        .then((response) =>response)
        .catch((error) => {
          if (error.response) {
            console.log("Server responded with an error:", error.response.status);
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
    'x-access-token': token != null ? token :'',
  };  
    return axiosApi
        .post(url, { ...data }, { ...config,headers })
        .then((response) =>response)
        .catch((error) => {
          if (error.response) {
            console.log("Server responded with an error:", error.response.status);
          } else if (error.request) {
            console.log("No response received from the server:", error.request);
          }
        });
  }
    