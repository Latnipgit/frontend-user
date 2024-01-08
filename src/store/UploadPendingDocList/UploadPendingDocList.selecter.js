import { createSelector } from 'reselect';

const selectUploadPendingListReducer = (state) => state.UploadPendingListReducer;

export const selectUploadingPendingListData = createSelector(
  [selectUploadPendingListReducer],
  (transactionuploainglist) => transactionuploainglist.uploadPendingList

);

export const selectdashboardAdminDataMap = createSelector(
  [selectUploadingPendingListData],
  (transactionuploainglist) => transactionuploainglist
);
export const selectDoardAdminDataLoading = createSelector(
  [selectUploadPendingListReducer],
  (transactionuploainglist) => transactionuploainglist.loading
);

