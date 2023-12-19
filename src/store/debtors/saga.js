import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_DEBTORS,
GET_DEBTORS_FAIL,
GET_DEBTORS_SUCCESS
,GET_INVOICE_LIST,
GET_INVOICE_LIST_FAIL,GET_INVOICE_LIST_SUCCESS,
} from "./actiontype";
import {
getAllDebtors,
getAllDebtorsFail,
getAllDebtorsSuccess,
getAllInvoice,
getAllInvoiceFail,
getAllInvoiceSuccess,

} from "./debtors.actions";

//Include Both Helper File with needed methods
import { getAllDebtorsAPI } from "helpers/fakebackend_helper";
import { getAllInvoiceList} from "helpers/fakebackend_helper";

function* fetchdebtors() {
  try {
    const response = yield call(getAllDebtorsAPI)
    yield put(getAllDebtorsSuccess(response))
  } catch (error) {
    yield put(getAllDebtorsFail(error))
  }
}

function* fetchAllInvoice() {
  try {
    const response = yield call(getAllInvoiceList)
    yield put(getAllInvoiceSuccess(response))
    console.log("IUJIUJIUJIUJ0", response)
  } catch (error) {
    yield put(getAllInvoiceFail(error))
  }
}


function* debtorsSaga() {
  //  
  yield takeEvery(GET_DEBTORS, fetchdebtors)
  yield takeEvery(GET_INVOICE_LIST, fetchAllInvoice)
}

export default debtorsSaga;
