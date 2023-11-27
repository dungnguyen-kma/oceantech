export const RESPONSE_STATUS_CODE = {
	SUCCESS: 200,
};

export const SUBMIT_PROFILE_STATUS = {
	1: "Tạo mới",
	2: "Chờ xử lý",
	3: "Đã được chấp nhận",
	4: "Yêu cầu bổ sung",
	5: "Từ chối",
	6: "Chờ duyệt kết thúc",
	7: "Kết thúc hồ sơ",
	8: "Bổ sung kết thúc hồ sơ",
	9: "Từ chối kết thúc hồ sơ",
	0: "Nộp lưu hồ sơ",
};

export const STATUS_EMPLOYEE = {
	SAVE_AND_QUIT: "0",
	ADD_NEW: "1",
	PENDING: "2",
	APPROVED: "3",
	ADDITIONAL_REQUESTED: "4",
	REJECT: "5",
	PENDING_ENDING: "6",
	APPROVED_ENDING: "7",
	ADDITIONAL_REQUESTED_ENDING: "8",
	REJECT_ENDING: "9",
};

export const STATUS_TABLE = {
	ADD_EMPLOYEE: "1,2,4,5",
	MANAGEMENT_EMPLOYEE: "3,6,8,9",
	PENDING: "2,6",
	APPROVED: "3,7",
	REJECTED: "7,0",
};

export const DELETE_STATUS = ["1"];
export const EDIT_STATUS = ["1", "4", "5"];
export const VIEW_DETAILS_STATUS = ["2", "3"];
export const WAIT_LEADER_APPROVED = ["2"];
export const EDIT_STATUS_EMPLOYEE_MANAGER = ["3", "9", "8"];

export const STATUS_LEADER_ACTION_NAME = {
	1: "Tạo mới",
	2: "Chờ duyệt",
	3: "Đã duyệt",
	4: "Yêu cầu bổ sung",
	5: "Đã từ chối",
};

export const MANAGEMENT_EMPLOYEE = {
	EDIT: "1,4",
	DELETE: "1",
	VIEW: "1,4",
};
