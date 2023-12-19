import {
    GET_DEBTORS,
    GET_DEBTORS_FAIL,
    GET_DEBTORS_SUCCESS,
    GET_INVOICE_LIST,
    GET_INVOICE_LIST_FAIL,
    GET_INVOICE_LIST_SUCCESS
   
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
  
  export const getAllInvoice = () => ({
    type: GET_INVOICE_LIST,
  })
  
  export const getAllInvoiceSuccess = data => ({
    type: GET_INVOICE_LIST_SUCCESS,
    payload: data,
  })
  
  export const getAllInvoiceFail = error => ({
    type: GET_INVOICE_LIST_FAIL,
    payload: error,
  })
  