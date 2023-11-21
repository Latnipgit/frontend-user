import {
    GET_DEBTORS,
    GET_DEBTORS_FAIL,
    GET_DEBTORS_SUCCESS,
    GET_INVOICE_LIST,
    GET_INVOICE_LIST_SUCCESS,
    GET_INVOICE_LIST_FAIL
  } from "./actiontype"
  
  const INIT_STATE = {
    debtors: [],
    getInvoiceList: [],
    error: {},
  }
  
  const DebtorsReducer = (state = INIT_STATE, action) => {
    //  
    switch (action.type) {
      case GET_DEBTORS_SUCCESS:
        return {
          ...state,
          debtors: action.payload,
        }
  
      case GET_DEBTORS_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
     
        case GET_INVOICE_LIST_SUCCESS:
          return {
            ...state,
            getInvoiceList: action.payload,
          }
    
        case GET_INVOICE_LIST_FAIL:
          return {
            ...state,
            error: action.payload,
          }
    
      default:
        return state
    }
  }
  
  export default DebtorsReducer
  