import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_DEBTORS,
GET_DEBTORS_FAIL,
GET_DEBTORS_SUCCESS } from "./actiontype";
import {
getAllDebtors,
getAllDebtorsFail,
getAllDebtorsSuccess
} from "./actions";

//Include Both Helper File with needed methods
import { getAllDebtorsAPI } from "helpers/fakebackend_helper";

function* fetchdebtors() {
  try {
    const response = yield call(getAllDebtorsAPI)
    yield put(getAllDebtorsSuccess(response))
  } catch (error) {
    yield put(getAllDebtorsFail(error))
  }
}


function* debtorsSaga() {
  //  
  yield takeEvery(GET_DEBTORS, fetchdebtors)
}

export default debtorsSaga;
