import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_EMPLOYEE } from "./actionTypes";
import {
  getEmployeeLIstSuccess,
    getEmployeeLIstFail,

} from "./actions";

//Include Both Helper File with needed methods
import {getCompanyList } from "helpers/fakebackend_helper";

function* fetchEmployeeList() {
  try {
    const response = yield call(getEmployeeList)
    yield put(getEmployeeLIstSuccess(response))
  } catch (error) {
    yield put(getEmployeeLIstFail(error))
  }
}

function* EmployeeListSaga() {
  // debugger
  yield takeEvery(GET_EMPLOYEE, fetchEmployeeList)
}

export default companyListsaga;
