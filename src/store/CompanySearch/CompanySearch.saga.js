import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { fetchCompanySearchSuccess, fetchCompanySearchFailure, } from "./CompanySearch.action"

import { FETCH_COMPANY_SEARCH_START, FETCH_COMPANY_SEARCH_VIEW_DETAIL_START } from "./CompanySearch.type"

import { getCompanySearchList, getcompanySerachViewDatils } from "helpers/fakebackend_helper"


export function* fetchCompanySearchAsync() {
  try {
    const ReportMeDefulterArray = yield call(getCompanySearchList)
    yield put(fetchCompanySearchSuccess(ReportMeDefulterArray.response))
  } catch (error) {
    yield put(fetchCompanySearchFailure(error))
  }
}

export function* fetchCompanyViewDatailAsync(payload) {
  try {
    const response = yield call(getcompanySerachViewDatils, payload.payload)
    yield put(fetchCompanySearchSuccess(response))
  } catch (error) {
    yield put(fetchCompanySearchFailure(error))
  }
}


export function* onFetchCompanySearch() {
  yield takeEvery(FETCH_COMPANY_SEARCH_START, fetchCompanySearchAsync)
  yield takeEvery(FETCH_COMPANY_SEARCH_VIEW_DETAIL_START, fetchCompanyViewDatailAsync)
}

export function* CompanySearchSaga() {
  yield all([fork(onFetchCompanySearch)])
}
