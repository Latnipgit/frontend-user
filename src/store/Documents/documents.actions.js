import {
  GET_GENERAL_DOCUMENTS,
  GET_GENERAL_DOCUMENTS_FAIL,
  GET_GENERAL_DOCUMENTS_SUCCESS,

} from "./documents.actionTypes"

export const getGeneralDoucments = () => ({
  type: GET_GENERAL_DOCUMENTS,
})

export const getGeneralDoucmentsSuccess = invoices => ({
  type: GET_GENERAL_DOCUMENTS_SUCCESS,
  payload: invoices,
})

export const getGeneralDoucmentsFail = error => ({
  type: GET_GENERAL_DOCUMENTS_FAIL,
  payload: error,
})

