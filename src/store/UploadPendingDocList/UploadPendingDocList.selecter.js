import { createSelector } from 'reselect';

const selectUploadPendingListReducer = (state) => state.UploadPendingListReducer;

export const selectUploadingPendingListData = createSelector(
  [selectUploadPendingListReducer],
  (transactionuploainglist) => transactionuploainglist.uploadPendingList != undefined ? transactionuploainglist.uploadPendingList : []

);

export const selectTransactionsRaisedByMeData = createSelector(
  [selectUploadingPendingListData],
  (transactionuploainglist) => transactionuploainglist.transactionsRaisedByMe != undefined ? transactionuploainglist.transactionsRaisedByMe : []

);

export const selectTransactionsSentToMeData = createSelector(
  [selectUploadingPendingListData],
  (transactionuploainglist) => transactionuploainglist.transactionsSentToMe != undefined ? transactionuploainglist.transactionsSentToMe : []

);


export const selectdashboardAdminDataMap = createSelector(
  [selectUploadingPendingListData],
  (transactionuploainglist) => transactionuploainglist
);
export const selectDoardAdminDataLoading = createSelector(
  [selectUploadPendingListReducer],
  (transactionuploainglist) => transactionuploainglist.loading
);


export const selectUploadPendigDocOpen = createSelector(
  [selectUploadPendingListReducer],
  (transactionuploainglist) => transactionuploainglist.isUploadPendingdocOpen
)

export const uploadPendigDocSelector = createSelector(
  [selectUploadPendingListReducer],
  (transactionuploainglist) => transactionuploainglist.uploadPendingDocID != undefined ? transactionuploainglist.uploadPendingDocID.response : []
)
