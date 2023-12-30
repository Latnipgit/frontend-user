import {
  FETCH_REPORT_DEFULTER_PREVIEW_START,
  FETCH_REPORT_DEFULTER_PREVIEW_SUCCESS,
  FETCH_REPORT_DEFULTER_PREVIEW_FAILED,
} from "./ReportDefulterPreview.type"

export const REPORT_DEFULTER_PREVIEW_INITIAL_STATE = {
  allInvoicePreviewFolder: [],
  loading: false,
  error: null,
}

export const ReportDefulterPreviewReducer = (
  state = REPORT_DEFULTER_PREVIEW_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_REPORT_DEFULTER_PREVIEW_START:
      return { ...state, loading: true }
    case FETCH_REPORT_DEFULTER_PREVIEW_SUCCESS:
      return { ...state, loading: false, allInvoicePreviewFolder: payload }
    case FETCH_REPORT_DEFULTER_PREVIEW_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
