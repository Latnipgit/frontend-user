import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  TOKEN_UPDATE,
} from "./Login.actionTypes"

const initialState = {
  error: "",
  loading: false,
  getUserSuccess: [],
  updatedToken: [],
}

const login = (state = initialState, action) => {

  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        isUserLogout: false,
        getUserSuccess: action.payload
      }
      break
    case TOKEN_UPDATE:
      state = {
        ...state,
        updatedToken: action.payload
      }
      break
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state, isUserLogout: true }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false, isUserLogout: false, }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
