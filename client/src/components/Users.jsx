import React, { useState, useEffect } from "react";
import User from "./UserTable";
import { Button, Box, Stack } from "@mui/material";
import SideBar from "./Sidebar";
import Nav from "./Nav";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflowY: "hidden",
      }}
    >
      <Nav></Nav>

      <SideBar></SideBar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >

        <Stack direction="row" spacing={2} sx={{ marginBottom: "30px" }}>
          <Modal />
        </Stack>
        <User />
      </Box>
    </div>
  );
};

export default Home;
