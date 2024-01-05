import {
  INITILATE_PAYMENT_VERIFICATIN, INITILATE_PAYMENT_VERIFICATIN_SUCCESS, INITILATE_PAYMENT_VERIFICATIN_FAIL
} from './initiatePaymentVerification.actionTypes'

const INIT_STATE = {
  initiatePaytVerifArray: [],
  error: {},
  initiatePaytVerifArraysuccess: false,
}

export const initiatePaymentVerificationReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case INITILATE_PAYMENT_VERIFICATIN_FAIL:
      return {
        ...state,
        error: payload,
      }
    case INITILATE_PAYMENT_VERIFICATIN:
      return {
        ...state,
        initiatePaytVerifArray: payload
      }
    case INITILATE_PAYMENT_VERIFICATIN_SUCCESS:
      return {
        ...state,
        initiatePaytVerifArraysuccess: true,
        initiatePaytVerifArray: payload

      }
    default:
      return state
  }
}

