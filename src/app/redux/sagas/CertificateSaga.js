import { takeEvery, call, put, takeLatest } from "redux-saga/effects";
import { RESPONSE_STATUS_CODE } from "../constants/Status";
import * as certificateApi from "../api/CertificateApi";
import { toast } from "react-toastify";
import * as CC from "../constants/CertificateConstants";
import * as certificateActions from "../actions/CertificateActions";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function* getCertificateByEmployeeId({ payload }) {
	try {
		const res = yield call(certificateApi.getCertificateByEmployeeId, payload);
		if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
			yield put(certificateActions.getByEmployeeIdSuccess(res?.data?.data));
		} else {
			yield toast.error(res?.data?.message);
		}
	} catch (error) {
		yield put(certificateActions.getByEmployeeIdError());
	}
}

function* createCertificate({ payload }) {
	try {
		const { employeeId, data } = payload;
		const res = yield call(certificateApi.createCertificate, employeeId, data);
		if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
			yield put(certificateActions.createSuccess());
			toast.success("Thêm văn bằng thành công !");
			yield getCertificateByEmployeeId({ payload: employeeId });
		} else {
			yield toast.error(res?.data?.message);
		}
	} catch (error) {
		yield put(certificateActions.createError());
	}
}

function* deleteCertificate({ payload }) {
	try {
		const { employeeId, certificateId } = payload;
		const res = yield call(certificateApi.deleteCertificate, certificateId);
		if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
			yield put(certificateActions.deleteSuccess());
			toast.success("Xóa văn bằng thành công !");
			yield getCertificateByEmployeeId({ payload: employeeId });
		} else {
			yield toast.error(res?.data?.message);
		}
	} catch (error) {
		yield put(certificateActions.deleteError());
	}
}

function* updateCertificate({ payload }) {
	try {
		const { employeeId, data } = payload;
		const res = yield call(certificateApi.updateCertificate, data);
		if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
			yield put(certificateActions.updateSuccess());
			toast.success("Cập nhật văn bằng thành công !");
			yield getCertificateByEmployeeId({ payload: employeeId });
		} else {
			yield toast.error(res?.data?.message);
		}
	} catch (error) {
		yield put(certificateActions.updateError());
	}
}

export function* certificateSaga() {
    yield takeLatest(
		CC.GET_BY_EMPLOYEE_ID_REQUEST,
		getCertificateByEmployeeId
	);
	yield takeLatest(CC.CREATE_REQUEST, createCertificate);
	yield takeLatest(CC.DELETE_REQUEST, deleteCertificate);
	yield takeLatest(CC.UPDATE_REQUEST, updateCertificate);
}
