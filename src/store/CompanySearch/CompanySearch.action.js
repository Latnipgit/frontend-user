import {
  FETCH_COMPANY_SEARCH_START,
  FETCH_COMPANY_SEARCH_SUCCESS,
  FETCH_COMPANY_SEARCH_FAILED,
  GET_ALL_COMPANY_LIST,
  GET_ALL_COMPANY_LIST_FAIL,
  GET_ALL_COMPANY_LIST_SUCCESS
} from "./CompanySearch.type"
import { createAction } from "store/utils/reducer/reducer.utils"

export const fetchCompanySearchStart = (data) => createAction(FETCH_COMPANY_SEARCH_START, data)

export const fetchCompanySearchSuccess = (CompanySearchArray) => createAction(FETCH_COMPANY_SEARCH_SUCCESS, CompanySearchArray)

export const fetchCompanySearchFailure = error => createAction(FETCH_COMPANY_SEARCH_FAILED, error)

export const getAllCompanyListAction = () => createAction(GET_ALL_COMPANY_LIST)

export const getAllCompanyListActionSuccess = (data) => createAction(GET_ALL_COMPANY_LIST_SUCCESS, data)

export const getAllCompanyListActionFail = (error) => createAction(GET_ALL_COMPANY_LIST_FAIL, error)

