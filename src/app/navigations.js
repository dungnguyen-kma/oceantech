import ConstantList from "./appConfig";
export const navigations = [
  {
    name: "Dashboard.dashboard",
    icon: "dashboard",
    path: ConstantList.ROOT_PATH + "dashboard/analytics",
    isVisible: true,
  },
  {
    name: "Dashboard.manage",
    isVisible: true,
    icon: "engineering",
    children: [
      // {
      //   name: "Dashboard.eQAActivityLog",
      //   isVisible:true,
      //   path: ConstantList.ROOT_PATH + "user_manager/activity_log",
      //   icon: "keyboard_arrow_right"
      // },
      // {
      //   name: "manage.user",
      //   isVisible: true,
      //   path: ConstantList.ROOT_PATH + "user_manager/user",
      //   icon: "keyboard_arrow_right",
      // },
      // {
      //   name: "manage.menu",
      //   isVisible: true,
      //   path: ConstantList.ROOT_PATH + "list/menu",
      //   icon: "keyboard_arrow_right",
      // },
      // {
      //   name: "Quản lý nhân viên",
      //   isVisible: true,
      //   path: ConstantList.ROOT_PATH + "employee_manager/employee",
      //   icon: "keyboard_arrow_right",
      // },
      // {
      //   name: "Quản lý địa chỉ",
      //   isVisible: true,
      //   path: ConstantList.ROOT_PATH + "address_manager/address",
      //   icon: "keyboard_arrow_right",
      // },
      {
				name: "Tạo mới nhân viên",
				isVisible: true,
				path: ConstantList.ROOT_PATH + "add_employee",
				icon: "keyboard_arrow_right",
			},
    ],
  },
];
