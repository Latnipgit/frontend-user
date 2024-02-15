import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { fetchUploadPendingListSuccess, fetchUploadPendingListFailure, uploadUploadPednigDocIDSuccess, uploadUploadPednigDocIDFail } from "./UploadPendingDocList.action"

import { FETCH_UPLOADING_PENDING_DOC_LIST_START, UPLOAD_PENDING_DOCUMENT_ID } from "./UploadPendingDocList.type"

import { getUploaddocpendigrList } from "helpers/fakebackend_helper"
import { uploadPendingDocMethod } from "helpers/fakebackend_helper"


export function* fetchUploadPendingListAsync() {
  try {
    const UploadPendingListArray = yield call(getUploaddocpendigrList)
    yield put(fetchUploadPendingListSuccess(UploadPendingListArray.response))
  } catch (error) {
    yield put(fetchUploadPendingListFailure(error))
  }
}

function* uploadPendingDocSaga(payload) {
  try {
    const response = yield call(uploadPendingDocMethod, payload.payload)
    yield put(uploadUploadPednigDocIDSuccess(response))
  } catch (error) {
    yield put(uploadUploadPednigDocIDFail(error))
  }
}

export function* onFetchUploadPendingList() {
  yield takeEvery(FETCH_UPLOADING_PENDING_DOC_LIST_START, fetchUploadPendingListAsync)
  yield takeEvery(UPLOAD_PENDING_DOCUMENT_ID, uploadPendingDocSaga)
}

export function* UploadPendingListSaga() {
  yield all([fork(onFetchUploadPendingList)])
}
