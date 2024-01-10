import { createSelector } from 'reselect';
import moment from 'moment'
const selectCompanySearchViewReducer = (state) => state.CompanySearchViewReducer;


export const selectCompanySearchVeiwDatilsList = createSelector(
  [selectCompanySearchViewReducer],
  (reportMeDefulter) => reportMeDefulter.companySearchViewDatailsSuccess != undefined ? reportMeDefulter.companySearchViewDatailsSuccess : []
);

