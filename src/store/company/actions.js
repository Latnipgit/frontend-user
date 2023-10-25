/* INVOICES */
// import { ADD_NEW_EMPLOYEE, ADD_NEW_EMPLOYEE_SUCCESS } from "store/Employee/actionTypes"
import {
    GET_COMPANY,
    GET_COMPANY_LIST_SUCCESS,
    GET_COMPANY_LIST_FAIL,
ADD_NEW_COMPANY,
ADD_NEW_COMPANY_SUCCESS 
  } from "./actionTypes"
  
 export const getCompanyList = () => ({
    type: GET_COMPANY,
  })
  
  export const getCompanyListSuccess = invoices => ({
    type: GET_COMPANY_LIST_SUCCESS,
    payload: invoices,
  })
  
  export const getCompanyListFail = error => ({
    type: GET_COMPANY_LIST_FAIL,
    payload: error,
  })
  

  export const addNewCompany = (user) => {
    
    return {
      type: ADD_NEW_COMPANY,
      payload: user,
    }
  }
  
  export const addNewCompanySuccess = user => {
     
    return {
      type: ADD_NEW_COMPANY_SUCCESS,
      payload: user,
    }
  }
  
