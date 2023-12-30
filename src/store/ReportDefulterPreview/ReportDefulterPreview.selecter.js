import { createSelector } from 'reselect';

const selectReportDefulterPreviewReducer = (state) => state.ReportDefulterPreviewReducer;

export const selectReportDefPreviwData = createSelector(
  [selectReportDefulterPreviewReducer],
  (reportPreviwData) => reportPreviwData.allInvoicePreviewFolder
);

export const selectdashboardAdminDataMap = createSelector(
  [selectReportDefPreviwData],
  (reportPreviwData) => reportPreviwData
);
export const selectDoardAdminDataLoading = createSelector(
  [selectReportDefulterPreviewReducer],
  (reportPreviwData) => reportPreviwData.loading
);

