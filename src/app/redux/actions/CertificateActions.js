import * as CC from "../constants/CertificateConstants";

export const getByEmployeeIdRequest = (id) => {
  return {
    type: CC.GET_BY_EMPLOYEE_ID_REQUEST,
    payload: id,
  };
};

export const getByEmployeeIdSuccess = (data) => {
  return {
    type: CC.GET_BY_EMPLOYEE_ID_SUCCESS,
    payload: data,
  };
};

export const getByEmployeeIdError = (error) => {
  return {
    type: CC.GET_BY_EMPLOYEE_ID_ERROR,
    payload: error,
  };
};

export const createRequest = (data) => {
  return {
    type: CC.CREATE_REQUEST,
    payload: data,
  };
};

export const createSuccess = (data) => {
  return {
    type: CC.CREATE_SUCCESS,
    payload: data,
  };
};

export const createError = (error) => {
  return {
    type: CC.CREATE_ERROR,
    payload: error,
  };
};

export const updateRequest = (data) => {
  return {
    type: CC.UPDATE_REQUEST,
    payload: data,
  };
};

export const updateSuccess = (data) => {
  return {
    type: CC.UPDATE_SUCCESS,
    payload: data,
  };
};

export const updateError = (error) => {
  return {
    type: CC.UPDATE_ERROR,
    payload: error,
  };
};

export const deleteRequest = (data) => {
  return {
    type: CC.DELETE_REQUEST,
    payload: data,
  };
};

export const deleteSuccess = (data) => {
  return {
    type: CC.UPDATE_SUCCESS,
    payload: data,
  };
};

export const deleteError = (error) => {
  return {
    type: CC.DELETE_ERROR,
    payload: error,
  };
};
