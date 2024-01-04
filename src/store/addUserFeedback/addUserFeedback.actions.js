/* INVOICES */
import { ADD_NEW_CUSTOMER_SUCCESS, ADD_NEW_CUSTOMER, ADD_NEW_CUSTOMER_FAIL } from "./addUserFeedback.actionTypes"
import { createAction } from "store/utils/reducer/reducer.utils"

export const addUserFeedback = (user) => createAction(ADD_NEW_CUSTOMER, user[0])
export const addUserFeedbackSuccess = (user) => createAction(ADD_NEW_CUSTOMER_SUCCESS, { user })
export const addUserFeedbackFail = (user) => createAction(ADD_NEW_CUSTOMER_FAIL, { user, history })


