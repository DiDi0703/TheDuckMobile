import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { memo } from "react";
import { editInfo } from "../services/UserService";
import DialogForm from "./DialogForm";
import MuiTextFeild from "./MuiTextFeild";

function UserEditInfomation(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { open, setOpen, initValue, onChange } = props;
  const [editInfomation, setEditInfomation] = React.useState({
    fullName: initValue && initValue.fullName,
    gender: initValue && initValue.gender,
  });

  const handleEditInfomation = async () => {
    const response = await editInfo(editInfomation);
    if (response.success) {
      enqueueSnackbar("Chỉnh sửa thông tin thành công", { variant: "success" });
      onChange(response.data.data);
    } else {
      enqueueSnackbar("Chỉnh sửa thông tin thất bại", { variant: "error" });
    }
  };
  return (
    <DialogForm
      open={open}
      cancelText={"Hủy"}
      okText={"Chỉnh sửa"}
      onOk={handleEditInfomation}
      onClose={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      <Stack width={500}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Giới tính</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={editInfomation.gender}
            row
          >
            <FormControlLabel
              checked={editInfomation.gender === 0}
              onChange={(e) => {
                setEditInfomation((prev) => ({
                  ...prev,
                  gender: parseInt(e.target.value),
                }));
              }}
              value="0"
              control={<Radio />}
              label="Nam"
            />
            <FormControlLabel
              checked={editInfomation.gender === 1}
              onChange={(e) => {
                setEditInfomation((prev) => ({
                  ...prev,
                  gender: parseInt(e.target.value),
                }));
              }}
              value="1"
              control={<Radio />}
              label="Nữ"
            />
            <FormControlLabel
              checked={editInfomation.gender === 2}
              onChange={(e) => {
                setEditInfomation((prev) => ({
                  ...prev,
                  gender: parseInt(e.target.value),
                }));
              }}
              value="2"
              control={<Radio />}
              label="Khác"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Họ tên</FormLabel>
          <MuiTextFeild
            value={editInfomation.fullName}
            onChange={(e) =>
              setEditInfomation((prev) => {
                return {
                  ...prev,
                  fullName: e.target.value,
                };
              })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Số điện thoại</FormLabel>
          <MuiTextFeild value={initValue && initValue.phone} disabled />
        </FormControl>
      </Stack>
    </DialogForm>
  );
}

export default memo(UserEditInfomation);
