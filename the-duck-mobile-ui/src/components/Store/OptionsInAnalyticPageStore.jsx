import styled from "@emotion/styled";
import EastIcon from "@mui/icons-material/East";
import { Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import orderpic from "../../assets/ordering.png";
import productpic from "../../assets/product.png";
import { useNavigate } from "react-router-dom";

const BoxStyle = styled(Box)(({ theme }) => ({
  paddingTop: "12px !important",
  paddingBottom: "8px !important",
  borderRadius: "16px",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
  color: "  #676a6f",
  variant: "subtitle1",
  fontWeight: "550 !important",
  width: "100%",
}));

const TieuDeCot = styled(Typography)(({ theme }) => ({
  fontSize: "20px !important",
  variant: "body1",
  fontWeight: "650 !important",
  color: "  #101828 !important",
}));

function OptionsInAnalyticPageStore(props) {
  const navigate = useNavigate();
  const { statisticData } = props;
  return (
    <Stack
      spacing={2}
      component={Paper}
      elevation={2}
      sx={{
        marginTop: 4,
        borderRadius: "8px",
        padding: "12px !important",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BoxStyle
            sx={{
              background: "linear-gradient(45deg, #EBFAFF 30%, #ADEBFF 90%)",
            }}
          >
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              sx={{
                borderBottom: "1px solid #828282",
                paddingBottom: "12px",
                paddingLeft: "24px",
              }}
            >
              <img
                src={orderpic}
                alt="cart"
                style={{
                  width: "55px",
                  height: "55px",
                  objectFit: "contain",
                  marginTop: "8px",
                }}
              />
              <Stack direction={"column"}>
                <TieuDe>Số Đơn Hàng</TieuDe>
                <TieuDeCot>{statisticData.totalOrders}</TieuDeCot>
              </Stack>
            </Stack>

            <Stack
              direction={"row"}
              spacing={0.5}
              sx={{
                paddingLeft: ["36px", "36px", "12px"],
                paddingRight: "12px",
                alignItems: "center",
                paddingTop: "4px",
              }}
            >
              <Typography
                variant="body2"
                style={{
                  color: "#676a6f",
                  fontSize: "14px",
                  fontWeight: "550",
                }}
              >
                Trang đơn hàng
              </Typography>
              <IconButton
                size="small"
                style={{
                  fontSize: "14px",
                }}
                onClick={() => navigate("/store/orders")}
              >
                <EastIcon
                  sx={{
                    fontSize: "18px",
                  }}
                />
              </IconButton>
            </Stack>
          </BoxStyle>
        </Grid>

        <Grid item xs={12} md={6}>
          <BoxStyle
            sx={{
              background: "linear-gradient(45deg, #FFC5C2 30%, #FFECEB 90%)",
            }}
          >
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              sx={{
                borderBottom: "1px solid #828282",
                paddingBottom: "12px",
                paddingLeft: "24px",
              }}
            >
              <img
                src={productpic}
                alt="cart"
                style={{
                  width: "55px",
                  height: "55px",
                  objectFit: "contain",
                  marginTop: "8px",
                }}
              />
              <Stack direction={"column"}>
                <TieuDe>Số Sản Phẩm</TieuDe>
                <TieuDeCot>{statisticData.totalStoreProducts}</TieuDeCot>
              </Stack>
            </Stack>

            <Stack
              direction={"row"}
              spacing={0.5}
              sx={{
                paddingLeft: ["36px", "36px", "12px"],
                paddingRight: "12px",
                alignItems: "center",
                paddingTop: "4px",
              }}
            >
              <Typography
                variant="body2"
                style={{
                  color: "#676a6f",
                  fontSize: "14px",
                  fontWeight: "550",
                }}
              >
                Trang sản phẩm
              </Typography>
              <IconButton
                size="small"
                style={{
                  fontSize: "14px",
                }}
                onClick={() => navigate("/store/products")}
              >
                <EastIcon
                  sx={{
                    fontSize: "18px",
                  }}
                />
              </IconButton>
            </Stack>
          </BoxStyle>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default OptionsInAnalyticPageStore;
