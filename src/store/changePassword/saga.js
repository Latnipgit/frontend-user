import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_COMPANY, ADD_NEW_COMPANY, CHANGE_FIRST_PASSWORD } from "./actionTypes";
import {
  changeFirstPassword,
  changeFirstPasswordSucess

} from "./actions";

//Include Both Helper File with needed methods
import {changeFirstPass} from "helpers/fakebackend_helper";



function* changePassword(user) {
  try {
    const response = yield call(changeFirstPass, user)
    console.log("SUCCESS Responde",response )
    yield put(changeFirstPasswordSucess(response))

if(response.data.success){
  history('/companies');

}
else{
  alert(response.data.message)
}
 
  } catch (error) {
    yield put(changeFirstPassword(error))
  }
}

function* changePasswordSaga() {
  //  
  yield takeEvery(CHANGE_FIRST_PASSWORD, changePassword)
}

export default changePasswordSaga;
