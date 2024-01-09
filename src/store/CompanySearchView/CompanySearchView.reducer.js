import {
  FETCH_COMPANY_SEARCH_VIEW_DETAIL_START,
  FETCH_COMPANY_SEARCH_VIEW_DETAIL_SUCCESS,
  FETCH_COMPANY_SEARCH_VIEW_DETAIL_FAILED,
} from "./CompanySearchView.type"

export const REPORT_COMPANY_SEARCH_VIEW_DETAIL_STATE = {
  recordPaymentAddReportDef: {},
  companySearchViewDatailsSuccess: [],
  loading: false,
  error: null,
}

export const CompanySearchViewReducer = (
  state = REPORT_COMPANY_SEARCH_VIEW_DETAIL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
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
