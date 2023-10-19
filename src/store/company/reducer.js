

import {GET_COMPANY,GET_COMPANY_LIST_SUCCESS,GET_COMPANY_LIST_FAIL } from './actionTypes'

  const INIT_STATE = {
    companyList : [],
    error: {},
  }
  
  const companyList = (state = INIT_STATE, action) => {
    // debugger
    switch (action.type) {
      case GET_COMPANY_LIST_SUCCESS:
        return {
          ...state,
          companyList: action.payload,
        }
  
      case GET_COMPANY_LIST_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      default:
        return state
    }
  }
  
  export default companyList
  