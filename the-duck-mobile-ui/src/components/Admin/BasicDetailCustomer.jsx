import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FormatDate from "../FormatDate";
import { deleteCustomer, restoreCustomer } from "../../services/Admin/CustomerService";
import { enqueueSnackbar } from "notistack";
import DialogConfirm from "../DialogConfirm";
const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  variant: "subtitle1",
  fontWeight: "720 !important",
  width: "100%",
}));

const TieuDeCot = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "520 !important",
}));

const NoiDung = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "400 !important",
}));

function BasicDetailsCustomer(props) {
  const { customer } = props;
  let status = customer.isDeleted;
  const [statusCustomer, setStatusCustomer] = useState(false)
  const [editStatus, setEditStatus] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    setEditStatus(status);
    setStatusCustomer(status);
  }, [status]);

  const handleStatusChange = (event) => {
    setEditStatus(event.target.value);
    if (statusCustomer !== event.target.value) {
      setDisabledButton(false);
    }
    else {
      setDisabledButton(true);
    }
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleUpdateButtonClick = async () => {
    let response;
    if (statusCustomer) {
      response = await restoreCustomer(customer.userId);
      if (response.success) {
        enqueueSnackbar("Mở khóa khách hàng thành công!", { variant: "success" });
        setDisabledButton(true);
        setStatusCustomer(editStatus);
      } else {
        enqueueSnackbar("Mở khóa khách hàng thất bại!", { variant: "error" });
      }
    } else {
      response = await deleteCustomer(customer.userId);
      if (response.success) {
        enqueueSnackbar("Khóa khách hàng thành công!", { variant: "success" });
        setDisabledButton(true);
        setStatusCustomer(editStatus);
      } else {
        enqueueSnackbar("Khóa khách hàng thất bại!", { variant: "error" });
      }
    }
  };

  return (
    <Stack
      sx={{
        borderRadius: "15px",
        paddingTop: 1,
      }}
    >
      <BoxStyle>
        <TieuDe>Thông tin cơ bản</TieuDe>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Họ tên</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <TieuDeCot>{customer.fullName}</TieuDeCot>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Ngày sinh</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung><FormatDate dateTime={customer.dateOfBirth} /></NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Giới tính</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{customer.gender === "Male" ? "Nam" : customer.gender === "Female" ? "Nữ" : "Khác"}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Số điện thoại</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{customer.phone}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Điểm tích luỹ</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{customer.point}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container alignItems={"center"} paddingBottom={1}>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Trạng thái</TieuDeCot>
          </Grid>

          <Grid item xs={5} md={7.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
              <Select
                value={typeof editStatus === "undefined" ? false : editStatus}
                label="Trạng thái"
                onChange={handleStatusChange}
                className="custom-select"
              >
                <MenuItem
                  value={false}
                  style={{ fontSize: "14px" }}
                >
                  Đang hoạt động
                </MenuItem>
                <MenuItem
                  value={true}
                  style={{ fontSize: "14px" }}
                >
                  Đã khóa
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={3}
            md={1.5}
            display={"flex"}
            sx={{
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size={isSmallScreen ? "small" : "large"}
              sx={{
                padding: "auto",
                height: "100%",
                background: "#e37272",
                ":hover": {
                  background: "#e05656",
                  color: "#fff",
                },
              }}
              disabled={disabledButton}
              onClick={(e) => {
                setDeleteDialog(true);
              }}
            >
              Cập nhật
            </Button>
            <DialogConfirm
              open={deleteDialog}
              title={statusCustomer ? "Mở khóa khách hàng" : "Khóa khách hàng"}
              content={
                statusCustomer
                  ? "Bạn có chắc chắn muốn mở khóa khách hàng này?"
                  : "Bạn có chắc chắn muốn khóa khách hàng này?"
              }
              okText={statusCustomer ? "Khôi phục" : "Khóa"}
              cancelText={"Hủy"}
              onOk={handleUpdateButtonClick}
              onCancel={() => setDeleteDialog(false)}
              onClose={() => setDeleteDialog(false)}
            />
          </Grid>
        </Grid>
      </BoxStyle>
    </Stack>
  );
}

export default BasicDetailsCustomer;
