import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { fetchCompanySearchViewDatatlSuccess, fetchCompanySearchViewDatatlFailure, } from "./CompanySearchView.action"

import { FETCH_COMPANY_SEARCH_VIEW_DETAIL_START } from "./CompanySearchView.type"

import { getcompanySerachViewDatils } from "helpers/fakebackend_helper"




export function* fetchCompanyViewDatailAsync(payload) {
  try {
    const response = yield call(getcompanySerachViewDatils, payload.payload)
    yield put(fetchCompanySearchViewDatatlSuccess(response))
  } catch (error) {
    yield put(fetchCompanySearchViewDatatlFailure(error))
  }
}


export function* onFetchCompanySearchView() {
  yield takeEvery(FETCH_COMPANY_SEARCH_VIEW_DETAIL_START, fetchCompanyViewDatailAsync)
}

export function* CompanySearchViewSaga() {
  yield all([fork(onFetchCompanySearchView)])
}
