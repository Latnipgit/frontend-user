import {
  GET_DEBTORS,
  GET_DEBTORS_FAIL,
  GET_DEBTORS_SUCCESS,
  GET_INVOICE_LIST,
  GET_INVOICE_LIST_SUCCESS,
  GET_INVOICE_LIST_FAIL,
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



const INIT_STATE = {
  isReportDefOpen: false,
  isConfirmReportDefaultModal: false,
  isCustomerFeedbackModalOpen: false,
  isPreviewModalOpen: false,
  isCACACertificateOpen: false,
  uploadPendingFilesModalOpen: false,
  debtors: [],
  getInvoiceList: [],
  error: {},
  addInvoice: [],
  addInvoiceSuccess: [],
  addInvoiceArray: [],
  addInvoiceSuccessArray: [],
  addRating: [],
  addRatingSuccess: []
}

export const DebtorsReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DEBTORS_SUCCESS:
      return { ...state, debtors: payload, }
    case GET_DEBTORS_FAIL:
      return { ...state, error: payload, }
    case GET_INVOICE_LIST_SUCCESS:
      return { ...state, getInvoiceList: payload, }
    case GET_INVOICE_LIST_FAIL:
      return { ...state, error: payload, }
    case GET_REPORT_DEF_OPEN:
      return { ...state, isReportDefOpen: payload, }
    case GET_CUSTOMER_FEEDBACK_MODAL_OPEN:
      return { ...state, isCustomerFeedbackModalOpen: payload, }
    case CONFIRM_REPORT_DEFAULT_MODAL:
      return { ...state, isConfirmReportDefaultModal: payload, }
    case GET_REPORT_DEF_PREVIEW:
      return { ...state, isPreviewModalOpen: payload, }
    case UPLOAD_PENDING_FILES:
      return { ...state, uploadPendingFilesModalOpen: payload, }
    case GET_CA_CERTIFICATE_FILE:
      return { ...state, isCACACertificateOpen: payload, }
    case ADD_iNVOICE_REPORT_DEBTOR:
      return { ...state, addInvoice: payload, }
    case ADD_iNVOICE_REPORT_DEBTOR_SUCCESS:
      return { ...state, addInvoiceSuccess: payload, }
    case ADD_iNVOICE_REPORT_DEBTOR_FAIL:
      return { ...state, error: payload, }
    case ADD_iNVOICE_ARRAY_DEBTORID:
      return { ...state, addInvoiceArray: payload, }
    case ADD_iNVOICE_ARRAY_DEBTORID_SUCCESS:
      return { ...state, addInvoiceSuccess: payload, }
    case ADD_iNVOICE_ARRAY_DEBTORID_FAIL:
      return { ...state, error: payload, }

    case ADD_RATING_TO_DEBTOR:
      return { ...state, addRating: payload, }
    case ADD_RATING_TO_DEBTOR_SUCCESS:
      return { ...state, addRatingSuccess: payload, }
    case ADD_RATING_TO_DEBTOR_FAIL:
      return { ...state, error: payload, }

    default:
      return state
  }
}
