

import {
  CHANGE_FIRST_PASSWORD,
  CHANGE_FIRST_PASSWORD_SUCCESS
} from './actionTypes'

  const INIT_STATE = {
  
    error: {},
    changepswrd: false
  }
  
  const changePasswordReducer = (state = INIT_STATE, action) => {
    //  
    switch (action.type) {
     
          case CHANGE_FIRST_PASSWORD  :
            return {
              ...state,
              changepswrd: false,

            }
            case CHANGE_FIRST_PASSWORD_SUCCESS  :
              return {
                ...state,
                changepswrd: true
  
              }
  
      default:
        return state
    }
  }
  
  export default changePasswordReducer
  