import {
    SEARCH_COMPANY,
    SEARCH_COMPANY_SUCCESS,
    SEARCH_COMPANY_FAIL,
 
  } from "./actionTypes"
  
 export const searchCompany = (id) => (
    
    {
        type: SEARCH_COMPANY,
    id: id,

  })
  
  export const searchCompanySuccess = id => ({
    type: SEARCH_COMPANY_SUCCESS,
    id: id,
  })
  
  export const searchCompanyFail = error => ({
    type: SEARCH_COMPANY_FAIL,
    payload: error,
  })
  

