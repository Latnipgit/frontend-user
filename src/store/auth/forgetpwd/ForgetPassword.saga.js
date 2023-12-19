import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD } from "./ForgetPassword.actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError } from "./ForgetPassword.actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeForgetPwd,
  postJwtForgetPwd,
  forgetPassword
} from "../../../helpers/fakebackend_helper"

const fireBaseBackend = getFirebaseBackend()

//If user is send successfully send mail link then dispatch redux action's are directly from here.

function* forgetUser( user ) {
  console.log("USERRR", user.payload.user)
  const users = user.payload.user
  try {
   if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
     
      const response = yield call(forgetPassword, users.email)
      console.log("RESPONSE", response)
      yield put(userForgetPasswordSuccess(response))
    } 
  } catch (error) {
    console.log("There was an error registering: ", error)
    yield put(userForgetPasswordError(error))
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga
