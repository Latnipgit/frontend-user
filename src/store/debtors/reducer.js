import {
    GET_DEBTORS,
    GET_DEBTORS_FAIL,
    GET_DEBTORS_SUCCESS
  } from "./actiontype"
  
  const INIT_STATE = {
    debtors: [],
    error: {},
  }
  
  const DebtorsReducer = (state = INIT_STATE, action) => {
    //  
    switch (action.type) {
      case GET_DEBTORS_SUCCESS:
        return {
          ...state,
          debtors: action.payload,
        }
  
      case GET_DEBTORS_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
     
  
      default:
        return state
    }
  }
  
  export default DebtorsReducer
  