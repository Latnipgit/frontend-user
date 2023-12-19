import {
    GET_DEBTORS,
    GET_DEBTORS_FAIL,
    GET_DEBTORS_SUCCESS,
    GET_INVOICE_LIST,
    GET_INVOICE_LIST_FAIL,
    GET_INVOICE_LIST_SUCCESS
  } from "./actiontype"

  import { createAction } from "store/utils/reducer/reducer.utils";
  
  export const getAllDebtors = () => createAction(GET_DEBTORS)

  export const getAllDebtorsSuccess = (data) => createAction(GET_DEBTORS_SUCCESS , data)
  
  
  export const getAllDebtorsFail = (error) => createAction(GET_DEBTORS_FAIL,  error)
  
  export const getAllInvoice = () => createAction(GET_INVOICE_LIST) 
  
  export const getAllInvoiceSuccess = (data) => createAction(GET_INVOICE_LIST_SUCCESS, data)
  
  export const getAllInvoiceFail = error => createAction(GET_INVOICE_LIST_FAIL, error)
  