import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import styled from "@emotion/styled";
import BrandsTable from "../../../components/Admin/BrandsTables";
import AddNewBrand from "../../../components/Admin/AddNewBrand";
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../../layouts/AdminLayout";
import SearchList from "../../../components/Admin/SearchList";
import { addBrand } from "../../../services/Admin/BrandService";
import { enqueueSnackbar } from "notistack";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#FF6969",
  borderRadius: "15px",
  "&:hover": {
    backgroundColor: "#ea4545 !important",
  },
}));

function BrandListPage(props) {
  const { dataFetched } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsSearched, setRowsSearched] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [open, setOpen] = useState(false);
  const [brandAdd, setBrandAdd] = useState({
    brandName: "",
    image: null,
  });

  useEffect(() => {
    setRowsSearched(dataFetched);
  }, [dataFetched]);

  

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleAddBrand = async () => {
    const formData = new FormData();
    formData.append('brandName', brandAdd.brandName);
    formData.append('image', brandAdd.image);

    enqueueSnackbar("Đang thêm thông tin...", { variant: "info" });
    const response = await addBrand(formData);

    if (response.success) {
      enqueueSnackbar("Thêm thương hiệu thành công", { variant: "success" });
      setOpen(false);
      window.location.reload();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };
  return (
    <Box component={"main"} sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth={"lg"}>
        <Stack spacing={3}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h3">Danh sách thương hiệu</Typography>
            <CustomButton
              onClick={() => setOpen(true)}
              variant="contained"
              startIcon={<AddOutlinedIcon />}
            >
              Thêm thương hiệu
            </CustomButton>
          </Stack>
          <Stack
            component={Paper}
            elevation={3}
            sx={{
              paddingBottom: 2,
              borderRadius: "25px",
            }}
            spacing={"2px"}
          >
            <SearchList
            placeholder="Tìm kiếm thương hiệu"
            searchString={searchString}
            setRowsSearched={setRowsSearched}
            dataFetched={dataFetched}
            setSearchString={setSearchString}
            setPage={setPage}
            />

            <BrandsTable
              count={rowsSearched.length}
              items={rowsSearched}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Stack>
      </Container>

      <BootstrapDialog
        open={open}
        onOk={() => { }}
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Thêm thương hiệu mới
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <AddNewBrand setBrandAdd={setBrandAdd} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAddBrand}>
            Tạo mới
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}

export default BrandListPage;
