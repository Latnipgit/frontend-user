import {
    GET_DEBTORS,
    GET_DEBTORS_FAIL,
    GET_DEBTORS_SUCCESS,
    GET_INVOICE_LIST,
    GET_INVOICE_LIST_SUCCESS,
    GET_INVOICE_LIST_FAIL
  } from "./debtors.actiontype"
  

  
  const INIT_STATE = {
    debtors: [],
    getInvoiceList: [],
    error: {},
  }
  
  export const DebtorsReducer = (state = INIT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
      case GET_DEBTORS_SUCCESS:
        return { ...state, debtors: payload,}
      case GET_DEBTORS_FAIL:
        return { ...state, error: payload,}
      case GET_INVOICE_LIST_SUCCESS:
        return { ...state, getInvoiceList: payload, }
      case GET_INVOICE_LIST_FAIL:
        return { ...state, error: payload,}
      default:
        return state
    }
  }
  