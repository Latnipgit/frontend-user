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
    let SrNo = reportMeDefulter.length + 1
    return reportMeDefulter.map((list) => {
      const { id, dueFrom, totalAmount } = list
      SrNo--
      const aatingArray = list.ratings.length !== 0 ? list.ratings.map(x => {
        if (x.rating != undefined) {
          return +x.rating
        }
      }).filter((y) => y !== undefined) : ''
      const rating = aatingArray !== '' ? aatingArray.reduce((x, y) => x + y, 0) / aatingArray.length : "";
      const CompanyName = list.companyName !== undefined ? list.companyName : "";
      const PANCARD = list.companyPan !== undefined ? list.companyPan : "";
      const GST = list.gstin !== undefined ? list.gstin : "";
      return { SrNo, id, CompanyName, GST, PANCARD, rating, dueFrom, totalAmount }
    })
  }
);
export const selectDoardAdminDataLoading = createSelector(
  [selectCompanySearchReducer],
  (reportMeDefulter) => reportMeDefulter.loading
);

export const getAllCompanyListSelector = createSelector(
  [selectCompanySearchReducer],
  (reportMeDefulter) => reportMeDefulter.companyList
);
