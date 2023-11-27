import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT + "employee-family";

export const createFamilyEmployee = (employeeId, data) => {
	const url = API_PATH + `?employeeId=${employeeId}`;
	return axios.post(url, data);
};

export const deleteFamilyEmployee = (id) => {
	const url = API_PATH + "/" + id;
	return axios.delete(url);
};

export const updateFamilyEmployee = (data) => {
	const url = API_PATH + "/" + data?.id;
	return axios.put(url, data);
};

export const getFamilyByEmployeeId = (employeeId) => {
	const url = API_PATH + `?employeeId=${employeeId}`;
	return axios.get(url);
};
