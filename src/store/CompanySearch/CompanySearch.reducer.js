import {
  FETCH_COMPANY_SEARCH_START,
  FETCH_COMPANY_SEARCH_SUCCESS,
  FETCH_COMPANY_SEARCH_FAILED,
  FETCH_COMPANY_SEARCH_VIEW_DETAIL_START,
  FETCH_COMPANY_SEARCH_VIEW_DETAIL_SUCCESS,
  FETCH_COMPANY_SEARCH_VIEW_DETAIL_FAILED,
} from "./CompanySearch.type"

export const REPORT_ME_DEFULTER_INITIAL_STATE = {
  companySearchList: [],
  companySearchViewDatailsSuccess: [],
  recordPaymentAddReportDef: [],
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
    case FETCH_COMPANY_SEARCH_FAILED:
      return { ...state, loading: false, error: payload }

    case FETCH_COMPANY_SEARCH_VIEW_DETAIL_START:
      return { ...state, loading: true, recordPaymentAddReportDef: payload }
    case FETCH_COMPANY_SEARCH_VIEW_DETAIL_SUCCESS:
      return { ...state, loading: false, companySearchViewDatailsSuccess: payload }
    case FETCH_COMPANY_SEARCH_VIEW_DETAIL_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
