import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import {ADD_NEW_CUSTOMER_SUCCESS,ADD_NEW_CUSTOMER,ADD_NEW_CUSTOMER_FAIL} from "./actionTypes"

import {addCustomerlist,addNewCustomerSuccess,addNewCustomerFail} from "./actions";


// function* fetchEmployeeList() {
  
//   try {
//     const response = yield call(getEmployeeList)
//     yield put(addNewCustomerSuccess(response))
//   } catch (error) {
//     yield put(addNewCustomerFail(error))
//   }
// }


function* addCustomerListsaga(data) {
  try {
debugger
      const response = yield call(addCustomerlist, data.payload)
      if(response.payload==undefined){
        alert("Server responded Internal error.")
      }else{
        yield put(addNewCustomerSuccess(response ))
      }
  
    
  } catch (error) {
    yield put(addNewCustomerFail(error))
  }
}


function* employeeListsagaCustomer() {
  //  
  //yield takeEvery(GET_EMPLOYEE, fetchEmployeeList)
  yield takeLatest(ADD_NEW_CUSTOMER , addCustomerListsaga)
}

export default employeeListsagaCustomer;
