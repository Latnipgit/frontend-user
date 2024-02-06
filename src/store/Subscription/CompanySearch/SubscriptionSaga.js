import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { getSubscriptionListFailure, getSubscriptionListSuccess ,addSubscriptionToUserSuccess,addSubscriptionToUserFailure} from "./subscriptionAction"

import { GET_ALL_SUBSCRIPTION_PACKAGE,ADD_SUBSCRIPTION_TO_USER } from "./SsubscriptionActionType"

import { getAllSubscription,addSubscriptionApiMethod } from "helpers/fakebackend_helper"


export function* fetchSubscription(payload) {
  try {
    const response = yield call(getAllSubscription, payload.payload)
    console.log("responseresponseresponse", response)

    yield put(getSubscriptionListSuccess(response.response))
  } catch (error) {
    yield put(getSubscriptionListFailure(error))
  }
}


export function* addSubscribeToUser(payload) {
  try {
    const response = yield call(addSubscriptionApiMethod, payload.payload)
    console.log("responseresponseresponse", response)

    yield put(addSubscriptionToUserSuccess(response.response))
  } catch (error) {
    yield put(addSubscriptionToUserFailure(error))
  }
}





export function* onFetchSubscription() {
  yield takeEvery(GET_ALL_SUBSCRIPTION_PACKAGE, fetchSubscription)
  yield takeEvery(ADD_SUBSCRIPTION_TO_USER, addSubscribeToUser)
}

export function* subscriptionSaga() {
  yield all([fork(onFetchSubscription)])
}
