import {
  GET_ALL_SUBSCRIPTION_PACKAGE,
  GET_ALL_SUBSCRIPTION_PACKAGE_SUCCESS,
  GET_ALL_SUBSCRIPTION_PACKAGE_FAILED,
  ADD_SUBSCRIPTION_TO_USER,
  ADD_SUBSCRIPTION_TO_USER_FAILED,
  ADD_SUBSCRIPTION_TO_USER_SUCCESS

} from "./SsubscriptionActionType"
import { createAction } from "store/utils/reducer/reducer.utils"

export const getSubscriptionList = (data) => createAction(GET_ALL_SUBSCRIPTION_PACKAGE, data)

export const getSubscriptionListSuccess = (data) => createAction(GET_ALL_SUBSCRIPTION_PACKAGE_SUCCESS, data)

export const getSubscriptionListFailure = error => createAction(GET_ALL_SUBSCRIPTION_PACKAGE_FAILED, error)


export const addSubscriptionToUser = (data) => createAction(ADD_SUBSCRIPTION_TO_USER, data)

export const addSubscriptionToUserSuccess = (data) => createAction(ADD_SUBSCRIPTION_TO_USER_SUCCESS, data)

export const addSubscriptionToUserFailure = error => createAction(ADD_SUBSCRIPTION_TO_USER_FAILED, error)

