import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {GET_GENERAL_DOCUMENTS } from "./documents.actionTypes";
import {
  getGeneralDoucmentsFail,
  getGeneralDoucmentsSuccess
} from "./documents.actions";

//Include Both Helper File with needed methods
import { getGeneralDoucmentsAPI,} from "helpers/fakebackend_helper";

function* fetchGeneralDocument() {
  
  try {
    const response = yield call(getGeneralDoucmentsAPI)
    yield put(getGeneralDoucmentsSuccess(response))
  } catch (error) {
    yield put(getGeneralDoucmentsFail(error))
  }
}


function* documentSaga() {
  //  
  yield takeEvery(GET_GENERAL_DOCUMENTS, fetchGeneralDocument)
 
}

export default documentSaga;
