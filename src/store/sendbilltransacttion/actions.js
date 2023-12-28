/* INVOICES */
import {ADD_NEW_CUSTOMER_SUCCESS,ADD_NEW_CUSTOMER,ADD_NEW_CUSTOMER_FAIL} from "./actionTypes"
import { createAction } from "store/utils/reducer/reducer.utils"

export const addCustomerlist = (user) => createAction(ADD_NEW_CUSTOMER, user[0])
export const addNewCustomerSuccess = (user) => createAction(ADD_NEW_CUSTOMER_SUCCESS, { user })
export const addNewCustomerFail = (user) => createAction(ADD_NEW_CUSTOMER_FAIL, { user, history })


/*   export const addCustomerlist = (user) => {
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
  } */
