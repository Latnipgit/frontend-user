import {
  FETCH_REPORT_DEFULTER_PREVIEW_START,
  FETCH_REPORT_DEFULTER_PREVIEW_SUCCESS,
  FETCH_REPORT_DEFULTER_PREVIEW_FAILED,
} from "./ReportDefulterPreview.type"
import { createAction } from "store/utils/reducer/reducer.utils"

export const fetchReportDefulterPreviewStart = () =>
  createAction(FETCH_REPORT_DEFULTER_PREVIEW_START)

export const fetchReportDefulterPreviewSuccess = ReportDefulterPreviewArray => {
  return createAction(FETCH_REPORT_DEFULTER_PREVIEW_SUCCESS, ReportDefulterPreviewArray)
}

export const fetchReportDefulterPreviewFailure = error =>
  createAction(FETCH_REPORT_DEFULTER_PREVIEW_FAILED, error)
