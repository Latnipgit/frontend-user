import {
    GET_DEBTORS,
    GET_DEBTORS_FAIL,
    GET_DEBTORS_SUCCESS,
   
  } from "./actiontype"
  
  export const getAllDebtors = () => ({
    type: GET_DEBTORS,
  })
  
  export const getAllDebtorsSuccess = data => ({
    type: GET_DEBTORS_SUCCESS,
    payload: data,
  })
  
  export const getAllDebtorsFail = error => ({
    type: GET_DEBTORS_FAIL,
    payload: error,
  })
  
