import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Crypto Redux States
import { GET_EMPLOYEE ,
  ADD_NEW_EMPLOYEE,
  ADD_NEW_EMPLOYEE_SUCCESS
} from "./actionTypes";

import {
  getEmployeeLIstSuccess,
    getEmployeeLIstFail,
    addNewEmployeelist,
    addNewEmployeeSuccess,
    addNewEmployeeFail

} from "./actions";

//Include Both Helper File with needed methods
import {getEmployeeList,addEmployeeList  } from "helpers/fakebackend_helper";

function* fetchEmployeeList() {
  
  try {
    const response = yield call(getEmployeeList)
    yield put(getEmployeeLIstSuccess(response))
  } catch (error) {
    yield put(getEmployeeLIstFail(error))
  }
}

// function* addEmployeeListsaga(user) {
  
//   try {
//     const response = yield call(addEmployeeList,user)
//     yield put(addNewEmployeeSuccess(response))
//   } catch (error) {
//     yield put(addNewEmployeeFail(error))
//   }
// }


function* addEmployeeListsaga(data) {
  try {
//   
      const response = yield call(addEmployeeList, data.payload)
      yield put(addNewEmployeeSuccess(response ))
    
  } catch (error) {
    yield put(addNewEmployeeFail(error))
  }
}


function* employeeListsaga() {
  //  
  yield takeEvery(GET_EMPLOYEE, fetchEmployeeList)
  yield takeLatest(ADD_NEW_EMPLOYEE, addEmployeeListsaga)
}

export default employeeListsaga;
