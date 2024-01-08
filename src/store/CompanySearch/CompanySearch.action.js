import {
  FETCH_COMPANY_SEARCH_START,
  FETCH_COMPANY_SEARCH_SUCCESS,
  FETCH_COMPANY_SEARCH_FAILED,
  FETCH_COMPANY_SEARCH_VIEW_DETAIL_START,
  FETCH_COMPANY_SEARCH_VIEW_DETAIL_SUCCESS,
  FETCH_COMPANY_SEARCH_VIEW_DETAIL_FAILED,
} from "./CompanySearch.type"
import { createAction } from "store/utils/reducer/reducer.utils"

export const fetchCompanySearchStart = () => createAction(FETCH_COMPANY_SEARCH_START)

export const fetchCompanySearchSuccess = CompanySearchArray => createAction(FETCH_COMPANY_SEARCH_SUCCESS, CompanySearchArray)

export const fetchCompanySearchFailure = error => createAction(FETCH_COMPANY_SEARCH_FAILED, error)


export const fetchCompanySearchViewDatatlStart = (data) => createAction(FETCH_COMPANY_SEARCH_VIEW_DETAIL_START.data)

export const fetchCompanySearchViewDatatlSuccess = (data) => createAction(FETCH_COMPANY_SEARCH_VIEW_DETAIL_SUCCESS, data)

export const fetchCompanySearchViewDatatlFailure = error => createAction(FETCH_COMPANY_SEARCH_VIEW_DETAIL_FAILED, error)
