import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_DEBTORS,
  GET_DEBTORS_FAIL,
  GET_DEBTORS_SUCCESS
  , GET_INVOICE_LIST,
  GET_INVOICE_LIST_FAIL, GET_INVOICE_LIST_SUCCESS,
  ADD_iNVOICE_REPORT_DEBTOR,
  ADD_iNVOICE_REPORT_DEBTOR_FAIL,
  ADD_iNVOICE_REPORT_DEBTOR_SUCCESS,
  ADD_iNVOICE_ARRAY_DEBTORID,
  ADD_RATING_TO_DEBTOR,
  UPLOAD_CA_CERTIFICATE_ID,
  UPLOAD_CA_CERTIFICATE_ID_FAIL,
  UPLOAD_CA_CERTIFICATE_ID_SUCCESS,
  REQUEST_INVOICE_DEF_EDIT,
  ADD_INVOICE_REPORT_DEFAULTER_ASYNC,
  RECORD_PAYMENT_REPORT_DEFAULT,
  RECORD_PAYMENT_REPORT_DEFAULT_FAIL,
  RECORD_PAYMENT_REPORT_DEFAULT_SUCCESS,
  UPDATE_PENDING_DOCUMENT,
  GET_FEEDBACKQUESTION
} from "./debtors.actiontype";
import {
  getAllDebtors,
  getAllDebtorsFail,
  getAllDebtorsSuccess,
  getAllInvoice,
  getAllInvoiceFail,
  getAllInvoiceSuccess,
  addInvoiceReportDebtor,
  addInvoiceReportDebtorSuccess,
  addInvoiceReportDebtorFail,
  addInvoiceArray,
  addInvoiceArrayFail,
  addInvoiceArraySuccess,
  addRatingToDebtorFail,
  addRatingToDebtorSuccess,
  uploadCACertificateID,
  uploadCACertificateIDSuccess,
  uploadCACertificateIDFail,
  requestInvoiceDefEdit,
  requestInvoiceDefEditFail,
  requestInvoiceDefEditSuccess,
  addInvoiceReportDefaulterInvoice,
  addInvoiceReportDefaulterInvoiceFail,
  addInvoiceReportDefaulterInvoiceSuccess,
  recoredPaymentReportDefault,
  recoredPaymentReportDefaultFail,
  recoredPaymentReportDefaultSucccess,
  updatePendingDocumentssSucccess,
  updatePendingDocumentssFail,
  getFeebBackQuestionList,
  getFeebBackQuestionListFail,
  getFeebBackQuestionListSuccess

} from "./debtors.actions";

//Include Both Helper File with needed methods
import { getAllDebtorsAPI } from "helpers/fakebackend_helper";
import { getAllInvoiceList } from "helpers/fakebackend_helper";
import { addInvoiceApi, addDebtorIdToarrayForPreviewAPI, addRatingofdebtor, uploadCACertificateAPIMethod, updatePendingDocument, requestAEdit, addInVoiceDefaulter, recordPaymentAPIMethod, getFeebBackQuestionListAPI } from "helpers/fakebackend_helper";


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
function* addInvoicesaga(payload) {
  try {
    const response = yield call(addInvoiceApi, payload.payload)
    yield put(addInvoiceReportDebtorSuccess(response))
  } catch (error) {
    yield put(addInvoiceReportDebtorFail(error))
  }
}

function* addDebtorIdToPreview(payload) {
  try {
    const response = yield call(addDebtorIdToarrayForPreviewAPI, payload.payload)
    yield put(addInvoiceArraySuccess(response))
  } catch (error) {
    yield put(addInvoiceArrayFail(error))
  }
}

function* uploadCACertyifaicateSaga(payload) {
  try {
    const response = yield call(uploadCACertificateAPIMethod, payload.payload)
    yield put(uploadCACertificateIDSuccess(response))
  } catch (error) {
    yield put(uploadCACertificateIDFail(error))
  }
}

function* addRatingToDebtor(payload) {
  try {
    const response = yield call(addRatingofdebtor, payload.payload)
    yield put(addRatingToDebtorSuccess(response))
  } catch (error) {
    yield put(addRatingToDebtorFail(error))
  }
}
function* requestEditSaga(payload) {
  try {
    const response = yield call(requestAEdit, payload.payload)
    yield put(requestInvoiceDefEditSuccess(response))
  } catch (error) {
    yield put(requestInvoiceDefEditFail(error))
  }
}

function* addInvoiceReportDefSaga(payload) {
  try {
    const response = yield call(addInVoiceDefaulter, payload.payload)
    yield put(addInvoiceReportDefaulterInvoiceSuccess(response))
  } catch (error) {
    yield put(addInvoiceReportDefaulterInvoiceFail(error))
  }
}


function* recordPaymentSaga(payload) {
  try {
    const response = yield call(recordPaymentAPIMethod, payload.payload)
    yield put(recoredPaymentReportDefaultSucccess(response))
  } catch (error) {
    yield put(recoredPaymentReportDefaultFail(error))
  }
}
function* updatePendingDocumentSaga(payload) {
  try {
    const response = yield call(updatePendingDocument, payload.payload)
    yield put(updatePendingDocumentssSucccess(response))
  } catch (error) {
    yield put(updatePendingDocumentssFail(error))
  }
}

function* getFeedbackQuestionSaga() {
  try {
    const response = yield call(getFeebBackQuestionListAPI)
    console.log("responseresponseresponse", response)
    yield put(getFeebBackQuestionListSuccess(response.response))
  } catch (error) {
    yield put(getFeebBackQuestionListFail(error))
  }
}
function* debtorsSaga() {
  //  
  yield takeEvery(GET_DEBTORS, fetchdebtors)
  yield takeEvery(GET_INVOICE_LIST, fetchAllInvoice)
  yield takeEvery(ADD_iNVOICE_REPORT_DEBTOR, addInvoicesaga)
  yield takeEvery(ADD_iNVOICE_ARRAY_DEBTORID, addDebtorIdToPreview)
  yield takeEvery(ADD_RATING_TO_DEBTOR, addRatingToDebtor)
  yield takeEvery(UPLOAD_CA_CERTIFICATE_ID, uploadCACertyifaicateSaga)
  yield takeEvery(REQUEST_INVOICE_DEF_EDIT, requestEditSaga)
  yield takeEvery(ADD_INVOICE_REPORT_DEFAULTER_ASYNC, addInvoiceReportDefSaga)
  yield takeEvery(RECORD_PAYMENT_REPORT_DEFAULT, recordPaymentSaga)
  yield takeEvery(UPDATE_PENDING_DOCUMENT, updatePendingDocumentSaga)
  yield takeEvery(GET_FEEDBACKQUESTION, getFeedbackQuestionSaga)
}

export default debtorsSaga;
