/* INVOICES */
import {ADD_NEW_CUSTOMER_SUCCESS,ADD_NEW_CUSTOMER,ADD_NEW_CUSTOMER_FAIL} from "./actionTypes"

  export const addCustomerlist = (user) => {
    console.log("USER++",user)
    return {
      type: "ADD_NEW_CUSTOMER",
      payload:user[0],
    }
  }
  
  export const addNewCustomerSuccess = (user) => {
     console.log("user1111",user)
    return {
      type: ADD_NEW_CUSTOMER_SUCCESS,
      payload: { user },
    }
  }
  
  export const addNewCustomerFail = (user) => {
     
    return {
      type: ADD_NEW_CUSTOMER_FAIL,
      payload: { user, history },
    }
  }
