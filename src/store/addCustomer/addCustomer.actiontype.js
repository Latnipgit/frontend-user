import { ADD_CUSTOMER } from "./addCustomer.action";

  import { createAction } from "store/utils/reducer/reducer.utils";
  
  export const setAddCustomerOpen = (boolean) => createAction(ADD_CUSTOMER, boolean);