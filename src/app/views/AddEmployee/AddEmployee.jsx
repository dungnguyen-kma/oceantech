import React from "react";
import { Breadcrumb } from "egret";
import { ConfirmationDialog } from "egret";
import { TextField, Grid, Button, TablePagination } from "@material-ui/core";
import MaterialTable from "material-table";
import {
  DELETE_STATUS,
  EDIT_STATUS,
  STATUS_TABLE,
  VIEW_DETAILS_STATUS,
  SUBMIT_PROFILE_STATUS,
} from "app/redux/constants/Status";
import { GENDER, TEAMS } from "app/redux/constants/List";
import TableActionIcon from "../Component/ColumnsTable/TableActionIcon";
import CellColumn from "../Component/ColumnsTable/CellColumn";
import { formatDate } from "../utilities/formatDate";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as employeeActions from "../../redux/actions/EmployeeActions";
import { useEffect } from "react";
import AddEmployeeDialog from "./AddEmployeeDialog";

function AddEmployee() {
  const [rowPerPage, setRowPerPage] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeEdit, setEmployeeEdit] = useState(null);
  const [employeeName, setEmployeeName] = useState("")

  const employeeState = useSelector((state) => state.employee);
  const { employees } = employeeState;

  const dispatch = useDispatch();

  const searchEmployees = () => {
    dispatch(
      employeeActions.searchRequest({
        listStatus: STATUS_TABLE.ADD_EMPLOYEE,
        keyword: keyWord,
        pageIndex: pageIndex + 1,
        pageSize: rowPerPage,
      })
    );
  };

  useEffect(() => {
    searchEmployees();
  }, [keyWord, pageIndex, rowPerPage]);

  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleChangRowperpage = (event) => {
    setRowPerPage(event.target.value);
    setPageIndex(0);
  };

  const onButtonClickCreate = () => {
    setShowAddEmployeeDialog(true);
    setEmployeeEdit(null);
    dispatch(employeeActions.setEmployeeCreated(null));
  };
  
  const onButtonClickEdit = (data) => {
    setEmployeeEdit(data)
    setShowAddEmployeeDialog(true)
  }

  const onButtonClickDelete = (data) => {
    setShowConfirmationDialog(true);
    setEmployeeId(data?.id);
    setEmployeeName(data?.name)
  };

  const handleDelete = () => {
    dispatch(employeeActions.deleteRequest(employeeId));
    setShowConfirmationDialog(false);
  };

  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      align: "center",
      width: "5%",
      render: (rowData) => {
        return (
          <>
            {EDIT_STATUS.includes(rowData?.submitProfileStatus) && (
              <TableActionIcon
                color="primary"
                title="edit"
                onClick ={() => {onButtonClickEdit(rowData)}}
              />
            )}
            {DELETE_STATUS.includes(rowData?.submitProfileStatus) && (
              <TableActionIcon
                color="error"
                title="delete"
                onClick={() => onButtonClickDelete(rowData)}
              />
            )}
            {VIEW_DETAILS_STATUS.includes(rowData?.submitProfileStatus) && (
              <TableActionIcon
                color="secondary"
                title="visibility"
                // onClick={}
              />
            )}
          </>
        );
      },
    },
    {
      title: "Họ tên",
      field: "name",
      render: (rowData) => <CellColumn data={rowData.name} />,
    },
    {
      title: "Giới tính",
      field: "gender",
      align: "center",
      render: (rowData) => {
        return <CellColumn data={GENDER[rowData.gender]} />;
      },
    },
    {
      title: "Nhóm",
      field: "team",
      align: "center",
      render: (rowData) => {
        return <CellColumn data={TEAMS[rowData.team]} />;
      },
    },
    {
      title: "Email",
      field: "email",
      align: "center",
      render: (rowData) => {
        return <CellColumn data={rowData.email} />;
      },
    },
    {
      title: "Số điện thoại",
      field: "phone",
      align: "center",
      render: (rowData) => {
        return <CellColumn data={rowData.phone} />;
      },
    },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      align: "center",
      render: (rowData) => {
        return <CellColumn data={formatDate(rowData.dateOfBirth)} />;
      },
    },
    {
      title: "Trạng thái",
      field: "submitProfileStatus",
      align: "center",
      render: (rowData) => {
        return (
          <CellColumn
            data={SUBMIT_PROFILE_STATUS[rowData.submitProfileStatus]}
          />
        );
      },
    },
  ];
  return (
    <div className="m-sm-30">
      {showAddEmployeeDialog && (
        <AddEmployeeDialog
          open={showAddEmployeeDialog}
          onClose={() => setShowAddEmployeeDialog(false)}
          editItem={employeeEdit}
        />
      )}
      {showConfirmationDialog && (
        <ConfirmationDialog
          title={"Xóa nhân viên "+employeeName}
          open={showConfirmationDialog}
          onConfirmDialogClose={() => setShowConfirmationDialog(false)}
          onYesClick={handleDelete}
          text={"Bạn có chắc chắn xóa?"}
          Yes={"Xác nhận"}
          No={"Hủy"}
        />
      )}
      <Breadcrumb
        routeSegments={[
          { name: "Quản lý", path: "/" },
          { name: "Tạo mới nhân viên" },
        ]}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                className="mb-16 mt-16 align-bottom"
                variant="contained"
                color="primary"
                onClick={() => {
                  onButtonClickCreate();
                }}
              >
                Thêm mới
              </Button>
            </Grid>
          </Grid>
        </div>
        <div>
          <TextField
            className="mb-16"
            id="standard-basic"
            label="Tìm kiếm"
            variant="standard"
            style={{ width: "300px" }}
            onChange={(e) => {
              setKeyWord(e.target.value);
            }}
          />
        </div>
      </div>
      <MaterialTable
        data={employees?.data || []}
        columns={columns}
        options={{
          tableLayout: "auto",
          rowStyle: (_, index) => ({
            backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
          }),
          cellStyle: {
            border: "1px solid rgb(209 213 219)",
          },
          headerStyle: {
            backgroundColor: "#358600",
            color: "#fff",
            border: "1px solid rgb(209 213 219)",
            textAlign: "center",
          },
          padding: "dense",
          minBodyHeight: "560px",
          maxBodyHeight: "560px",
          search: false,
          toolbar: false,
          paging: false,
          emptyRowsWhenPaging: false,
          sorting: false,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "Không có dữ liệu",
          },
        }}
      />
      <TablePagination
        component="div"
        count={employees?.totalElements || 0}
        page={pageIndex}
        rowsPerPage={rowPerPage}
        rowsPerPageOptions={[1, 2, 3, 5, 10, 25, 50, 100]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} trong ${count}`
        }
        labelRowsPerPage="Số hàng mỗi trang:"
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangRowperpage}
      />
    </div>
  );
}
export default AddEmployee;
