import {
  FETCH_UPLOADING_PENDING_DOC_LIST_START,
  FETCH_UPLOADING_PENDING_DOC_LIST_SUCCESS,
  FETCH_UPLOADING_PENDING_DOC_LIST_FAILED,
  UPLOAD_PENDING_DOCUMENT_ID,
  UPLOAD_PENDING_DOCUMENT_ID_SUCCESS,
  UPLOAD_PENDING_DOCUMENT_ID_FAIL,
  GET_UPLOAD_PENDING_DOCUMENT_OPEN,
} from "./UploadPendingDocList.type"

export const UPLOADING_PENDING_DOC_LIST_INITIAL_STATE = {
  uploadPendingList: [],
  isUploadPendingdocOpen: false,
  uploadPendingDocID: [],
  uploadPendingDocIDSuccess: false,
  loading: false,
  error: null,
}

export const UploadPendingListReducer = (
  state = UPLOADING_PENDING_DOC_LIST_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_UPLOADING_PENDING_DOC_LIST_START:
      return { ...state, loading: true }
    case FETCH_UPLOADING_PENDING_DOC_LIST_SUCCESS:
      return { ...state, loading: false, uploadPendingList: payload }
    case FETCH_UPLOADING_PENDING_DOC_LIST_FAILED:
      return { ...state, loading: false, error: payload }

    case GET_UPLOAD_PENDING_DOCUMENT_OPEN:
      return { ...state, isUploadPendingdocOpen: payload, }
    case UPLOAD_PENDING_DOCUMENT_ID:
      return { ...state, uploadPendingDocID: payload, }
    case UPLOAD_PENDING_DOCUMENT_ID_SUCCESS:
      return { ...state, uploadPendingDocIDSuccess: payload, }
    case UPLOAD_PENDING_DOCUMENT_ID_FAIL:
      return { ...state, error: payload, }

    default:
      return state
  }
}
