import {
    REGISTER2_LOGIN_USER,
    REGISTER2_LOGIN_SUCCESS,
  } from "./actionTypes"
  
  const initialState = {
    error: "",
    loading: false,
  }
  
  const register_login_reducer = (state = initialState, action) => {
      
    switch (action.type) {
      case REGISTER2_LOGIN_USER:
        state = {
          ...state,
          loading: true,
        }
        break
      case REGISTER2_LOGIN_SUCCESS:
        state = {
          ...state,
          loading: false,
          isUserLogout: false,
        }
        break
      default:
        state = { ...state }
        break
    }
    return state
  }
  
  export default register_login_reducer
  