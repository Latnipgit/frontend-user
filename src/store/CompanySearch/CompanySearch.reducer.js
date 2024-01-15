import {
  FETCH_COMPANY_SEARCH_START,
  FETCH_COMPANY_SEARCH_SUCCESS,
  FETCH_COMPANY_SEARCH_FAILED,
  GET_ALL_COMPANY_LIST,
  GET_ALL_COMPANY_LIST_SUCCESS,
  GET_ALL_COMPANY_LIST_FAIL
} from "./CompanySearch.type"

export const REPORT_ME_DEFULTER_INITIAL_STATE = {
  companySearchList: [],
  companyList:[],
  companyListSucess:[],
  companyListFail:[],
  recordPaymentAddReportDef: {},
  companySearchViewDatailsSuccess: [],
  loading: false,
  error: null,
}

export const CompanySearchReducer = (
  state = REPORT_ME_DEFULTER_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_COMPANY_SEARCH_START:
      return { ...state, loading: true }
    case FETCH_COMPANY_SEARCH_SUCCESS:
      return { ...state, loading: false, companySearchList: payload }
      case GET_ALL_COMPANY_LIST:
        return { ...state, loading: true,companyList:payload }
    case FETCH_COMPANY_SEARCH_FAILED:
      return { ...state, loading: false, error: payload }
      case GET_ALL_COMPANY_LIST_SUCCESS:
        return { ...state, companyList: payload, }
      case GET_ALL_COMPANY_LIST_FAIL:
        return { ...state, error: payload, }
    default:
      return state
  }
}
