import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_COMPANY, ADD_NEW_COMPANY } from "./Company.actionTypes";
import {
  getCompanyListSuccess,
  getCompanyListFail,
  addNewCompany,
  addNewCompanySuccess

} from "./Company.actions";

//Include Both Helper File with needed methods
import { getCompanyList, addCompanyListApi } from "helpers/fakebackend_helper";

function* fetchCompanyList() {
  try {
    const response = yield call(getCompanyList)
    yield put(getCompanyListSuccess(response))
  } catch (error) {
    yield put(getCompanyListFail(error))
  }
}

function* addCompany(user) {
  try {
    const response = yield call(addCompanyListApi, user)
    yield put(addNewCompanySuccess(response))
  } catch (error) {
    yield put(addNewCompany(error))
  }
}

function* companyListsaga() {
  //  
  yield takeEvery(GET_COMPANY, fetchCompanyList)
  yield takeEvery(ADD_NEW_COMPANY, addCompany)
}

export default companyListsaga;
