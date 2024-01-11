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
  ADD_RATING_TO_DEBTOR_SUCCESS,
  UPLOAD_CA_CERTIFICATE_ID,
  UPLOAD_CA_CERTIFICATE_ID_SUCCESS,
  UPLOAD_CA_CERTIFICATE_ID_FAIL,
  REQUEST_INVOICE_DEF_EDIT,
  REQUEST_INVOICE_DEF_EDIT_FAIL,
  REQUEST_INVOICE_DEF_EDIT_SUCCESS,
  ADD_INVOICE_REPORT_DEFAULTER_ASYNC,
  ADD_INVOICE_REPORT_DEFAULTER_ASYNC_FAIL,
  ADD_INVOICE_REPORT_DEFAULTER_ASYNC_SUCCESS,
  RECORD_PAYMENT_REPORT_DEFAULT,
  RECORD_PAYMENT_REPORT_DEFAULT_FAIL,
  RECORD_PAYMENT_REPORT_DEFAULT_SUCCESS,
  UPDATE_PENDING_DOCUMENT,
  UPDATE_PENDING_DOCUMENT_FAIL,
  UPDATE_PENDING_DOCUMENT_SUCCESS,
  View_DETAIL_MODAL_OPEN,
  GET_FEEDBACKQUESTION,
  GET_FEEDBACKQUESTION_FAIL,
  GET_FEEDBACKQUESTION_SUCCESS
  
} from "./debtors.actiontype"



const INIT_STATE = {
  isReportDefOpen: false,
  isViewDetailsModalOpen: false,
  isConfirmReportDefaultModal: false,
  isCustomerFeedbackModalOpen: false,
  isPreviewModalOpen: false,
  isCACACertificateOpen: false,
  uploadPendingFilesModalOpen: false,
  uploadCACertifateID: [],
  uploadCACertifateIDSuccess: false,
  uploadCACertifateIDFail: false,
  requestAeditdefId: [],
  requestAeditdefIdSuccess: false,
  requestAeditdefIdFail: false,
  addInvoiceReportDefaulter: [],
  addInvoiceReportDefaulterSuccess: false,
  addInvoiceReportDefaulterFail: false,
  debtors: [],
  debtors: [],
  getInvoiceList: [],
  error: {},
  addInvoice: [],
  addInvoiceSuccess: [],
  addInvoiceArray: [],
  addInvoiceSuccessArray: [],
  addRating: [],
  addRatingSuccess: [],
  recordPaymentAddReportDef:[],
  recordPaymentAddReportDefSuccess:[],
  recordPaymentAddReportDefFail:false,
  updatePendingDocs:[],
  updatePendingDocssuccess:[],
  getFeedbackQuestionListReducer:[],
  getFeedbackQuestionListReducerSueccess:[],
  getFeedbackQuestionListReducerFail:false


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

      case UPLOAD_CA_CERTIFICATE_ID:
        return { ...state, uploadCACertifateID: payload, }
      case UPLOAD_CA_CERTIFICATE_ID_SUCCESS:
        return { ...state, uploadCACertifateIDSuccess: payload, }
      case UPLOAD_CA_CERTIFICATE_ID_FAIL:
        return { ...state, error: payload, }

        case REQUEST_INVOICE_DEF_EDIT:
          return { ...state, requestAeditdefId: payload, }
        case REQUEST_INVOICE_DEF_EDIT_SUCCESS:
          return { ...state, requestAeditdefIdSuccess: payload, }
        case REQUEST_INVOICE_DEF_EDIT_FAIL:
          return { ...state, error: payload, }
          
        case ADD_INVOICE_REPORT_DEFAULTER_ASYNC:
          return { ...state, addInvoiceReportDefaulter: payload, }
        case ADD_INVOICE_REPORT_DEFAULTER_ASYNC_SUCCESS:
          return { ...state, raddInvoiceReportDefaulterSuccess: payload, }
        case ADD_INVOICE_REPORT_DEFAULTER_ASYNC_FAIL:
          return { ...state, error: payload, }

          case RECORD_PAYMENT_REPORT_DEFAULT:
            return { ...state, recordPaymentAddReportDef: payload, }
          case RECORD_PAYMENT_REPORT_DEFAULT_SUCCESS:
            return { ...state, recordPaymentAddReportDefSuccess: payload, }
          case RECORD_PAYMENT_REPORT_DEFAULT_FAIL:
            return { ...state, error: payload, }

            case View_DETAIL_MODAL_OPEN:
              return { ...state, isViewDetailsModalOpen: payload, }
             case UPDATE_PENDING_DOCUMENT:
            return { ...state, updatePendingDocs: payload, }
          case UPDATE_PENDING_DOCUMENT_SUCCESS:
            return { ...state, updatePendingDocssuccess: payload, }
          case UPDATE_PENDING_DOCUMENT_FAIL:
            return { ...state, error: payload, }
            case GET_FEEDBACKQUESTION:
              return { ...state, }
            case GET_FEEDBACKQUESTION_SUCCESS:
              return { ...state, getFeedbackQuestionListReducer: payload, }
            case GET_FEEDBACKQUESTION_FAIL:
              return { ...state, error: payload, }
    
    default:
      return state
  }
}
