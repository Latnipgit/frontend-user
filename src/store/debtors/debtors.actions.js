import {
  GET_DEBTORS,
  GET_DEBTORS_FAIL,
  GET_DEBTORS_SUCCESS,
  GET_INVOICE_LIST,
  GET_INVOICE_LIST_FAIL,
  GET_INVOICE_LIST_SUCCESS,
  GET_REPORT_DEF_OPEN,
  GET_CUSTOMER_FEEDBACK_MODAL_OPEN,
  CONFIRM_REPORT_DEFAULT_MODAL,
  GET_REPORT_DEF_PREVIEW,
  UPLOAD_PENDING_FILES,
  GET_CA_CERTIFICATE_FILE,
  ADD_iNVOICE_REPORT_DEBTOR,
  ADD_iNVOICE_REPORT_DEBTOR_FAIL,
  ADD_iNVOICE_REPORT_DEBTOR_SUCCESS,
  ADD_iNVOICE_ARRAY_DEBTORID_FAIL,
  ADD_iNVOICE_ARRAY_DEBTORID_SUCCESS,
  ADD_iNVOICE_ARRAY_DEBTORID,
  ADD_RATING_TO_DEBTOR,
  ADD_RATING_TO_DEBTOR_FAIL,
  ADD_RATING_TO_DEBTOR_SUCCESS
} from "./debtors.actiontype"

import { createAction } from "store/utils/reducer/reducer.utils";

export const getAllDebtors = () => createAction(GET_DEBTORS)

export const getAllDebtorsSuccess = (data) => createAction(GET_DEBTORS_SUCCESS, data)

export const getAllDebtorsFail = (error) => createAction(GET_DEBTORS_FAIL, error)

export const getAllInvoice = () => createAction(GET_INVOICE_LIST)

export const getAllInvoiceSuccess = (data) => createAction(GET_INVOICE_LIST_SUCCESS, data)

export const getAllInvoiceFail = (error) => createAction(GET_INVOICE_LIST_FAIL, error)




export const setIsReportDefOpen = (boolean) => createAction(GET_REPORT_DEF_OPEN, boolean);
export const setConfirmReportDefaultModal = (boolean) => createAction(CONFIRM_REPORT_DEFAULT_MODAL, boolean);
export const setPreviewModalOpen = (boolean) => createAction(GET_REPORT_DEF_PREVIEW, boolean);
export const setIsCustomerFeedbackModalOpen = (boolean) => createAction(GET_CUSTOMER_FEEDBACK_MODAL_OPEN, boolean);
export const setUploadFilesOpen = (boolean) => createAction(UPLOAD_PENDING_FILES, boolean);
export const setCACertificateOpen = (boolean) => createAction(GET_CA_CERTIFICATE_FILE, boolean);


export const addInvoiceReportDebtor = (data) => createAction(ADD_iNVOICE_REPORT_DEBTOR, data[0])
export const addInvoiceReportDebtorSuccess = (data) => createAction(ADD_iNVOICE_REPORT_DEBTOR_SUCCESS, data)
export const addInvoiceReportDebtorFail = (data) => createAction(ADD_iNVOICE_REPORT_DEBTOR_FAIL, error)



export const addInvoiceArray = (data) => createAction(ADD_iNVOICE_ARRAY_DEBTORID, data)
export const addInvoiceArraySuccess = (data) => createAction(ADD_iNVOICE_ARRAY_DEBTORID_SUCCESS, data)
export const addInvoiceArrayFail = (data) => createAction(ADD_iNVOICE_ARRAY_DEBTORID_FAIL, data)


export const addRatingToDebtor = (data) => createAction(ADD_RATING_TO_DEBTOR, data)
export const addRatingToDebtorSuccess = (data) => createAction(ADD_RATING_TO_DEBTOR_SUCCESS, data)
export const addRatingToDebtorFail = (data) => createAction(ADD_RATING_TO_DEBTOR_FAIL, data)