import { takeLatest, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RESPONSE_STATUS_CODE } from "../constants/Status";
import * as FA from "../constants/FamilyConstants";
import * as familyActions from "../actions/FamilyActions";
import * as familyApi from "../api/FamilyApi";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function* getFamilyByEmployeeId({ payload }) {
  try {
    const res = yield call(familyApi.getFamilyByEmployeeId, payload);
    if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      yield put(familyActions.getByEmployeeIdSuccess(res?.data?.data));
    } else {
      yield toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(familyActions.getByEmployeeIdError());
  }
}

function* createFamily({ payload }) {
  try {
    const { employeeId, data } = payload;
    const res = yield call(familyApi.createFamilyEmployee, employeeId, data);
    if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      yield put(familyActions.createSuccess());
      toast.success("Thêm quan hệ thành công !");
      yield getFamilyByEmployeeId({ payload: employeeId });
    } else {
      yield toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(familyActions.createError());
  }
}

function* deleteFamily({ payload }) {
  try {
    const { employeeId, familyId } = payload;
    const res = yield call(familyApi.deleteFamilyEmployee, familyId);
    if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      yield put(familyActions.deleteSuccess());
      toast.success("Xóa quan hệ thành công !");
      yield getFamilyByEmployeeId({ payload: employeeId });
    } else {
      yield toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(familyActions.deleteError());
  }
}

function* updateFamily({ payload }) {
  try {
    const { employeeId, data } = payload;
    const res = yield call(familyApi.updateFamilyEmployee, data);
    if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      yield put(familyActions.updateSuccess());
      toast.success("Cập nhật quan hệ thành công !");
      yield getFamilyByEmployeeId({ payload: employeeId });
    } else {
      yield toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(familyActions.updateError());
  }
}

export function* familySaga() {
  yield takeLatest(FA.GET_BY_EMPLOYEE_ID_REQUEST, getFamilyByEmployeeId);
  yield takeLatest(FA.CREATE_REQUEST, createFamily);
  yield takeLatest(FA.DELETE_REQUEST, deleteFamily);
  yield takeLatest(FA.UPDATE_REQUEST, updateFamily);
}
