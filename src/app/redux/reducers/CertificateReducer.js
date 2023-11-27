import * as CC from "../constants/CertificateConstants"

const initialState = {
    certificates: null,
	error: null,
	loading: false,
}

const CertificateReducer = (state = initialState, action) => {
    switch(action.type){
        case CC.GET_BY_EMPLOYEE_ID_REQUEST:
		case CC.CREATE_REQUEST:
		case CC.DELETE_REQUEST:
		case CC.UPDATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case CC.GET_BY_EMPLOYEE_ID_ERROR:
		case CC.CREATE_ERROR:
		case CC.DELETE_ERROR:
		case CC.UPDATE_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CC.GET_BY_EMPLOYEE_ID_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				certificates: action.payload,
			};
		case CC.CREATE_SUCCESS:
		case CC.DELETE_SUCCESS:
		case CC.UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
			};
		default:
			return { ...state };
    }
}

export default CertificateReducer