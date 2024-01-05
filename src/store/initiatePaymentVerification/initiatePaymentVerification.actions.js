/* INVOICES */
import { INITILATE_PAYMENT_VERIFICATIN_SUCCESS, INITILATE_PAYMENT_VERIFICATIN, INITILATE_PAYMENT_VERIFICATIN_FAIL } from "./initiatePaymentVerification.actionTypes"
import { createAction } from "store/utils/reducer/reducer.utils"

export const initiatePaymentVerification = (user) => createAction(INITILATE_PAYMENT_VERIFICATIN, user[0])
export const initiatePaymentVerificationSuccess = (user) => createAction(INITILATE_PAYMENT_VERIFICATIN_SUCCESS, { user })
export const initiatePaymentVerificationFail = (user) => createAction(INITILATE_PAYMENT_VERIFICATIN_FAIL, { user, history })


