import { createSelector } from 'reselect';

const SelectInitiPaytVerifReducer = (state) => state.initiatePaymentVerificationReducer;

export const selectInitiPaytVerifData = createSelector(
  [SelectInitiPaytVerifReducer],
  (InitiPaytVerifData) => InitiPaytVerifData.initiatePaytVerifArray
);

export const selectdashboardAdminDataMap = createSelector(
  [SelectInitiPaytVerifReducer],
  (InitiPaytVerifData) => InitiPaytVerifData
);
/* export const selectDoardAdminDataLoading = createSelector(
  [SelectInitiPaytVerifReducer],
  (reportPreviwData) => reportPreviwData.loading
); */

