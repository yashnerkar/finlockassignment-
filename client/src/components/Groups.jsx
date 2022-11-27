import React, { useState, useEffect } from "react";
import Org from "./OrgTable";
import { Button, Box, Stack, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SideBar from "./Sidebar";
import Nav from "./Nav";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import GrpTable from "./GroupTable";
import { handleData, handleFilterData } from "./actions/actionTypes";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const Home = () => {
  const [groupName, setgroupName] = useState({
    categoryName: "",
  });

  const dispatch = useDispatch();


  const handleSubmit = async () => {
    const res = await axios.post("/api/groups", groupName);
    // console.log(res);
    dispatch(handleFilterData({ groups: res.data }));
  };

  const handleChange = (e) => {
    // console.log("e.target.value", e.target.value);
    setgroupName((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const groups = useSelector((state) => state.reducer.initialData.groups);
  // console.log("groups", groups);
  const users = useSelector((state) => state.reducer.initialData.users);
  // console.log("users", users);

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
          <Button
            variant="contained"
            color="success"
            type="submit"
            onClick={handleSubmit}
          >
            Add Group
          </Button>
          <Search sx={{ border: "1px solid black" }}>
            <SearchIconWrapper>
              <i className="fa-regular fa-square-plus"></i>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Add Groups"
              inputProps={{ "aria-label": "search" }}
              name="categoryName"
              onChange={(e) => {
                handleChange(e);
              }}
              value={groupName.categoryName}
            />
          </Search>
        </Stack>

        <GrpTable />
      </Box>
    </div>
  );
};

export default Home;
