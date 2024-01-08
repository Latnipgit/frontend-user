import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { fetchCompanySearchSuccess, fetchCompanySearchFailure, } from "./CompanySearch.action"

import { FETCH_COMPANY_SEARCH_START } from "./CompanySearch.type"

import { getCompanySearchList } from "helpers/fakebackend_helper"


export function* fetchCompanySearchAsync() {
  try {
    const ReportMeDefulterArray = yield call(getCompanySearchList)
    yield put(fetchCompanySearchSuccess(ReportMeDefulterArray.response))
  } catch (error) {
    yield put(fetchCompanySearchFailure(error))
  }
}


export function* onFetchCompanySearch() {
  yield takeEvery(FETCH_COMPANY_SEARCH_START, fetchCompanySearchAsync)
}

export function* CompanySearchSaga() {
  yield all([fork(onFetchCompanySearch)])
}
