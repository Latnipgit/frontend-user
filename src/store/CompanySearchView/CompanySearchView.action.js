import {
  FETCH_COMPANY_SEARCH_VIEW_DETAIL_START,
  FETCH_COMPANY_SEARCH_VIEW_DETAIL_SUCCESS,
  FETCH_COMPANY_SEARCH_VIEW_DETAIL_FAILED,
} from "./CompanySearchView.type"
import { createAction } from "store/utils/reducer/reducer.utils"



export const fetchCompanySearchViewDatatlStart = (data) => createAction(FETCH_COMPANY_SEARCH_VIEW_DETAIL_START, data)

export const fetchCompanySearchViewDatatlSuccess = (data) => createAction(FETCH_COMPANY_SEARCH_VIEW_DETAIL_SUCCESS, data)

export const fetchCompanySearchViewDatatlFailure = error => createAction(FETCH_COMPANY_SEARCH_VIEW_DETAIL_FAILED, error)
