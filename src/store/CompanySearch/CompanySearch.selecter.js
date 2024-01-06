import { createSelector } from 'reselect';
import moment from 'moment'
const selectCompanySearchReducer = (state) => state.CompanySearchReducer;

export const selectCompanySearchList = createSelector(
  [selectCompanySearchReducer],
  (reportMeDefulter) => reportMeDefulter.companySearchList
);

export const selectdashboardAdminDataMap = createSelector(
  [selectCompanySearchList],
  (reportMeDefulter) => {
    debugger
    return reportMeDefulter.map((list, i) => {
      debugger
      const { createdAt } = list
      let DueSince = moment.utc(createdAt).format('DD-MM-YY');
      let SrNo = i + 1
      let rating = list.ratings.length !== 0 ? list.ratings[0].rating : "";
      let CompanyName = list.companyName !== undefined ? list.companyName : "";
      let PANCARD = list.companyPan !== undefined ? list.companyPan : "";
      let GST = list.gstin !== undefined ? list.gstin : "";
      let amoutnDue = 50000
      return { SrNo, CompanyName, GST, PANCARD, rating, DueSince, amoutnDue }
    })
  }
);
export const selectDoardAdminDataLoading = createSelector(
  [selectCompanySearchReducer],
  (reportMeDefulter) => reportMeDefulter.loading
);

