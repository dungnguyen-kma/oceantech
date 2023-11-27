import { call, put, takeLatest } from "redux-saga/effects";
import * as EC from "../constants/EmployeeConstants";
import * as employeeApi from "../api/EmployeeApi";
import * as employeeActions from "../actions/EmployeeActions";
import { toast } from "react-toastify";
import { RESPONSE_STATUS_CODE, STATUS_TABLE } from "../constants/Status";
import { API_ENPOINT } from "app/appConfig";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function* searchEmployeeSaga({ payload }) {
  try {
    const response = yield call(employeeApi.searchEmployees, payload);
    if (response?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      yield put(employeeActions.searchSuccess(response?.data));
    } else {
      yield toast.error(response?.data?.error);
    }
  } catch (error) {
    yield put(employeeActions.searchError(error));
  }
}

function* uploadImageSaga(file) {
  try {
    const response = yield call(employeeApi.uploadImageEmployee, file);
    const imgUrl = yield API_ENPOINT + "public/image/" + response?.data?.name;
    return imgUrl;
  } catch (error) {
    yield put(employeeActions.uploadImageError(error));
  }
}

function* createEmployeeSaga({ payload }) {
  try {
    const imgUrl = yield call(uploadImageSaga, payload.file);
    const newEmployee = { ...payload, image: imgUrl };
    const response = yield call(employeeApi.createEmployee, newEmployee);
    if (response?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      yield put(employeeActions.createSuccess(response?.data?.data));
      yield searchEmployeeSaga({
        payload: { listStatus: STATUS_TABLE.ADD_EMPLOYEE },
      });
    } else {
      yield toast.error(response?.data?.message);
    }
  } catch (error) {
    yield put(employeeActions.createError(error));
  }
}

function* updateEmployeeSaga({
  payload,
  listStatus,
  search,
}) {
  try {
    const response = yield call(employeeApi.updateEmployee, payload);
    if (response?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      yield put(employeeActions.updateSuccess());
      if (search) {
        yield searchEmployeeSaga({
          payload: { listStatus: listStatus },
        });
        toast.success("Cập nhật nhân viên thành công!");
      } else {
        yield toast.error(response?.data?.message);
      }
    }
  } catch (error) {
    yield put(employeeActions.updateError(error));
  }
}

function* deleteEmployeeSaga({ payload }) {
  try {
    const response = yield call(employeeApi.deleteEmployee, payload);
    if (response?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      yield put(employeeActions.deleteSuccess());
      yield searchEmployeeSaga({ listStatus: STATUS_TABLE.ADD_EMPLOYEE });
      yield toast.success("Xóa nhân viên thành công!");
    } else {
      yield toast.error(response?.data?.message);
    }
  } catch (error) {
    yield put(employeeActions.deleteError(error));
  }
}

function* getByEmployeeIdSaga({ payload }) {
  try {
    const response = yield call(employeeApi.getByEmployeeId, payload);
    if (response?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      yield put(employeeActions.getByIdSuccess(response?.data?.data));
    } else {
      yield toast.error(response?.data?.message);
    }
  } catch (error) {
    yield put(employeeActions.getByIdError(error));
  }
}

export function* employeeSaga() {
  yield takeLatest(EC.SEARCH_REQUEST, searchEmployeeSaga);
  yield takeLatest(EC.CREATE_REQUEST, createEmployeeSaga);
  yield takeLatest(EC.UPDATE_REQUEST, updateEmployeeSaga);
  yield takeLatest(EC.DELETE_REQUEST, deleteEmployeeSaga);
  yield takeLatest(EC.GET_BY_ID_REQUEST, getByEmployeeIdSaga);
}
