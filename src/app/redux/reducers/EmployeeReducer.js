import * as EC from "../constants/EmployeeConstants";

const initialState = {
  employees: null,
  employee: null,
  employeeCreated: null,
  error: null,
  loading: false,
  isView: false,
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EC.SEARCH_REQUEST:
    case EC.CREATE_REQUEST:
    case EC.UPLOAD_IMAGE_REQUEST:
    case EC.DELETE_REQUEST:
    case EC.UPDATE_REQUEST:
    case EC.GET_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EC.CREATE_ERROR:
    case EC.UPLOAD_IMAGE_ERROR:
    case EC.SEARCH_ERROR:
    case EC.DELETE_ERROR:
    case EC.UPDATE_ERROR:
    case EC.GET_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EC.SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
        error: null,
      };
    case EC.UPLOAD_IMAGE_SUCCESS:
    case EC.DELETE_SUCCESS:
    case EC.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case EC.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        employeeCreated: action.payload,
      };
    case EC.GET_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        employee: action.payload,
      };
    case EC.SET_IS_VIEW:
      return {
        ...state,
        isView: action.payload,
      };
    case EC.SET_EMPLOYEE_CREATED:
      return {
        ...state,
        employeeCreated: action.payload,
      };
    default:
      return { ...state };
  }
};

export default EmployeeReducer;
