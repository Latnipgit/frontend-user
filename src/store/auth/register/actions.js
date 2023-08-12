import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes"

export const registerUser = (user, history) => {
  debugger
  console.log("User",user);
  return {
    type: REGISTER_USER,
    payload: { user, history },
  }
}

export const registerUserSuccessful = user => {
  debugger
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserFailed = user => {
  debugger
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  }
}
