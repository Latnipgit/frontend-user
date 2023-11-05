/* INVOICES */
import {
    GET_EMPLOYEE,
    GET_EMPLOYEE_LIST_SUCCESS,
    GET_EMPLOYEE_LIST_FAIL,
    ADD_NEW_EMPLOYEE_SUCCESS,
    ADD_NEW_EMPLOYEE,
    ADD_NEW_EMPLOYEE_FAIL
 
  } from "./actionTypes"
  
 export const getEmployeeLIst = () => ({
  
    type: GET_EMPLOYEE,
    
  })
  
  export const getEmployeeLIstSuccess = invoices => ({
    type: GET_EMPLOYEE_LIST_SUCCESS,
    payload: invoices,
  })
  
  export const getEmployeeLIstFail = error => ({
    type: GET_EMPLOYEE_LIST_FAIL,
    payload: error,
  })
  

  export const addNewEmployeelist = (user) => {
    debugger
    console.log("USER++",user)
    return {
      type: "ADD_NEW_EMPLOYEE",
      payload:user[0],
    }
  }
  
  export const addNewEmployeeSuccess = (user) => {
     console.log("user1111",user)
    return {
      type: ADD_NEW_EMPLOYEE_SUCCESS,
      payload: { user },
    }
  }
  
  export const addNewEmployeeFail = (user) => {
    console.log("user1111",user)

    return {
      type: ADD_NEW_EMPLOYEE_FAIL,
      payload: { user, history },
    }
  }
