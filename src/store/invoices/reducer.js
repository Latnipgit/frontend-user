import {
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  GET_INVOICE_DETAIL_SUCCESS,
  GET_INVOICE_DETAIL_FAIL,
  ADD_INVOICE,
  ADD_INVOICE_FAIL,
  ADD_INVOICE_SUCCESS
} from "./actionTypes"

const INIT_STATE = {
  invoices: [],
  invoiceDetail: {},
  error: {},
  addInvoice:[]
}

const Invoices = (state = INIT_STATE, action) => {
  //  
  switch (action.type) {
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
      }

    case GET_INVOICES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_INVOICE_DETAIL_SUCCESS:
      return {
        ...state,
        invoiceDetail: action.payload,
      }

    case GET_INVOICE_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      case ADD_INVOICE:
        return{
          ...state,
          addInvoice: action.payload
        }
        case ADD_INVOICE_SUCCESS:
          return{
            ...state,
            invoices: action.payload
          }
          case ADD_INVOICE_FAIL:
            return {
              ...state,
              error: action.payload,
            }

    default:
      return state
  }
}

export default Invoices
