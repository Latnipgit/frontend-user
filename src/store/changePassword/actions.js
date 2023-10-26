/* INVOICES */
// import { ADD_NEW_EMPLOYEE, ADD_NEW_EMPLOYEE_SUCCESS } from "store/Employee/actionTypes"
import {
  CHANGE_FIRST_PASSWORD_SUCCESS,
  CHANGE_FIRST_PASSWORD,
  CHANGE_FIRST_PASSWORD_FAIL
  } from "./actionTypes"
  


  export const changeFirstPassword = (user, history) => {
    
    return {
      type: CHANGE_FIRST_PASSWORD,
      payload: user,
    }
  }
  
  export const changeFirstPasswordSucess = user => {
     
    return {
      type: CHANGE_FIRST_PASSWORD_SUCCESS,
      payload: user,
    }
    
  }
  export const changePasswordFail = user => {
     
    return {
      type: CHANGE_FIRST_PASSWORD_FAIL,
      // payload: user,
    }
  
  }