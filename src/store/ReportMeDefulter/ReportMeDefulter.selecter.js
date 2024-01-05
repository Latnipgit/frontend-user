import { createSelector } from 'reselect';

const selectReportMeDefulterReducer = (state) => state.ReportMeDefulterReducer;

export const selectReportMeDefData = createSelector(
  [selectReportMeDefulterReducer],
  (reportMeDefulter) => reportMeDefulter.reportMeDefulterList
);

export const selectdashboardAdminDataMap = createSelector(
  [selectReportMeDefData],
  (reportMeDefulter) => reportMeDefulter
);
export const selectDoardAdminDataLoading = createSelector(
  [selectReportMeDefulterReducer],
  (reportMeDefulter) => reportMeDefulter.loading
);

