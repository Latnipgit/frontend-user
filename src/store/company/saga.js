import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_COMPANY } from "./actionTypes";
import {
    getCompanyListSuccess,
    getCompanyListFail,

} from "./actions";

//Include Both Helper File with needed methods
import {getCompanyList } from "helpers/fakebackend_helper";

function* fetchCompanyList() {
  try {
    const response = yield call(getCompanyList)
    yield put(getCompanyListSuccess(response))
  } catch (error) {
    yield put(getCompanyListFail(error))
  }
}

function* companyListsaga() {
  // debugger
  yield takeEvery(GET_COMPANY, fetchCompanyList)
}

export default companyListsaga;
