import React, {useEffect} from "react";
import { toast } from "react-toastify";
import { Grid, Button, DialogContent, Avatar } from "@material-ui/core";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm
} from "react-material-ui-form-validator";
import moment from "moment";
import { renderSelectItemForObj } from "app/views/Component/renderSelectItemForObj";
import { GENDER, TEAMS } from "app/redux/constants/List";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function EmployeeInfoTab(props) {
  const { employee, setEmployee } = props;

  useEffect(() => {
    ValidatorForm.addValidationRule("isDateOfBirth", (value) => {
      let today = new Date();
      let birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    });

    ValidatorForm.addValidationRule("isCodeEmployee", (value) => {
      let currentYear = new Date().getFullYear();
      let lastTwoDigits = currentYear % 100;
      let regex = new RegExp(`^NV${lastTwoDigits}...$`);
      return regex.test(value);
    });

    ValidatorForm.addValidationRule("isDateOfIssuanceCard", (value) => {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      let birthDate = new Date(employee?.dateOfBirth);
      let dateValue = new Date(value);

      return dateValue < today && dateValue > birthDate;
    });
    return () => {
      ValidatorForm.removeValidationRule("isDateOfBirth");
      ValidatorForm.removeValidationRule("isCodeEmployee");
      ValidatorForm.removeValidationRule("isDateOfIssuanceCard");
    };
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      if (files[0].size > 2 * 1024 * 1024) {
        return toast.warning("Vui lòng chọn ảnh có kích thước bé hơn 2MB");
      }
      setEmployee({
        ...employee,
        image: URL.createObjectURL(files[0]),
        file: files[0],
      });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  return (
    <DialogContent className="mb-16">
      <Grid container lg={12}>
        <Grid
          lg={4}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className="mb-32"
        >
          <Avatar style={{width:"270px", height:"270px"}} src={employee?.image || ""}  />
          <Button
            variant="contained"
            color="primary"
            component="label"
          >
            Tải ảnh đại diện
            <input
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              name="image"
              onChange={handleChange}
            />
          </Button>
        </Grid>
        <Grid lg={8} md={12} sm={12} xs={12} item container>
          <Grid
            item
            container
            lg={12}
            md={12}
            sm={12}
            xs={12}
            spacing={2}
            className="m-0"
          >
            <Grid lg={6} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Tên nhân viên
                  </span>
                }
                onChange={handleChange}
                type="text"
                name="name"
                value={employee?.name || ""}
                validators={[
                  "required",
                  "maxStringLength:30",
                  `matchRegexp:^[^0-9!@#$%^&*(),.?":{}|<>]+$`,
                ]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Không được chứa số hoặc ký tự đặc biệt!",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid lg={6} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Mã nhân viên
                  </span>
                }
                onChange={handleChange}
                type="text"
                name="code"
                value={employee?.code || ""}
                validators={["required", "isCodeEmployee"]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Mã phải có dạng NV + 2 số cuối năm hiện tại + 3 kí tự bất kỳ",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>

          <Grid
            item
            container
            lg={12}
            md={12}
            sm={12}
            xs={12}
            spacing={2}
            className="m-0"
          >
            <Grid item lg={4} md={4} sm={4} xs={12}>
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
                errorMessages={["Không được bỏ trống!"]}
                value={employee?.gender}
                onChange={handleChange}
                inputProps={{
                  name: "gender",
                  id: "gender-simple",
                }}
              >
                {renderSelectItemForObj(GENDER)}
              </SelectValidator>
            </Grid>
            <Grid lg={4} md={4} sm={4} xs={12} item>
              <TextValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Ngày sinh
                  </span>
                }
                onChange={handleChange}
                type="date"
                name="dateOfBirth"
                value={
                  employee?.dateOfBirth
                    ? moment(employee?.dateOfBirth).format("YYYY-MM-DD")
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
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <SelectValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Nhóm
                  </span>
                }
                variant="outlined"
                size="small"
                validators={["required"]}
                errorMessages={["Không được bỏ trống!"]}
                value={employee?.team ? String(employee?.team) : ""}
                onChange={handleChange}
                inputProps={{
                  name: "team",
                  id: "gender-simple",
                }}
              >
                {renderSelectItemForObj(TEAMS)}
              </SelectValidator>
            </Grid>
          </Grid>

          <Grid
            item
            container
            lg={12}
            md={12}
            sm={12}
            xs={12}
            spacing={2}
            className="m-0"
          >
            <Grid lg={6} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Email
                  </span>
                }
                onChange={handleChange}
                type="text"
                name="email"
                value={employee?.email || ""}
                validators={["required", "isEmail"]}
                errorMessages={[
                  "không được bỏ trống!",
                  "Không đúng định dạng email",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid lg={6} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Số điện thoại
                  </span>
                }
                onChange={handleChange}
                type="text"
                name="phone"
                value={employee?.phone || ""}
                validators={["required", `matchRegexp:^0[0-9]{9,10}$`]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Không đúng định dạng số điện thoại",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>

          <Grid
            container
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            spacing={2}
            className="m-0"
          >
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Địa chỉ
                  </span>
                }
                fullWidth
                onChange={handleChange}
                type="text"
                name="address"
                value={employee?.address || ""}
                validators={["required", "maxStringLength:150"]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Địa chỉ được nhập tối đa 150 kí tự",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>

          <Grid
            item
            container
            lg={12}
            md={12}
            sm={12}
            xs={12}
            spacing={2}
            className="m-0"
          >
            <Grid lg={4} md={4} sm={4} xs={12} item>
              <TextValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Số căn cước công dân
                  </span>
                }
                onChange={handleChange}
                type="text"
                name="citizenIdentificationNumber"
                value={employee?.citizenIdentificationNumber || ""}
                validators={["required", `matchRegexp:^(?:\\d{9}|\\d{12})$`]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Số căn cước công dân 9 số hoặc 12 số",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid lg={4} md={4} sm={4} xs={12} item>
              <TextValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Ngày cấp
                  </span>
                }
                onChange={handleChange}
                type="date"
                name="dateOfIssuanceCard"
                value={
                  employee?.dateOfIssuanceCard
                    ? moment(employee?.dateOfIssuanceCard).format("YYYY-MM-DD")
                    : ""
                }
                InputLabelProps={{ shrink: true }}
                validators={["required", "isDateOfIssuanceCard"]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Ngày cấp phải trước này hiện tại và sau ngày sinh",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid lg={4} md={4} sm={4} xs={12} item>
              <TextValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Nơi cấp
                  </span>
                }
                onChange={handleChange}
                type="text"
                name="placeOfIssueCard"
                value={employee?.placeOfIssueCard || ""}
                validators={["required", "maxStringLength:50"]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Nơi cấp nhập tối đa 50 kí tự",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>

          <Grid
            item
            container
            lg={12}
            md={12}
            sm={12}
            xs={12}
            spacing={2}
            className="m-0"
          >
            <Grid lg={6} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Dân tộc
                  </span>
                }
                onChange={handleChange}
                type="text"
                name="ethnic"
                value={employee?.ethnic || ""}
                validators={["required", "maxStringLength:50"]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Dân tộc nhập tối đa 50 kí tự",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid lg={6} md={6} sm={6} xs={12} item>
              <TextValidator
                className="w-100 mb-8"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Tôn giáo
                  </span>
                }
                onChange={handleChange}
                type="text"
                name="religion"
                value={employee?.religion || ""}
                validators={["required", "maxStringLength:50"]}
                errorMessages={[
                  "Không được bỏ trống!",
                  "Tôn giáo nhập tối đa 50 kí tự",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DialogContent>
  );
}

export default EmployeeInfoTab;
