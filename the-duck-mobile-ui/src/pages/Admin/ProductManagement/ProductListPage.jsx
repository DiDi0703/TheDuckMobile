import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchProductList from "../../../components/Admin/SearchProductList";
import ProductsTableBasis from "../../../components/Admin/ProductsTableBasic";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { getActiveCatalogs } from "../../../services/Admin/CatalogService";
import { enqueueSnackbar } from "notistack";
import ProductFilter from "../../../components/Admin/ProductFilter";
import { GetFilteredProducts } from "../../../services/Admin/ProductService";
import Loading from "../../../components/Loading";

const statusOptions = [
  {
    value: false,
    name: "Đang bán",
  },
  {
    value: true,
    name: "Ngưng bán",
  },
];

const quantityOptions = [
  {
    value: 0,
    name: "Còn hàng",
  },
  {
    value: 1,
    name: "Sắp hết",
  },
  {
    value: 2,
    name: "Hết hàng",
  },
];

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#FF6969",
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "15px",
  height: "42px",
  "&:hover": {
    backgroundColor: "#ea4545 !important",
  },
}));

function ProductListPage(props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [buttonClicked, setButtonClicked] = useState(true);
  const [catalogs, setCatalogs] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [productItems, setProductItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const [selectedCategory, setSelectedCategory] = useState([]);
  const handleChangeCategoryFilter = (event) => {
    if (event.target.checked) {
      setSelectedCategory((prev) => [...prev, parseInt(event.target.value)]);
    } else {
      setSelectedCategory((prev) =>
        prev.filter((item) => item !== parseInt(event.target.value))
      );
    }
  };

  const [selectedStatus, setSelectedStatus] = useState([]);
  const handleChangeStatusFilter = (event) => {
    if (event.target.checked) {
      setSelectedStatus((prev) => [...prev, event.target.value === "true"]);
    } else {
      setSelectedStatus((prev) =>
        prev.filter((item) => item !== (event.target.value === "true"))
      );
    }
  };

  const [selectedQuantity, setSelectedQuantity] = useState([]);
  const handleChangeQuantityFilter = (event) => {
    if (event.target.checked) {
      setSelectedQuantity((prev) => [...prev, parseInt(event.target.value)]);
    } else {
      setSelectedQuantity((prev) =>
        prev.filter((item) => item !== parseInt(event.target.value))
      );
    }
  };

  useEffect(() => {
    const handleGetCatalogs = async () => {
      const response = await getActiveCatalogs();
      if (response.success) {
        setCatalogs(response.data.data);
        setTotalItems(response.data.data.totalObjects);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    if (catalogs.length === 0) {
      handleGetCatalogs();
    }
  }, [catalogs]);

  const handleGetFilteredProduct = useCallback(async () => {
    if (!buttonClicked) return;
    setIsLoading(true);
    const response = await GetFilteredProducts({
      search: search,
      page: page - 1,
      limit: limit,
      catalogIds: selectedCategory,
      productStatus: selectedStatus,
      productQuantity: selectedQuantity,
    });
    if (response.success) {
      setProductItems(response.data.data.objects);
      setPage(parseInt(response.data.data.page) + 1);
      setTotalItems(response.data.data.totalObjects);
      setLimit(response.data.data.limit);
    } else
      enqueueSnackbar("Đã có lỗi xảy ra khi lấy thông tin sản phẩm", {
        variant: "error",
      });
    setIsLoading(false);
    setButtonClicked(false);
  }, [
    limit,
    page,
    search,
    selectedCategory,
    selectedQuantity,
    selectedStatus,
    buttonClicked,
  ]);

  useEffect(() => {
    setButtonClicked(true);
  }, [page, limit]);

  useEffect(() => {
    handleGetFilteredProduct();
  }, [handleGetFilteredProduct]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box component={"main"} sx={{ flexGrow: 1, py: 4 }}>
          <Container maxWidth={"lg"}>
            <Stack spacing={4}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography
                  variant="h3"
                  fontWeight={"680"}
                  style={{
                    fontSize: "32px",
                  }}
                >
                  Danh sách sản phẩm
                </Typography>
                <CustomButton
                  variant="contained"
                  startIcon={<AddOutlinedIcon />}
                  onClick={() => navigate("/admin/product-management/add")}
                >
                  Thêm
                </CustomButton>
              </Stack>
              <Stack
                component={Paper}
                elevation={3}
                sx={{
                  paddingBottom: 2,
                  borderRadius: "10px",
                }}
                spacing={"2px"}
              >
                <SearchProductList
                  value={search}
                  onChange={setSearch}
                  onApply={() => {
                    setButtonClicked(true);
                  }}
                />
                <Box py={2} px={3}>
                  {selectedCategory.length === 0 &&
                    selectedQuantity.length === 0 &&
                    selectedStatus.length === 0 && (
                      <TextField
                        disabled
                        variant="standard"
                        fullWidth
                        size="medium"
                        InputProps={{
                          disableUnderline: true,
                          fontSize: "14px",
                        }}
                        placeholder="Không có bộ lọc nào được chọn"
                      />
                    )}
                  {selectedCategory.map((item, index) => (
                    <Chip
                      color="primary"
                      label={
                        catalogs.find((c) => c.catalogId === item)?.catalogName
                      }
                      key={index}
                      onDelete={() =>
                        setSelectedCategory((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}

                  {selectedStatus.map((item, index) => (
                    <Chip
                      color="secondary"
                      label={statusOptions.find((i) => i.value === item)?.name}
                      key={index}
                      onDelete={() =>
                        setSelectedStatus((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}

                  {selectedQuantity.map((item, index) => (
                    <Chip
                      color="warning"
                      label={
                        quantityOptions.find((i) => i.value === item)?.name
                      }
                      key={index}
                      onDelete={() =>
                        setSelectedQuantity((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}
                </Box>
                <Stack
                  direction={"row"}
                  spacing={1}
                  paddingLeft={2}
                  paddingBottom={1}
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <ProductFilter
                    label={"Danh mục"}
                    options={catalogs}
                    selectedValues={selectedCategory}
                    onChange={handleChangeCategoryFilter}
                  />
                  <ProductFilter
                    label={"Trạng thái"}
                    options={statusOptions}
                    selectedValues={selectedStatus}
                    onChange={handleChangeStatusFilter}
                  />
                  <ProductFilter
                    label={"Số lượng"}
                    options={quantityOptions}
                    selectedValues={selectedQuantity}
                    onChange={handleChangeQuantityFilter}
                  />
                </Stack>
                {/* <ProductsTableBasis
                  count={dataFetched.length}
                  items={dataFetched}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={rowsPerPage}
                /> */}
                <ProductsTableBasis
                  count={totalItems ? totalItems : 0}
                  items={productItems}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={limit}
                />
              </Stack>
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
}

export default ProductListPage;
