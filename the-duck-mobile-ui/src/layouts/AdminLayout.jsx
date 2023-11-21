import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, {
  Fragment,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import TopNavbar from "../components/Store/TopNavbar";
import {
  getAllDistricts,
  getAllProvinces,
} from "../services/Admin/AddressService";
import { getAllBrands } from "../services/Admin/BrandService";
import { getAllCatalogs } from "../services/Admin/CatalogService";
import { getAllColors } from "../services/Admin/ColorService";
import { getAllCoupons } from "../services/Admin/CouponService";
import { getAllCustomers } from "../services/Admin/CustomerService";
import { getAllFeedbacks } from "../services/Admin/FeedbackService";
import { getAllOSs } from "../services/Admin/OSService";
import { getAllOrders } from "../services/Admin/OrderService";
import { getAllProducts } from "../services/Admin/ProductService";
import { getAllSpecialFeatures } from "../services/Admin/SpecialFeatureService";
import { getAllStores } from "../services/Admin/StoreService";

const SIDE_NAV_WIDTH = 280;

const RootPageUser = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

const DataContext = createContext();

function AdminLayout(props) {
  const [open, setOpen] = React.useState(false);
  const pathname = useLocation().pathname;
  const [dataFetched, setDataFected] = useState([]);

  // const handleGetProducts = async () => {
  //   const productsResponse = await getAllProducts();
  //   if (productsResponse.success) {
  //     setAllProducts(productsResponse.data.data);
  //   }
  // };

  // useEffect(() => {
  //   if (pathname === "/admin/product-management/list") {
  //     handleGetProducts();
  //   }
  // }, [pathname]);

  // const fetchData = async () => {
  //   var response;
  //   if (pathname === "/admin/product-management/list") {
  //     response = await getAllProducts();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/customer-management/list") {
  //     response = await getAllCustomers();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/staff-management/list") {
  //     response = await getAllStaffs();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/address-management/province/list") {
  //     response = await getAllProvinces();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/catalog-management/list") {
  //     response = await getAllCatalogs();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/brand-management/list") {
  //     response = await getAllBrands();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/color-management/list") {
  //     response = await getAllColors();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/special-feature-management/list") {
  //     response = await getAllSpecialFeatures();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/store-management/list") {
  //     response = await getAllStores();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/os-management/list") {
  //     response = await getAllOSs();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/coupon-management/list") {
  //     response = await getAllCoupons();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/feedback-management/list") {
  //     response = await getAllFeedbacks();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  const [searchParams] = useSearchParams();

  const fetchData = useCallback(async () => {
    let response;

    switch (pathname) {
      case "/admin/product-management/list":
        response = await getAllProducts();
        break;
      case "/admin/customer-management/list":
        response = await getAllCustomers();
        break;
      case "/admin/address-management/province":
        response = await getAllProvinces();
        break;
      case "/admin/address-management/province/detail":
        response = await getAllDistricts(searchParams.get("provinceId"));
        break;
      case "/admin/catalog-management/list":
        response = await getAllCatalogs();
        break;
      case "/admin/brand-management":
        response = await getAllBrands();
        break;
      case "/admin/color-management/list":
        response = await getAllColors();
        break;
      case "/admin/special-feature-management/list":
        response = await getAllSpecialFeatures();
        break;
      case "/admin/store-management/list":
        response = await getAllStores();
        break;
      case "/admin/os-management/list":
        response = await getAllOSs();
        break;
      case "/admin/coupon-management/list":
        response = await getAllCoupons();
        break;
      case "/admin/feedback-management/list":
        response = await getAllFeedbacks();
        break;
      case "/admin/order-management/list":
        response = await getAllOrders();
        break;
      default:
        break;
    }

    if (response?.success) {
      setDataFected(response.data.data);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider value={{ dataFetched }}>
      <Fragment>
        <TopNavbar onDrawerClick={setOpen} />
        <AdminSidebar open={open} onOpenClose={setOpen} />
        <RootPageUser>
          <LayoutContainer>
            <Outlet />
          </LayoutContainer>
        </RootPageUser>
      </Fragment>
    </DataContext.Provider>
  );
}

export { DataContext };
export default AdminLayout;
