import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { fetchCompanySearchSuccess, fetchCompanySearchFailure, getAllCompanyListAction,getAllCompanyListActionSuccess,getAllCompanyListActionFail} from "./CompanySearch.action"

import { FETCH_COMPANY_SEARCH_START, GET_ALL_COMPANY_LIST } from "./CompanySearch.type"

import { getCompanySearchList ,getAllCompany} from "helpers/fakebackend_helper"


export function* fetchCompanySearchAsync() {
  try {
    const ReportMeDefulterArray = yield call(getCompanySearchList)
    yield put(fetchCompanySearchSuccess(ReportMeDefulterArray.response))
  } catch (error) {
    yield put(fetchCompanySearchFailure(error))
  }
}


function* getAllCompanySAGA() {
  try {
    const response = yield call(getAllCompany)
    yield put(getAllCompanyListActionSuccess(response))
  } catch (error) {
    yield put(getAllCompanyListActionFail(error))
  }
}


export function* onFetchCompanySearch() {
  yield takeEvery(FETCH_COMPANY_SEARCH_START, fetchCompanySearchAsync)
  yield takeEvery(GET_ALL_COMPANY_LIST, getAllCompanySAGA)
}

export function* CompanySearchSaga() {
  yield all([fork(onFetchCompanySearch)])
}
