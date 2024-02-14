import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { SEARCH_COMPANY } from "./actionTypes";
import {
  searchCompany,
  searchCompanySuccess,
  searchCompanyFail

} from "./actions";

//Include Both Helper File with needed methods
import { searchCompanyAPI } from "helpers/fakebackend_helper";
import { de } from "date-fns/locale";

function* searchCompanyasync(id) {

  const payload = {
    "companyId": id.id
  }
  try {
    const response = yield call(searchCompanyAPI, payload)
    sessionStorage.setItem("tokenemployeeRegister", response.data.response.token)
    sessionStorage.setItem("refreshToken", response.data.response.refreshToken)
    yield put(searchCompanySuccess(response))
  } catch (error) {
    yield put(searchCompanyFail(error))
  }
}

function* searchCompanysaga() {
  //  
  yield takeEvery(SEARCH_COMPANY, searchCompanyasync)
}

export default searchCompanysaga;
