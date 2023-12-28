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
    UPLOAD_PENDING_FILES
  } from "./debtors.actiontype"
  

  
  const INIT_STATE = {
    isReportDefOpen: false,
    isConfirmReportDefaultModal: false,
    isCustomerFeedbackModalOpen : false,
    isPreviewModalOpen:false,
    uploadPendingFilesModalOpen: false,
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
          case GET_CUSTOMER_FEEDBACK_MODAL_OPEN:
            return { ...state, isCustomerFeedbackModalOpen: payload,}
            case CONFIRM_REPORT_DEFAULT_MODAL:
              return { ...state, isConfirmReportDefaultModal: payload,}
              case GET_REPORT_DEF_PREVIEW:
                return { ...state, isPreviewModalOpen: payload,}
                case UPLOAD_PENDING_FILES:
                  return { ...state, uploadPendingFilesModalOpen: payload,}
      default:
        return state
    }
  }
  