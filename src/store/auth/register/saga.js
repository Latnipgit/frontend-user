import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper"

// initialize relavant method of both Auth
// const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
   if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
     
      const response = yield call(postJwtRegister, { 
        name: user.name,
        password: user.password,
        companyName:user.companyName,
        gstin:user.gstNumber,
        aadharCardNo:user.aadharNumber,
        companyPan:user.panNumber,
        emailId:user.email
})
      yield put(registerUserSuccessful(response))
    } 
  } catch (error) {
    console.log("There was an error registering: ", error)
    yield put(registerUserFailed(error))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
