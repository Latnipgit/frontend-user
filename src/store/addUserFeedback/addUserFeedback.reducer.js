import {
  ADD_USER_FEEDBACK, ADD_USER_FEEDBACK_SUCCESS, ADD_USER_FEEDBACK_FAIL
} from './addUserFeedback.actionTypes'

const INIT_STATE = {
  addUserFeedbackArray: [],
  error: {},
  addUserFeedbackArraysuccess: false,
}

export const addUserFeedbackReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_USER_FEEDBACK_FAIL:
      return {
        ...state,
        error: payload,
      }
    case ADD_USER_FEEDBACK:
      return {
        ...state,
        addUserFeedbackArray: payload
      }
    case ADD_USER_FEEDBACK_SUCCESS:
      return {
        ...state,
        addUserFeedbackArraysuccess: true,
        addUserFeedbackArray: payload

      }
    default:
      return state
  }
}

