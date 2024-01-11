import { takeLatest, call, put, all, fork } from "redux-saga/effects"

import { fetchReportDefulterPreviewSuccess, fetchReportDefulterPreviewFailure } from "./ReportDefulterPreview.action"

import { FETCH_REPORT_DEFULTER_PREVIEW_START } from "./ReportDefulterPreview.type"

import { getAllInvoiceFolder } from "helpers/fakebackend_helper"


export function* fetchReportDefulterPreviewAsync() {
  ;
  try {
    const ReportDefulterPreviewArray = yield call(getAllInvoiceFolder)
    yield put(fetchReportDefulterPreviewSuccess(ReportDefulterPreviewArray.data.response))
  } catch (error) {
    yield put(fetchReportDefulterPreviewFailure(error))
  }
}

export function* onFetchReportDefulterPreview() {
  yield takeLatest(FETCH_REPORT_DEFULTER_PREVIEW_START, fetchReportDefulterPreviewAsync)
}

export function* ReportDefulterPreviewSaga() {
  yield all([fork(onFetchReportDefulterPreview)])
}
