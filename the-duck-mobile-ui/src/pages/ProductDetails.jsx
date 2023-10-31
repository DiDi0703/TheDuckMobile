import styled from "@emotion/styled";
import React from "react";
import CustomBreadcrumb from "../components/CustomBreadcrumb";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import QuantityCounter from "../components/QuantityCounter";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TabRelative from "../components/TabRelative";
import ProductGrid from "../components/ProductGrid";
import Sliders from "../components/Sliders";
import FormatCurrency from "../components/FormatCurrency";

const Wrapper = styled.div``;
const ShopArea = styled.div`
  padding-top: 30px;
  color: rgba(0, 0, 0, 0.65);
  padding-bottom: 100px;
`;

const Container = styled.div`
  display: block;
  width: 80%;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 auto;
  overflow: hidden;

  /* @media (min-width: 960px) {
    max-width: 1100px;
  }

  @media (max-width: 959px) and (min-width: 720px) {
    max-width: 720px;
  }

  @media (max-width: 719px) and (min-width: 540px) {
    max-width: 540px;
  } */
`;
const PageContainer = styled.div`
  width: 100%;
  padding-right: 0;
`;

const StyledButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.color1.main,
    color: theme.palette.color4.main4,
  },
}));

function ProductDetails(props) {
  const imagesURL = [
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsJTIwY3V0ZXxlbnwwfDF8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1503595855261-9418f48a991a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFuaW1hbCUyMGN1dGV8ZW58MHwxfDB8fHww",
    "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGFuaW1hbCUyMGN1dGV8ZW58MHwxfDB8fHww",
    "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGFuaW1hbCUyMGN1dGV8ZW58MHwxfDB8fHww",
    "https://images.unsplash.com/photo-1547178270-177ae603f6e2?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGFuaW1hbCUyMGN1dGV8ZW58MHwxfDB8fHww",
    "https://images.unsplash.com/photo-1530041539828-114de669390e?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1681882526882-c2da94c47783?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [urlImage, setUrlImage] = React.useState(imagesURL[0]);
  const [value, setValue] = React.useState(2);
  return (
    <Wrapper>
      <CustomBreadcrumb
        urls={[
          {
            url: "/",
            text: "Trang chủ",
          },
          {
            url: "/category",
            text: "Điện thoại",
          },
          {
            url: null,
            text: "Sound Intone I65 Earphone White Version",
          },
        ]}
      />
      <ShopArea>
        <Container>
          <PageContainer>
            <Grid direction={"row"} container width={"100%"}>
              <Grid
                container
                item
                md={6}
                xs={12}
                direction={"column"}
                height={"700px"}
                paddingLeft={"15px"}
                paddingRight={"15px"}
              >
                <Grid item xs={8} width={"100%"} overflow={"hidden"}>
                  <Card sx={{ height: "100%" }}>
                    <Box
                      sx={{
                        height: "100%",
                        width: "100%",
                        backgroundImage: `url(${urlImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></Box>
                  </Card>
                </Grid>
                <Grid item xs={4} width={"100%"} overflow={"hidden"}>
                  <Sliders
                    urls={imagesURL}
                    arrows
                    slidesToScroll={3}
                    slidesToShow={4}
                    height={"12rem"}
                    onClick={(e) => {
                      setUrlImage(e.target.src);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                paddingLeft={"15px"}
                paddingRight={"15px"}
              >
                <Stack
                  direction={"column"}
                  width={"100%"}
                  sx={{
                    marginLeft: {
                      xs: "0",
                      md: "10%",
                    },
                  }}
                >
                  <Typography variant={"h4"} color={"#0c0b0bc9"}>
                    Sound Intone I65 Earphone White Version
                  </Typography>
                  <Box margin={"0.5% 0 3%"}>
                    <span
                      style={{
                        fontSize: "24px",
                        color: "#fe5252",
                        marginRight: "20px",
                      }}
                    >
                      <FormatCurrency amount={10000000} />
                    </span>
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#333333",
                        textDecoration: "line-through",
                      }}
                    >
                      <FormatCurrency amount={9000000} />
                    </span>
                  </Box>
                  <Box
                    marginBottom={"2rem"}
                    display={"flex"}
                    alignItems={"center"}
                    borderLeft={"1px solid #cbcaca"}
                    paddingLeft={"10px"}
                  >
                    <Rating
                      name="rating"
                      precision={0.5}
                      size="medium"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                    <span style={{ marginLeft: "10px" }}>(3 Reviews)</span>
                  </Box>
                  <div
                    style={{
                      marginBottom: "1.5rem",
                      marginTop: "10px",
                      paddingBottom: "37px",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color={"#121111ca"}
                      style={{
                        fontSize: "15px",
                        width: "95%",
                        textAlign: "justify",
                      }}
                      component={"p"}
                    >
                      Học ngay 40 đoạn hội thoại tiếng Anh giao tiếp thông dụng
                      trong đời sống sau đây để cải thiện trình độ tiếng Anh
                      nhé. Chắc chắn rằng sau khi học xong bài viết này, bạn sẽ
                      up level ngay lập tức mà bạn không kịp nhận ra, đừng quên
                      bookmark để lưu học dần mỗi ngày nha! Nếu bạn đang muốn
                      tăng khả năng phản xạ khi giao tiếp bằng Tiếng Anh thì
                      việc học các đoạn hội thoại thông dụng là rất cần thiết.
                      Dưới đây là 70 đoạn hội thoại Tiếng Anh cơ bản thông dụng
                      sử dụng hàng ngày, công sở, du lịch. Những đoạn hội thoại
                      này sẽ giúp bạn up level ngay trong 1 tuần.
                    </Typography>
                  </div>

                  <Stack
                    direction={"column"}
                    spacing={2}
                    sx={{
                      borderBottom: "1px solid #cbcaca",
                      paddingBottom: "2rem",
                    }}
                  >
                    <Box style={{ marginRight: "20px" }}>
                      <Typography variant={"h6"}>Màu sắc</Typography>
                      <Stack direction={"row"} spacing={2} marginTop={1}>
                        <Button
                          variant="outlined"
                          color="inherit"
                          sx={{
                            ":hover": {
                              backgroundColor: "#e22626",
                              color: "#fff",
                              opacity: "0.8",
                            },
                          }}
                        >
                          Hồng
                        </Button>
                        <Button
                          variant="outlined"
                          color="inherit"
                          sx={{
                            ":hover": {
                              backgroundColor: "#e22626",
                              color: "#fff",
                              opacity: "0.8",
                            },
                          }}
                        >
                          Tím
                        </Button>
                        <Button
                          variant="outlined"
                          color="inherit"
                          sx={{
                            ":hover": {
                              backgroundColor: "#e22626",
                              color: "#fff",
                              opacity: "0.8",
                            },
                          }}
                        >
                          Xanh dương
                        </Button>
                      </Stack>
                    </Box>
                    <Box style={{ marginRight: "20px" }}>
                      <Typography variant={"h6"}>Dung lượng</Typography>
                      <Stack direction={"row"} spacing={2} marginTop={1}>
                        <Button variant="outlined" color="inherit">
                          64GB
                        </Button>
                        <Button variant="outlined" color="inherit">
                          128GB
                        </Button>
                        <Button variant="outlined" color="inherit">
                          256GB
                        </Button>
                      </Stack>
                    </Box>
                    <Stack direction={"column"} spacing={1}>
                      <Stack direction={"row"} spacing={2} alignItems={"end"}>
                        <Typography variant={"h6"}>Số lượng</Typography>
                        <QuantityCounter />
                      </Stack>
                      <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                      >
                        <StyledButton
                          variant="contained"
                          color="color4"
                          size="large"
                          endIcon={<AddShoppingCartIcon />}
                          style={{
                            height: "100%",
                            flexBasis: "75%",
                            marginTop: "10px",
                            color: "#fff",
                          }}
                        >
                          Thêm vào giỏ hàng
                        </StyledButton>
                        <Checkbox
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          color="color1"
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                paddingLeft={"15px"}
                paddingRight={"15px"}
              >
                <TabRelative />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                paddingLeft={"15px"}
                paddingRight={"15px"}
                marginTop={"4rem"}
              >
                <Typography
                  variant={"h4"}
                  textAlign={"left"}
                  sx={{
                    paddingBottom: "1rem",
                    borderBottom: "1px solid #cbcaca",
                    marginBottom: "1.5rem",
                  }}
                >
                  Sản phẩm liên quan
                </Typography>
                <ProductGrid numberColumn={5} />
              </Grid>
            </Grid>
          </PageContainer>
        </Container>
      </ShopArea>
    </Wrapper>
  );
}

export default ProductDetails;
