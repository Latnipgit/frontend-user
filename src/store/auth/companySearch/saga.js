import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { SEARCH_COMPANY } from "./actionTypes";
import {
  searchCompany,
  searchCompanySuccess,
  searchCompanyFail

} from "./actions";

//Include Both Helper File with needed methods
import {searchCompanyAPI } from "helpers/fakebackend_helper";

function* searchCompanyasync(id) {
  debugger
  console.log("IDIDIDID", id.id)
  const payload={
    "companyId":id.id
  }
  try {
    const response = yield call(searchCompanyAPI,payload)
    console.log("RESPONCE", response)
    localStorage.setItem("tokenemployeeRegister", response.data.response.token)
    yield put(searchCompanySuccess(response))
  } catch (error) {
    yield put(searchCompanyFail(error))
  }
}

function* searchCompanysaga() {
  // debugger
  yield takeEvery(SEARCH_COMPANY, searchCompanyasync)
}

export default searchCompanysaga;
