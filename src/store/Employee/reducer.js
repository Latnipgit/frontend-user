import {GET_EMPLOYEE,GET_EMPLOYEE_LIST_SUCCESS,GET_EMPLOYEE_LIST_FAIL,
ADD_NEW_EMPLOYEE,
ADD_NEW_EMPLOYEE_SUCCESS
} from './actionTypes'

  const INIT_STATE = {
    empList : [],
    addEmp : [],
    error: {},
    addEmpsuccess: false,
    isEmployeeAdded: false,
  }
  
  const employeeList = (state = INIT_STATE, action) => {
    console.log("actionsss", action.type)
    switch (action.type) {
      
      case GET_EMPLOYEE_LIST_SUCCESS:
        return {
          ...state,
          empList: action.payload,
        }
        // break
      case GET_EMPLOYEE_LIST_FAIL:
        return  {
          ...state,
          error: action.payload,
        }
        // break
        case ADD_NEW_EMPLOYEE:
          return {
            ...state,
            addEmp:action.payload
          }
          // break
        case ADD_NEW_EMPLOYEE_SUCCESS:
          return {
            ...state,
            addEmpsuccess:true,
            addEmp:action.payload

          }
          
          // break
      default:
        return state
    }
  }
  
  export default employeeList
  