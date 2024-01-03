import {
  GET_INVOICES,
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  GET_INVOICE_DETAIL,
  GET_INVOICE_DETAIL_FAIL,
  GET_INVOICE_DETAIL_SUCCESS,
  ADD_INVOICE,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_FAIL,
  ADD_FILES,
  ADD_FILES_SUCCESS,
  ADD_FILES_FAIL

} from "./actionTypes"

export const getInvoices = () => ({
  type: GET_INVOICES,
})

export const getInvoicesSuccess = invoices => ({
  type: GET_INVOICES_SUCCESS,
  payload: invoices,
})

export const getInvoicesFail = error => ({
  type: GET_INVOICES_FAIL,
  payload: error,
})

export const getInvoiceDetail = invoiceId => ({
  type: GET_INVOICE_DETAIL,
  invoiceId,
})

export const getInvoiceDetailSuccess = invoices => ({
  type: GET_INVOICE_DETAIL_SUCCESS,
  payload: invoices,
})

export const getInvoiceDetailFail = error => ({
  type: GET_INVOICE_DETAIL_FAIL,
  payload: error,
})



export const addInvoiceBill = payload => ({
  type: ADD_INVOICE,
  payload: payload[0],
})

export const addInvoiceBillSuccess = invoices => ({
  type: ADD_INVOICE_SUCCESS,
  payload: invoices,
})

export const addInvoiceBillFail = error => ({
  type: ADD_INVOICE_FAIL,
  payload: error,
})

export const addFiles = payload => ({
  type: ADD_FILES,
  payload: payload[0],
})

export const addFilesSuccess = invoices => ({
  type: ADD_FILES_SUCCESS,
  payload: invoices,
})

export const addFilesFail = error => ({
  type: ADD_FILES_FAIL,
  payload: error,
})
