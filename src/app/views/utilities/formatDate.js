import moment from "moment";

export const formatDate = (date) => {
	const result = moment(date).format("DD/MM/YYYY");
	return result;
};

export const formatDateInput = (date) => {
	const result = moment(date).format("YYYY-MM-DD");
	return result;
};


