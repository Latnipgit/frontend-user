import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { INITILATE_PAYMENT_VERIFICATIN } from "./initiatePaymentVerification.actionTypes"

import { initiatePaymentVerificationSuccess, initiatePaymentVerificationFail } from "./initiatePaymentVerification.actions";

import { addInitiatePaymentVerification } from '../../helpers/fakebackend_helper'


function* initiatePaymentVerificationData(data) {
  try {
    const response = yield call(addInitiatePaymentVerification, data.payload)
    yield put(initiatePaymentVerificationSuccess(response))
  } catch (error) {
    yield put(initiatePaymentVerificationFail(error))
  }
}


function* initiatePaymentVerificationSaga() {
  //  
  yield takeLatest(INITILATE_PAYMENT_VERIFICATIN, initiatePaymentVerificationData)
}

export default initiatePaymentVerificationSaga;
