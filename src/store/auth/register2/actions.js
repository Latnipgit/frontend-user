import {REGISTER2_LOGIN_USER,REGISTER2_LOGIN_SUCCESS
,REGISTER2_LOGIN_FAIL
} from "./actionTypes"
  
  export const registerUser_login = (user, history) => {
    return {
      type: REGISTER2_LOGIN_USER,
      payload: { user, history },
    }
  }
  
  export const registerSuccess_login = (user, history) => {
     
    return {
      type: REGISTER2_LOGIN_SUCCESS,
      payload: { user, history },
    }
  }
  
  export const registerFail_login = (user) => {
     
    return {
      type: REGISTER2_LOGIN_FAIL,
      payload: { user },
    }
  }


 
  