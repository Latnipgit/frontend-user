import {
    GET_DEBTORS,
    GET_DEBTORS_FAIL,
    GET_DEBTORS_SUCCESS,
    GET_INVOICE_LIST,
    GET_INVOICE_LIST_FAIL,
    GET_INVOICE_LIST_SUCCESS,
    GET_REPORT_DEF_OPEN,
    GET_CUSTOMER_FEEDBACK_MODAL_OPEN,
    CONFIRM_REPORT_DEFAULT_MODAL
  } from "./debtors.actiontype"

  import { createAction } from "store/utils/reducer/reducer.utils";
  
  export const getAllDebtors = () => createAction(GET_DEBTORS)

  export const getAllDebtorsSuccess = (data) => createAction(GET_DEBTORS_SUCCESS , data)
  
  export const getAllDebtorsFail = (error) => createAction(GET_DEBTORS_FAIL,  error)
  
  export const getAllInvoice = () => createAction(GET_INVOICE_LIST) 
  
  export const getAllInvoiceSuccess = (data) => createAction(GET_INVOICE_LIST_SUCCESS, data)
  
  export const getAllInvoiceFail = (error) => createAction(GET_INVOICE_LIST_FAIL, error)

  export const setIsReportDefOpen = (boolean) => createAction(GET_REPORT_DEF_OPEN, boolean);
  export const setConfirmReportDefaultModal = (boolean) => createAction(CONFIRM_REPORT_DEFAULT_MODAL, boolean);
  export const setIsCustomerFeedbackModalOpen = (boolean) => createAction(GET_CUSTOMER_FEEDBACK_MODAL_OPEN, boolean);
  