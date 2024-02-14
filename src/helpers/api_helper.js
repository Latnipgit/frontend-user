import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import store from 'store';
import { logoutUser } from 'store/actions';

const API_URL = 'https://bafana-backend.azurewebsites.net';

const axiosApi = axios.create({
  baseURL: API_URL,
});

const axiosPrivate = axios.create({
  baseURL: API_URL,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('tokenemployeeRegister');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = sessionStorage.getItem('refreshToken');
          const response = await axiosApi.post('/api/user/refreshToken', {
            refreshToken,
          });
          const token = response.data.response.token;
          sessionStorage.setItem('tokenemployeeRegister', token);
          // Retry the original request with the new token
          originalRequest.headers['x-access-token'] = token;
          return axiosPrivate(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          window.location.href = "/login"
          sessionStorage.clear()
        }
      } else {
        window.location.href = "/login"
        sessionStorage.clear()
      }
    }
    return Promise.reject(error);
  }
);


export async function get(url, config = {}) {
  return await axiosPrivate
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

  const token = JSON.parse(sessionStorage.getItem("authUser")).token
  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };

  return await axiosPrivate
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

  const token = sessionStorage.getItem("tokenemployeeRegister")
  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };

  return await axiosPrivate
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
  const token = sessionStorage.getItem("tokenemployeeRegister")
  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };
  return axiosPrivate
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

  // console.log("UJUJU", JSON.parse(sessionStorage.getItem("authUser")).token)
  const token = JSON.parse(sessionStorage.getItem("authUser")) != null ? JSON.parse(sessionStorage.getItem("authUser")).token : '';
  // console.log("HAHAHA", token)

  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };
  return axiosPrivate
    .post(url, { ...data }, { ...config, headers })
    .then((response) => response)
    .catch((error) => {
      if (error.response) {
        // console.log("Server responded with an error:", error.response);
        // window.alert(error.response.data.message)
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}

export async function getUser(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, config)
    .then((response) => response)
    .catch((error) => {
      if (error.response) {
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}



export async function put(url, data, config = {}) {


  return axiosPrivate
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
  return await axiosPrivate
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
  console.log("urururur", url)
  const token = sessionStorage.getItem("tokenemployeeRegister")
  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };
  return axiosPrivate
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

  return axiosPrivate
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