

import { SEARCH_COMPANY, SEARCH_COMPANY_SUCCESS, SEARCH_COMPANY_FAIL } from './actionTypes'

const INIT_STATE = {
  companyList: [],
  error: {},
  isLoding: false
}

const searchCompany = (state = INIT_STATE, action) => {

  switch (action.type) {
    case SEARCH_COMPANY:
      return {
        ...state,
        companyList: action.payload,
        isLoding: true
      }

    case SEARCH_COMPANY_SUCCESS:
      return {
        ...state,
        error: action.payload,
        isLoding: false
      }

    default:
      return state
  }
}

export default searchCompany
