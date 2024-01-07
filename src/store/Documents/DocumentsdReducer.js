import {
  GET_GENERAL_DOCUMENTS,
  GET_GENERAL_DOCUMENTS_FAIL,
  GET_GENERAL_DOCUMENTS_SUCCESS
} from "./documents.actionTypes"

const INIT_STATE = {
  generalDocuments: [],
  error: {},
}

const documentsReducer = (state = INIT_STATE, action) => {
  //  
  switch (action.type) {
    case GET_GENERAL_DOCUMENTS_SUCCESS:
      return {
        ...state,
        generalDocuments: action.payload,
      }

    case GET_GENERAL_DOCUMENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default documentsReducer
