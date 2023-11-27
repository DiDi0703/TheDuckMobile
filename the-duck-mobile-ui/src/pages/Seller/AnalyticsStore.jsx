import { useTheme } from "@emotion/react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import RevenueChart from "../../components/Admin/RevenueChart";
import OptionsInAnalyticPageStore from "../../components/Store/OptionsInAnalyticPageStore";
import OrdersPieChart from "../../components/Store/OrdersPieChart";

const paperStyle = {
  marginTop: 4,
  borderRadius: "8px",
};

function AnalyticsStore(props) {
  const theme = useTheme();
  const isFullWidth = useMediaQuery(theme.breakpoints.up("md"));
  const spacingValue = isFullWidth ? 4 : 0;

  return (
    <Box component={"main"} sx={{ flexGrow: 1, pt: 0, pb: 4 }}>
      <Container>
        <Stack direction={"column"} spacing={4} width={"100%"}>
          <Stack direction={"column"} width={"100%"}>
            <Typography
              variant="h3"
              fontWeight={600}
              style={{
                textTransform: "uppercase",
                fontSize: "2rem",
              }}
            >
              Thống kê
            </Typography>

            <Grid container spacing={spacingValue}>
              <Grid item xs={12} md={8}>
                <OptionsInAnalyticPageStore />
                <Stack component={Paper} elevation={3} sx={paperStyle}>
                  <Stack
                    sx={{
                      borderRadius: "10px",
                      paddingTop: 0,
                    }}
                  >
                    <RevenueChart />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <OrdersPieChart />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default AnalyticsStore;
