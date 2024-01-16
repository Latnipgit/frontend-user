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
    return reportMeDefulter.map((list, i) => {

      const { createdAt, id } = list
      let DueSince = moment.utc(createdAt).format("DD-MM-YYYY");
      let SrNo = i + 1
      const aatingArray = list.ratings.length !== 0 ? list.ratings.map(x => {
        if (x.rating != undefined) {
          return +x.rating
        }
      }).filter((y) => y !== undefined) : ''
      let rating = aatingArray !== '' ? aatingArray.reduce((x, y) => x + y, 0) / aatingArray.length : "";
      let CompanyName = list.companyName !== undefined ? list.companyName : "";
      let PANCARD = list.companyPan !== undefined ? list.companyPan : "";
      let GST = list.gstin !== undefined ? list.gstin : "";
      let amoutnDue = 50000
      return { SrNo, id, CompanyName, GST, PANCARD, rating, DueSince, amoutnDue }
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
