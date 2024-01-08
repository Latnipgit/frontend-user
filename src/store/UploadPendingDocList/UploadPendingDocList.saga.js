import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { fetchUploadPendingListSuccess, fetchUploadPendingListFailure } from "./UploadPendingDocList.action"

import { FETCH_UPLOADING_PENDING_DOC_LIST_START } from "./UploadPendingDocList.type"

import { getUploaddocpendigrList } from "helpers/fakebackend_helper"


export function* fetchUploadPendingListAsync() {
  try {
    const UploadPendingListArray = yield call(getUploaddocpendigrList)
    debugger
    const fetchUploadPendtSuccess = UploadPendingListArray.response
    yield put(fetchUploadPendingListSuccess(UploadPendingListArray.response))
  } catch (error) {
    yield put(fetchUploadPendingListFailure(error))
  }
}

export function* onFetchUploadPendingList() {
  yield takeEvery(FETCH_UPLOADING_PENDING_DOC_LIST_START, fetchUploadPendingListAsync)
}

export function* UploadPendingListSaga() {
  yield all([fork(onFetchUploadPendingList)])
}
