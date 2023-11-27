import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  IconButton,
  Icon,
  DialogActions,
  Button,
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import EmployeeInfoTab from "../AddEmployee/Tab/EmployeeInfoTab";
import CertificateTab from "./Tab/CertificateTab";
import FamilyRelationshipTab from "./Tab/FamilyRelationshipTab";
import * as employeeActions from "../../redux/actions/EmployeeActions";
import { STATUS_TABLE } from "app/redux/constants/Status";
import trimValueObj from "../utilities/TrimValueObj";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const initialState = {
  name: "",
  code: "",
  gender: null,
  dateOfBirth: "",
  address: "",
  team: null,
  email: "",
  image: "",
  phone: "",
  citizenIdentificationNumber: "",
  employeeFamilyDtos: [],
  certificatesDto: [],
  ethnic: "",
  religion: "",
  dateOfIssuanceCard: "",
  placeOfIssueCard: "",
};

function AddEmployeeDialog(props) {
  const { open, onClose, editItem } = props;
  const [employee, setEmployee] = useState(initialState);
  const [tabIndex, setTabIndex] = useState(0);

  const employeeState = useSelector((state) => state.employee);
  const { employeeCreated } = employeeState;

  const dispatch = useDispatch();

  const handleChangeTab = (event, newTab) => {  
    if (employee?.id) {
      setTabIndex(newTab);
    } else {
      toast.warning("Vui lòng lưu thông tin trước!");
    }
  };

  useEffect(() => {
    if (employeeCreated?.id) {
      setEmployee(employeeCreated);
    }
  }, [employeeCreated]);

  useEffect(() => {
    if (editItem?.id) {
      setEmployee(editItem);
    }
  }, [editItem]);

  const handleSubmit = () => {
    if (employee?.id) {
      dispatch(
        employeeActions.updateRequest(
          trimValueObj(employee),
          STATUS_TABLE.ADD_EMPLOYEE,
          true
        )
      );
      // setShouldRegisterDialog(true);
    } else {
      dispatch(employeeActions.createRequest(trimValueObj(employee)));
      // setShouldRegisterDialog(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth={true}>
      <DialogTitle className="mb-0 pb-0">
        {editItem?.id ? "Chỉnh sửa nhân viên" : "Tạo mới nhân viên"}
        <IconButton
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            zIndex: 100,
          }}
          onClick={() => onClose()}
        >
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>
      <Tabs
        value={tabIndex}
        indicatorColor="primary"
        color="primary"
        centered
        onChange={handleChangeTab}
      >
        <Tab label="Thông tin nhân viên" />
        <Tab label="Thông tin văn bằng" />
        <Tab label="Quan hệ gia đình" />
      </Tabs>
      {tabIndex === 1 && <CertificateTab employee={employee}/>}
      {tabIndex === 2 && <FamilyRelationshipTab employee={employee}/>}
      <ValidatorForm onSubmit={handleSubmit}>
        {tabIndex === 0 && (
          <EmployeeInfoTab employee={employee} setEmployee={setEmployee} />
        )}
        <DialogActions style={{ justifyContent: "center" }} className="mb-8">
          <Button variant="contained" color="primary" type="submit">
            Lưu
          </Button>
          {employee?.id && (
            <Button variant="contained" color="primary" type="submit">
              Đăng ký
            </Button>
          )}
          <Button
            variant="contained"
            onClick={onClose}
            color="secondary"
            className="text-white"
          >
            Hủy
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

export default AddEmployeeDialog;
