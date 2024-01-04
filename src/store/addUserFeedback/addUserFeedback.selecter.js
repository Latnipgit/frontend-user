import { createSelector } from 'reselect';

const SelectUserFeedbackReducer = (state) => state.ReportDefulterPreviewReducer;

export const selectReportDefPreviwData = createSelector(
  [SelectUserFeedbackReducer],
  (addUserFeedbackArray) => addUserFeedbackArray.addUserFeedbackArray
);

export const selectdashboardAdminDataMap = createSelector(
  [SelectUserFeedbackReducer],
  (addUserFeedbackArray) => addUserFeedbackArray
);
/* export const selectDoardAdminDataLoading = createSelector(
  [SelectUserFeedbackReducer],
  (reportPreviwData) => reportPreviwData.loading
); */

