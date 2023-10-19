/* INVOICES */
import {
    GET_COMPANY,
    GET_COMPANY_LIST_SUCCESS,
    GET_COMPANY_LIST_FAIL,
 
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
  