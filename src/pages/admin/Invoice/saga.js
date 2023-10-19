import { call, put, takeLatest } from 'redux-saga/effects';
import {getInvoiceList} from './InvoiceAPI'
import axios from 'axios';

export function* invoicesaga(action) {
  try {
    const response = yield call(getInvoiceList, action.value );

    yield put({ type: 'INVOICE_LIST_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'INVOICE_LIST_ERROR', payload: response });
  }
}

export function* watchInvoiceSaga() {
  yield takeLatest(FETCH_DATA, invoicesaga);
}