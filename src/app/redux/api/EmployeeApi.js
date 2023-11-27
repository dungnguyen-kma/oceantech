import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT + "employee/";

export const searchEmployees = (searchObj) => {
  let url = API_PATH + "search";
  const { pageIndex, pageSize, keyword, listStatus } = searchObj;
  return axios.get(url, {
    params: {
      pageIndex,
      pageSize,
      keyword,
      listStatus,
    },
  });
};

export const uploadImageEmployee = (file) => {
	const url = API_PATH + "upload-image";
	const formData = new FormData();
	formData.append("file", file);
	return axios.post(url, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const createEmployee = (data) => {
	const url = API_PATH;
	return axios.post(url, data);
};

export const deleteEmployee = (id) => {
	const url = API_PATH + id;
	return axios.delete(url);
};

export const updateEmployee = (data) => {
	const url = API_PATH + data.id;
	return axios.put(url, data);
};

export const getByEmployeeId = (id) => {
	const url = API_PATH + id;
	return axios.get(url);
};