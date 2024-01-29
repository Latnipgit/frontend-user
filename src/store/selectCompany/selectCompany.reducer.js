import { SELECT_COMPANY_OPNE } from "./selectCompany.action";

const INIT_STATE = {
  isSelectCompanyOpen: false,
}

export const SelectCompanyReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SELECT_COMPANY_OPNE:
      return { ...state, isSelectCompanyOpen: payload, }
    default:
      return state
  }
}
