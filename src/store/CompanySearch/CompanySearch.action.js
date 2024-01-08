import {
  FETCH_COMPANY_SEARCH_START,
  FETCH_COMPANY_SEARCH_SUCCESS,
  FETCH_COMPANY_SEARCH_FAILED,
} from "./CompanySearch.type"
import { createAction } from "store/utils/reducer/reducer.utils"

export const fetchCompanySearchStart = () => createAction(FETCH_COMPANY_SEARCH_START)

export const fetchCompanySearchSuccess = CompanySearchArray => createAction(FETCH_COMPANY_SEARCH_SUCCESS, CompanySearchArray)

export const fetchCompanySearchFailure = error => createAction(FETCH_COMPANY_SEARCH_FAILED, error)

