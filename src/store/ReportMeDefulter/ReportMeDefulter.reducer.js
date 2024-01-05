import {
  FETCH_REPORT_ME_DEFULTER_START,
  FETCH_REPORT_ME_DEFULTER_SUCCESS,
  FETCH_REPORT_ME_DEFULTER_FAILED,
} from "./ReportMeDefulter.type"

export const REPORT_ME_DEFULTER_INITIAL_STATE = {
  reportMeDefulterList: [],
  loading: false,
  error: null,
}

export const ReportMeDefulterReducer = (
  state = REPORT_ME_DEFULTER_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_REPORT_ME_DEFULTER_START:
      return { ...state, loading: true }
    case FETCH_REPORT_ME_DEFULTER_SUCCESS:
      return { ...state, loading: false, reportMeDefulterList: payload }
    case FETCH_REPORT_ME_DEFULTER_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
