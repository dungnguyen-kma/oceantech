import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";

const AddEmployee = EgretLoadable({
	loader: () => import("./AddEmployee"),
});

const ViewComponent = withTranslation()(AddEmployee);
const AddEmployeeRoutes = [
	{
		path: ConstantList.ROOT_PATH + "add_employee",
		exact: true,
		component: ViewComponent,
	},
];
export default AddEmployeeRoutes;
