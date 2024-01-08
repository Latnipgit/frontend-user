import {
  FETCH_UPLOADING_PENDING_DOC_LIST_START,
  FETCH_UPLOADING_PENDING_DOC_LIST_SUCCESS,
  FETCH_UPLOADING_PENDING_DOC_LIST_FAILED,
} from "./UploadPendingDocList.type"
import { createAction } from "store/utils/reducer/reducer.utils"

export const fetchUploadPendingListStart = () => createAction(FETCH_UPLOADING_PENDING_DOC_LIST_START)

export const fetchUploadPendingListSuccess = (UploadPendingListArray) => createAction(FETCH_UPLOADING_PENDING_DOC_LIST_SUCCESS, UploadPendingListArray)

export const fetchUploadPendingListFailure = error => createAction(FETCH_UPLOADING_PENDING_DOC_LIST_FAILED, error)
