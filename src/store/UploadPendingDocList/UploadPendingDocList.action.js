import {
  FETCH_UPLOADING_PENDING_DOC_LIST_START,
  FETCH_UPLOADING_PENDING_DOC_LIST_SUCCESS,
  FETCH_UPLOADING_PENDING_DOC_LIST_FAILED,
  UPLOAD_PENDING_DOCUMENT_ID,
  UPLOAD_PENDING_DOCUMENT_ID_SUCCESS,
  UPLOAD_PENDING_DOCUMENT_ID_FAIL,
  GET_UPLOAD_PENDING_DOCUMENT_OPEN,
} from "./UploadPendingDocList.type"
import { createAction } from "store/utils/reducer/reducer.utils"

export const fetchUploadPendingListStart = () => createAction(FETCH_UPLOADING_PENDING_DOC_LIST_START)
export const fetchUploadPendingListSuccess = (UploadPendingListArray) => createAction(FETCH_UPLOADING_PENDING_DOC_LIST_SUCCESS, UploadPendingListArray)
export const fetchUploadPendingListFailure = error => createAction(FETCH_UPLOADING_PENDING_DOC_LIST_FAILED, error)

export const setUploadPednigDocOpen = (boolean) => createAction(GET_UPLOAD_PENDING_DOCUMENT_OPEN, boolean);

export const uploadUploadPednigDocID = (data) => createAction(UPLOAD_PENDING_DOCUMENT_ID, data)
export const uploadUploadPednigDocIDSuccess = (data) => createAction(UPLOAD_PENDING_DOCUMENT_ID_SUCCESS, data)
export const uploadUploadPednigDocIDFail = (data) => createAction(UPLOAD_PENDING_DOCUMENT_ID_FAIL, data)
