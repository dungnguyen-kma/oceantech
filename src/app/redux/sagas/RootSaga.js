import { all } from "redux-saga/effects";
import { employeeSaga } from "./EmployeeSaga";
import { certificateSaga } from "./CertificateSaga";
import { familySaga } from "./FamilySaga";

export default function* rootSaga() {
  yield all([
    employeeSaga(), 
    certificateSaga(), 
    familySaga()
  ]);
}
