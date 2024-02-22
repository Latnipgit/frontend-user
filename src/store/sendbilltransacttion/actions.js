/* INVOICES */
import { ADD_NEW_CUSTOMER_SUCCESS, ADD_NEW_CUSTOMER_LIST, ADD_NEW_CUSTOMER_FAIL } from "./sendbilltransacttion.actionTypes"
import { createAction } from "store/utils/reducer/reducer.utils"

export const addNewCustomerlist = (user) => createAction(ADD_NEW_CUSTOMER_LIST, user[0])
export const addNewCustomerSuccess = (user) => createAction(ADD_NEW_CUSTOMER_SUCCESS, { user })
export const addNewCustomerFail = (user) => createAction(ADD_NEW_CUSTOMER_FAIL, { user, history })


export const SelectAddCustomerList = (state) => {
  const addCustomerList = []
  const customerData = state.employeeListCusstomer.addEmp
  if (Object.keys(customerData).length > 0) {
    if (customerData.user != undefined) {
      addCustomerList.push(customerData.user.data.response)
      return addCustomerList
    } else {
      addCustomerList.push(customerData)
      return addCustomerList
    }
  } else {
    return []
  }
}

/*   export const addCustomerlist = (user) => {
    console.log("USER++",user)
    return {
      type: "ADD_NEW_CUSTOMER",
      payload:user[0],
    }

    user.data.response
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
