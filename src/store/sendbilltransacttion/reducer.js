import {
  ADD_NEW_CUSTOMER, ADD_NEW_CUSTOMER_SUCCESS, ADD_NEW_CUSTOMER_FAIL
} from './actionTypes'

const INIT_STATE = {
  empList: [],
  addEmp: [],
  error: {},
  addEmpsuccess: false,
  isEmployeeAdded: false,
}

const employeeListCusstomer = (state = INIT_STATE, action) => {

  switch (action.type) {

    case ADD_NEW_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // break
    case ADD_NEW_CUSTOMER:
      return {
        ...state,
        addEmp: action.payload
      }
    // break
    case ADD_NEW_CUSTOMER_SUCCESS:
      return {
        ...state,
        addEmpsuccess: true,
        addEmp: action.payload

      }

    // break
    default:
      return state
  }
}

export default employeeListCusstomer
