/* INVOICES */
import {
    GET_EMPLOYEE,
    GET_EMPLOYEE_LIST_SUCCESS,
    GET_EMPLOYEE_LIST_FAIL,
 
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
  