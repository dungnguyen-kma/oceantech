import React, { useState, useEffect } from "react";
import { Button, Grid, DialogContent } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import trimValueObj from "app/views/utilities/TrimValueObj";
import TableActionIcon from "app/views/Component/ColumnsTable/TableActionIcon";
import { formatDate, formatDateInput } from "app/views/utilities/formatDate";
import { ConfirmationDialog } from "egret";
import * as certificaActions from "app/redux/actions/CertificateActions";
import { event } from "jquery";

const initialState = {
  certificateName: "",
  issueDate: "",
  content: "",
  field: "",
};

function CertificateTab(props) {
  const { employee } = props;
  const [certificateFormData, setCertificateFormData] = useState(initialState);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [certificateWilldelete, setCertificateWillDelete] = useState(null);
  const [certificateName, setCertificateName] = useState("");
  const certificateState = useSelector((state) => state.certificate);
  const { certificates } = certificateState;
  const employeeState = useSelector((state) => state.employee);
  const { isView } = employeeState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (employee?.id) {
      dispatch(certificaActions.getByEmployeeIdRequest(employee.id));
    }
  }, [employee]);

  const handleChangeValue = (event) => {
    setCertificateFormData({
      ...certificateFormData,
      [event.target.name]: event.target.value,
    });
  };

  const resetFormData = () => {
    setCertificateFormData(initialState);
  };

  const onButtonClickDelete = (data) => {
    resetFormData();
    setCertificateWillDelete(data);
    setCertificateName(data.certificateName);
    setShowConfirmationDialog(true);
  };

  const onButtonClickEdit = (data) => {
    setCertificateFormData(data);
  };

  const handleSubmit = () => {
    if (certificateFormData?.id) {
      dispatch(
        certificaActions.updateRequest({
          data: trimValueObj(certificateFormData),
          employeeId: employee?.id,
        })
      );
    } else {
      dispatch(
        certificaActions.createRequest({
          data: [trimValueObj(certificateFormData)],
          employeeId: employee?.id,
        })
      );
    }
  };

  const handleDelete = () => {
    dispatch(
      certificaActions.deleteRequest({
        certificateId: certificateWilldelete?.id,
        employeeId: employee?.id,
      })
    );
    setShowConfirmationDialog(false);
  };

  const columns = [
    {
      title: "STT",
      field: "custom",
      align: "center",
      width: "5%",
      render: (rowData) => rowData.tableData.id + 1,
    },
    {
      title: "Thao tác",
      field: "custom",
      align: "center",
      width: "5%",
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
            onClick={() => onButtonClickDelete(rowData)}
          />
        </>
      ),
    },
    { title: "Tên văn bằng", field: "certificateName", align: "center" },
    {
      title: "Ngày có hiệu lực",
      field: "issueDate",
      align: "center",
      render: (rowData) => formatDate(rowData.issueDate),
    },
    { title: "Nội dung văn bằng", field: "content", align: "center" },
    { title: "Xếp loại", field: "field", align: "center" },
  ];

  return (
    <DialogContent className="mb-16 mt-16">
      <div>
        {showConfirmationDialog && (
          <ConfirmationDialog
            title={`Xóa văn bằng "${certificateName}"`}
            open={showConfirmationDialog}
            onConfirmDialogClose={() => setShowConfirmationDialog(false)}
            onYesClick={handleDelete}
            text={"Bạn có chắc chắn xóa?"}
            Yes={"Xác nhận"}
            No={"Hủy"}
          />
        )}
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid lg={3} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-6"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Tên văn bằng
                  </span>
                }
                onChange={handleChangeValue}
                type="text"
                name="certificateName"
                value={certificateFormData?.certificateName || ""}
                validators={["required", "maxStringLength:100"]}
                errorMessages={["Không được bỏ trống!", "Tối đa 100 ký tự"]}
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
                    Xếp loại
                  </span>
                }
                onChange={handleChangeValue}
                type="text"
                name="field"
                value={certificateFormData?.field || ""}
                validators={["required", "maxStringLength:50"]}
                errorMessages={["Không được bỏ trống!", "Tối đa 50 ký tự!"]}
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
                    Ngày có hiệu lực
                  </span>
                }
                onChange={handleChangeValue}
                type="date"
                name="issueDate"
                value={
                  certificateFormData?.issueDate
                    ? formatDateInput(certificateFormData?.issueDate)
                    : ""
                }
                InputLabelProps={{ shrink: true }}
                validators={["required"]}
                errorMessages={["Không được bỏ trống!"]}
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
                    Nội dung văn bằng
                  </span>
                }
                onChange={handleChangeValue}
                type="text"
                name="content"
                value={certificateFormData?.content || ""}
                validators={["required", "maxStringLength:500"]}
                errorMessages={["Không được bỏ trống!", "Tối đa 500 ký tự!"]}
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
          data={certificates?.data || certificates || []}
          totalCount={certificates?.totalElements || certificates?.length || 0}
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

export default CertificateTab;
