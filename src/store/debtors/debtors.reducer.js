import {
    GET_DEBTORS,
    GET_DEBTORS_FAIL,
    GET_DEBTORS_SUCCESS,
    GET_INVOICE_LIST,
    GET_INVOICE_LIST_SUCCESS,
    GET_INVOICE_LIST_FAIL,
    GET_REPORT_DEF_OPEN
  } from "./debtors.actiontype"
  

  
  const INIT_STATE = {
    isReportDefOpen: false,
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
        case GET_REPORT_DEF_OPEN:
          return { ...state, isReportDefOpen: payload,}
      default:
        return state
    }
  }
  