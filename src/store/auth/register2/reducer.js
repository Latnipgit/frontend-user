import {
    REGISTER2_LOGIN_USER,
    REGISTER2_LOGIN_SUCCESS,
    REGISTER2_LOGIN_FAIL,
  } from "./actionTypes"
  
  const initialState = {
    error: "",
    loading: false,
    apiResponse:undefined
  }
  
  const register_login_reducer = (state = initialState, action) => {
      console.log("action",action.payload)
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
          apiResponse:true
        }
        break
        case REGISTER2_LOGIN_FAIL:
        state = {
          ...state,
          loading: true,
          apiResponse:false

        }
        break
      default:
        state = { ...state }
        break
    }
    return state
  }
  
  export default register_login_reducer
  