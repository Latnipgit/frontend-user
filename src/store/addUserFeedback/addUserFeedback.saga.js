import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { ADD_USER_FEEDBACK_SUCCESS, ADD_USER_FEEDBACK, ADD_USER_FEEDBACK_FAIL } from "./addUserFeedback.actionTypes"

import { addUserFeedback, addUserFeedbackSuccess, addUserFeedbackFail } from "./addUserFeedback.actions";

import { addCustomerListAPI } from '../../helpers/fakebackend_helper'


function* addUserFeedbackSaga(data) {
  try {
    const response = yield call(addCustomerListAPI, data.payload)
    yield put(addUserFeedbackSuccess(response))
  } catch (error) {
    yield put(addUserFeedbackFail(error))
  }
}


function* employeeListsagaCustomer() {
  //  
  yield takeLatest(ADD_USER_FEEDBACK, addUserFeedbackSaga)
}

export default employeeListsagaCustomer;
