import {
  GET_ALL_SUBSCRIPTION_PACKAGE,
  GET_ALL_SUBSCRIPTION_PACKAGE_FAILED,
  GET_ALL_SUBSCRIPTION_PACKAGE_SUCCESS,
  ADD_SUBSCRIPTION_TO_USER,
  ADD_SUBSCRIPTION_TO_USER_FAILED,
  ADD_SUBSCRIPTION_TO_USER_SUCCESS
} from "./SsubscriptionActionType"

export const SUBSCRIPTION_pACKAGE_INITIAL = {
  SubscriptionList: [],
addSubscribe:[],
  
  loading: false,
  error: null,
}

export const SubscriptionReducer = (
  state = SUBSCRIPTION_pACKAGE_INITIAL,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case GET_ALL_SUBSCRIPTION_PACKAGE:
      return { ...state, loading: false, SubscriptionList: payload }
    case GET_ALL_SUBSCRIPTION_PACKAGE_SUCCESS:
      return { ...state, loading: false, SubscriptionList: payload }
    case GET_ALL_SUBSCRIPTION_PACKAGE_FAILED:
      return { ...state, loading: false, error: payload }
      case ADD_SUBSCRIPTION_TO_USER:
        return { ...state, loading: false, addSubscribe: payload }
      case ADD_SUBSCRIPTION_TO_USER_SUCCESS:
        return { ...state, loading: false, addSubscribe: payload }
      case ADD_SUBSCRIPTION_TO_USER_FAILED:
        return { ...state, loading: false, error: payload }
   
    default:
      return state
  }
}
