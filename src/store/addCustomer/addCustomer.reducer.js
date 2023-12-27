import { ADD_CUSTOMER } from "./addCustomer.action"; 

  const INIT_STATE = {
    isaddCustomerOpen: false,
  }
  
  export const AddCustomerReducer = (state = INIT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
      case ADD_CUSTOMER:
        return { ...state, isaddCustomerOpen: payload,}
      default:
        return state
    }
  }
  