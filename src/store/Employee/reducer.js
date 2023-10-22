

import {GET_EMPLOYEE,GET_EMPLOYEE_LIST_SUCCESS,GET_EMPLOYEE_LIST_FAIL } from './actionTypes'

  const INIT_STATE = {
    employeeList : [],
    error: {},
  }
  
  const EmployeeList = (state = INIT_STATE, action) => {
    // debugger
    switch (action.type) {
      case GET_EMPLOYEE_LIST_SUCCESS:
        return {
          ...state,
          employeeList: action.payload,
        }
  
      case GET_EMPLOYEE_LIST_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      default:
        return state
    }
  }
  
  export default EmployeeList
  