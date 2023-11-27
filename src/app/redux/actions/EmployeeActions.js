import * as EC from "../constants/EmployeeConstants";

export const searchRequest = (data) => {
  return {
    type: EC.SEARCH_REQUEST,
    payload: data,
  };
};

export const searchSuccess = (data) => {
  return {
    type: EC.SEARCH_SUCCESS,
    payload: data,
  };
};

export const searchError = (error) => {
  return {
    type: EC.SEARCH_ERROR,
    payload: error,
  };
};

export const createRequest = (data) => {
  return {
    type: EC.CREATE_REQUEST,
    payload: data,
  };
};

export const createSuccess = (data) => {
  return {
    type: EC.CREATE_SUCCESS,
    payload: data,
  };
};

export const createError = (error) => {
  return {
    type: EC.CREATE_ERROR,
    payload: error,
  };
};

export const updateRequest = (data, listStatus, search) => {
  return {
    type: EC.UPDATE_REQUEST,
    payload: data,
    listStatus,
    search,
  };
};

export const updateSuccess = (data) => {
  return {
    type: EC.UPDATE_SUCCESS,
    payload: data,
  };
};

export const updateError = (error) => {
  return {
    type: EC.UPDATE_ERROR,
    payload: error,
  };
};

export const getById = (id) => {
  return {
    type: EC.GET_BY_ID_REQUEST,
    payload: id,
  };
};

export const getByIdSuccess = (data) => {
  return {
    type: EC.GET_BY_ID_SUCCESS,
    payload: data,
  };
};

export const getByIdError = (error) => {
  return {
    type: EC.GET_BY_ID_ERROR,
    payload: error,
  };
};

export const deleteRequest = (id) => {
  return {
    type: EC.DELETE_REQUEST,
    payload: id,
  };
};

export const deleteSuccess = (data) => {
  return {
    type: EC.DELETE_SUCCESS,
    payload: data,
  };
};

export const deleteError = (error) => {
  return {
    type: EC.DELETE_ERROR,
    payload: error,
  };
};

export const setIsView = (data) => {
  return {
    type: EC.SET_IS_VIEW,
    payload: data,
  };
};

export const setEmployeeCreated = (data) => {
  return {
    type: EC.SET_EMPLOYEE_CREATED,
    payload: data,
  };
};

export const uploadImageRequest = (data) => {
  return {
    type: EC.UPLOAD_IMAGE_REQUEST,
    payload: data,
  };
};
export const uploadImageSuccess = (data) => {
  return {
    type: EC.UPLOAD_IMAGE_SUCCESS,
    payload: data,
  };
};
export const uploadImageError = (error) => {
  return {
    type: EC.UPLOAD_IMAGE_ERROR,
    payload: error,
  };
};
