import React, { useState, useEffect } from "react";
import { Button, Grid, DialogContent } from "@material-ui/core";
import MaterialTable from "material-table";
import TableActionIcon from "app/views/Component/ColumnsTable/TableActionIcon";
import { ConfirmationDialog } from "egret";
import { useDispatch, useSelector } from "react-redux";
import trimValueObj from "app/views/utilities/TrimValueObj";
import { GENDER, RELATIONSHIPS } from "app/redux/constants/List";
import { formatDate, formatDateInput } from "app/views/utilities/formatDate";
import { renderSelectItemForObj } from "app/views/Component/renderSelectItemForObj";
import {
  TextValidator,
  ValidatorForm,
  SelectValidator,
} from "react-material-ui-form-validator";
import * as familyActions from "app/redux/actions/FamilyActions";

const initialState = {
  name: "",
  gender: null,
  dateOfBirth: "",
  relationShip: null,
  citizenIdentificationNumber: "",
  address: "",
  employeeId: null,
  email: "",
  phoneNumber: "",
};

function FamilyRelationshipTab(props) {
  const { employee } = props;

  const familyState = useSelector((state) => state.family);
  const { families } = familyState;
  const [relationshipData, setRelationshipData] = useState(initialState);
  const [relationshipWillDelete, setRelationshipWillDelete] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [relationshipType, setRelationshipType] = useState("");
  const [memberName, setMemberName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    ValidatorForm.addValidationRule("isDateOfBirth", (value) => {
      let today = new Date();
      let birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    });
    return () => {
      ValidatorForm.removeValidationRule("isDateOfBirth");
    };
  });

  useEffect(() => {
    if (employee?.id) {
      dispatch(familyActions.getByEmployeeIdRequest(employee.id));
    }
  }, [employee]);

  const handleChangeValue = (e) => {
    setRelationshipData({
      ...relationshipData,
      [e.target.name]: e.target.value,
    });
  };

  const resetFormData = () => {
    setRelationshipData(initialState);
  };

  const onButtonClickEdit = (data) => {
    setRelationshipData(data);
  };

  const onButtonClickDelete = (data) => {
    setShowConfirmationDialog(true);
    setRelationshipWillDelete(data);
    setRelationshipType(RELATIONSHIPS[data.relationShip]);
    setMemberName(data.name);
  };

  const handleSubmit = () => {
    if (relationshipData?.id) {
      dispatch(
        familyActions.updateRequest({
          employeeId: employee?.id,
          data: trimValueObj(relationshipData),
        })
      );
    } else {
      dispatch(
        familyActions.createRequest({
          employeeId: employee?.id,
          data: [trimValueObj(relationshipData)],
        })
      );
    }
    setRelationshipData(initialState);
    resetFormData();
  };

  const handleDelete = () => {
    dispatch(
      familyActions.deleteRequest({
        familyId: relationshipWillDelete?.id,
        employeeId: employee?.id,
      })
    );
    setShowConfirmationDialog(false);
  };

  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      align: "center",
      width: "250",
      render: (rowData) => (
        <>
          <TableActionIcon
            color="primary"
            title="edit"
            onClick={() => onButtonClickEdit(rowData)}
          />
          <TableActionIcon
            color="error"
            title="delete"
            onClick={() => {
              onButtonClickDelete(rowData);
            }}
          />
        </>
      ),
    },
    { title: "Họ và tên", field: "name", align: "center" },
    {
      title: "Giới tính",
      field: "gender",
      align: "center",
      render: (rowData) => GENDER[rowData.gender],
    },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      align: "center",
      render: (rowData) => formatDate(rowData.dateOfBirth),
    },
    {
      title: "Căn cước công dân",
      field: "citizenIdentificationNumber",
      align: "center",
    },
    {
      title: "Mối quan hệ",
      field: "relationShip",
      align: "center",
      render: (rowData) => RELATIONSHIPS[rowData.relationShip],
    },
    { title: "Địa chỉ", field: "address", align: "center" },
    { title: "Email", field: "email", align: "center" },
    { title: "Số điện thoại", field: "phoneNumber", align: "center" },
  ];
  return (
    <DialogContent className="mb-16 mt-16">
      <div>
        {showConfirmationDialog && (
          <ConfirmationDialog
            title={`Xóa "${relationshipType}" "${memberName}`}
            open={showConfirmationDialog}
            onConfirmDialogClose={() => setShowConfirmationDialog(false)}
            onYesClick={handleDelete}
            text={"Bạn có chắc chắn xóa?"}
            Yes={"Xác nhận"}
            No={"Hủy"}
          />
        )}
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid lg={3} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-6"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Họ và tên
                  </span>
                }
                onChange={handleChangeValue}
                type="text"
                name="name"
                value={relationshipData?.name || ""}
                validators={[
                  "required",
                  "maxStringLength:30",
                  `matchRegexp:^[^0-9!@#$%^&*(),.?":{}|<>]+$`,
                ]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Tối đa 30 ký tự!",
                  "Tên không được chứa số và ký tự!",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <SelectValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Giới tính
                  </span>
                }
                variant="outlined"
                size="small"
                validators={["required"]}
                errorMessages={"Không được bỏ trống!"}
                value={relationshipData?.gender || ""}
                onChange={handleChangeValue}
                inputProps={{
                  name: "gender",
                  id: "gender-simple",
                }}
              >
                {renderSelectItemForObj(GENDER)}
              </SelectValidator>
            </Grid>
            <Grid lg={3} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-6"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Ngày sinh
                  </span>
                }
                onChange={handleChangeValue}
                type="date"
                name="dateOfBirth"
                value={
                  relationshipData?.dateOfBirth
                    ? formatDateInput(relationshipData?.dateOfBirth)
                    : ""
                }
                InputLabelProps={{ shrink: true }}
                validators={["required", "isDateOfBirth"]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Nhân viên bắt buộc phải đủ 18 tuổi!",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <SelectValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Mối quan hệ
                  </span>
                }
                variant="outlined"
                size="small"
                validators={["required"]}
                errorMessages={["Không được bỏ trống!"]}
                value={relationshipData?.relationShip || ""}
                onChange={handleChangeValue}
                inputProps={{
                  name: "relationShip",
                  id: "gender-simple",
                }}
              >
                {renderSelectItemForObj(RELATIONSHIPS)}
              </SelectValidator>
            </Grid>
            <Grid lg={3} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-6"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Căn cước công dân
                  </span>
                }
                onChange={handleChangeValue}
                type="text"
                name="citizenIdentificationNumber"
                value={relationshipData?.citizenIdentificationNumber || ""}
                validators={["required", `matchRegexp:^(?:\\d{9}|\\d{12})$`]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Căn cước công dân 9 số hoặc 12 số!",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid lg={3} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-6"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Địa chỉ
                  </span>
                }
                onChange={handleChangeValue}
                type="text"
                name="address"
                value={relationshipData?.address || ""}
                validators={["required", "maxStringLength:150"]}
                errorMessages={["Không được bỏ trống!", "Tối đa 150 ký tự!"]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid lg={3} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-6"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Email
                  </span>
                }
                onChange={handleChangeValue}
                type="text"
                name="email"
                value={relationshipData?.email || ""}
                validators={["required", "isEmail"]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Email không đúng địng dạng!",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid lg={3} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-6"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Số điện thoại
                  </span>
                }
                onChange={handleChangeValue}
                type="text"
                name="phoneNumber"
                value={relationshipData?.phoneNumber || ""}
                validators={["required", `matchRegexp:^0[0-9]{9,10}$`]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Số điện thoại không đúng định dạng!",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid
            container
            className="my-16 flex-center"
            spacing={2}
            direction="row"
          >
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Lưu
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                className="text-white"
                onClick={resetFormData}
              >
                Hủy
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
        <MaterialTable
          title=""
          data={families?.data || families || []}
          totalCount={families?.totalElements || families?.length || 0}
          columns={columns}
          options={{
            rowStyle: (event, index) => ({
              backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
            }),
            headerStyle: {
              backgroundColor: "#358600",
              color: "#fff",
              border: "1px solid rgb(209 213 219)",
              textAlign: "center",
            },
            cellStyle: {
              border: "1px solid rgb(209 213 219)",
            },
            search: false,
            padding: "dense",
            sorting: false,
            pageSize: 3,
            pageSizeOptions: [1, 2, 3, 5, 10, 25, 50, 100],
            searchFieldVariant: "outlined",
            toolbar: false,
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "Không có dữ liệu",
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} trong {count}",
              labelRowsSelect: "bản ghi",
            },
            toolbar: {
              searchPlaceholder: "Tìm kiếm",
              searchTooltip: "Tìm kiếm",
            },
          }}
        />
      </div>
    </DialogContent>
  );
}

export default FamilyRelationshipTab;
