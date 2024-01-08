import {
  FETCH_UPLOADING_PENDING_DOC_LIST_START,
  FETCH_UPLOADING_PENDING_DOC_LIST_SUCCESS,
  FETCH_UPLOADING_PENDING_DOC_LIST_FAILED,
} from "./UploadPendingDocList.type"

export const UPLOADING_PENDING_DOC_LIST_INITIAL_STATE = {
  uploadPendingList: [],
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
    default:
      return state
  }
}
