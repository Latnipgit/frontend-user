import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
}


const account = (state = initialState, action) => {
   
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case REGISTER_USER_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
      }
      break
    case REGISTER_USER_FAILED:
      state = {
        ...state,
        loading: false,
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default account
