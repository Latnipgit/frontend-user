import { takeLatest, call, put, all, fork } from "redux-saga/effects"

import { fetchReportMeDefulterSuccess, fetchReportMeDefulterFailure } from "./ReportMeDefulter.action"

import { FETCH_REPORT_ME_DEFULTER_START } from "./ReportMeDefulter.type"

import { getReportMeDefulterList } from "helpers/fakebackend_helper"


export function* fetchReportMeDefulterAsync() {
  try {
    debugger
    const ReportMeDefulterArray = yield call(getReportMeDefulterList)
    yield put(fetchReportMeDefulterSuccess(ReportMeDefulterArray.data.response))
  } catch (error) {
    yield put(fetchReportMeDefulterFailure(error))
  }
}

export function* onFetchReportMeDefulter() {
  yield takeLatest(FETCH_REPORT_ME_DEFULTER_START, fetchReportMeDefulterAsync)
}

export function* ReportMeDefulterSaga() {
  yield all([fork(onFetchReportMeDefulter)])
}
