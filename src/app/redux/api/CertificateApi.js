import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT + "certificate"

export const createCertificate = (employeeId, data) => {
	const url = API_PATH + `?employeeId=${employeeId}`;
	return axios.post(url, data);
};

export const getCertificateByEmployeeId = (id) => {
	const url = API_PATH + `?employeeId=${id}`;
	return axios.get(url);
};

export const deleteCertificate = (id) => {
	const url = API_PATH + "/" + id;
	return axios.delete(url);
};

export const updateCertificate = (data) => {
	const url = API_PATH + "/" + data.id;
	return axios.put(url, data);
};
