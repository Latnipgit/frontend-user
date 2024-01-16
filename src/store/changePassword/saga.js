import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Crypto Redux States
import { CHANGE_FIRST_PASSWORD } from "./actionTypes";
import {
  changeFirstPassword,
  changeFirstPasswordSucess,
  changePasswordFail

} from "./actions";

//Include Both Helper File with needed methods
import { changeFirstPass } from "helpers/fakebackend_helper";



function* changePasswordfirsttime(user, history) {
  const pay = user.payload

  try {
    const response = yield call(changeFirstPass, user)
    yield put(changeFirstPasswordSucess(response))
    if (response.data.success) {
      // history('/companies');
      alert("Please Re login with your new password")
      const newLocation = "/login"
      window.location.href = newLocation
    }
    else {

      alert(response.data.message)
    }

  } catch (error) {
    yield put(changePasswordFail(error))
  }
}

function* changePasswordSaga() {
  //  
  yield takeLatest(CHANGE_FIRST_PASSWORD, changePasswordfirsttime)
}

export default changePasswordSaga;
