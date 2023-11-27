import * as FA from "../constants/FamilyConstants";

export const getByEmployeeIdRequest = (id) => {
  return {
    type: FA.GET_BY_EMPLOYEE_ID_REQUEST,
    payload: id,
  };
};

export const getByEmployeeIdSuccess = (data) => {
  return {
    type: FA.GET_BY_EMPLOYEE_ID_SUCCESS,
    payload: data,
  };
};

export const getByEmployeeIdError = (error) => {
  return {
    type: FA.GET_BY_EMPLOYEE_ID_ERROR,
    payload: error,
  };
};

export const createRequest = (data) => {
  return {
    type: FA.CREATE_REQUEST,
    payload: data,
  };
};

export const createSuccess = (data) => {
  return {
    type: FA.CREATE_SUCCESS,
    payload: data,
  };
};

export const createError = (error) => {
  return {
    type: FA.CREATE_ERROR,
    payload: error,
  };
};

export const updateRequest = (data) => {
  return {
    type: FA.UPDATE_REQUEST,
    payload: data,
  };
};

export const updateSuccess = (data) => {
  return {
    type: FA.UPDATE_SUCCESS,
    payload: data,
  };
};

export const updateError = (error) => {
  return {
    type: FA.UPDATE_ERROR,
    payload: error,
  };
};

export const deleteRequest = (data) => {
  return {
    type: FA.DELETE_REQUEST,
    payload: data,
  };
};

export const deleteSuccess = (data) => {
  return {
    type: FA.DELETE_SUCCESS,
    payload: data,
  };
};

export const deleteError = (error) => {
  return {
    type: FA.DELETE_ERROR,
    payload: error,
  };
};
