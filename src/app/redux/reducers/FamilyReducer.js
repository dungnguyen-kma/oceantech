import * as FA from "../constants/FamilyConstants";

const initialState = {
  families: null,
  error: null,
  loading: false,
};

const FamilyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FA.GET_BY_EMPLOYEE_ID_REQUEST:
    case FA.CREATE_REQUEST:
    case FA.DELETE_REQUEST:
    case FA.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FA.GET_BY_EMPLOYEE_ID_ERROR:
    case FA.CREATE_ERROR:
    case FA.DELETE_ERROR:
    case FA.UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FA.GET_BY_EMPLOYEE_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        families: action.payload,
      };
    case FA.CREATE_SUCCESS:
    case FA.DELETE_SUCCESS:
    case FA.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return { ...state };
  }
};

export default FamilyReducer;
