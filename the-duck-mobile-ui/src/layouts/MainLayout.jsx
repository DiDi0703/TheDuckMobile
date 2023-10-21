import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const StyledMain = styled(Box)(({ theme }) => ({
  marginTop: "80px",
}));

function MainLayout(props) {
  return (
    <>
      <Navbar />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </>
  );
}

export default MainLayout;
