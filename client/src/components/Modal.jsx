import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import InputBase from "@mui/material/InputBase";
import SelectOrg from "./SelectOrg";
import SelectGrp from "./SelectGrp";
import axios from "axios";
import { useDispatch } from "react-redux";
import { handleFilterData } from "./actions/actionTypes";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  border: "1px solid black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    userName: "",
    orgName: "",
    categoryName: "",
  });

  const handleChange = (e) => {
    setData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const organizations = useSelector(
    (state) => state.reducer.initialData.organizations
  );
  function createData(name) {
    return name;
  }
  const orgRows = organizations.map((org) => createData(org.orgName));
  //   console.log("rows", rows);
  // console.log("organizations", orgRows);
  const groups = useSelector((state) => state.reducer.initialData.groups);
  // console.log("groups", groups);
  const groupRows = groups.map((group) => createData(group.categoryName));
  // console.log("groupRows", groupRows);

  const submitData = async () => {

    if (data.userName !== "" && data.orgName !== "" && data.categoryName !== "") {
      const res = await axios.post("/api/users", data);
      // console.log("res", res);
      dispatch(handleFilterData({ users: res.data }));
      // console.log("submitData");
      setOpen(false);
    }
  };
  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>
        ADD USER
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              marginBottom: "20px",
              minHeight: 40,
              padding: "2px",
            }}
          >
            <StyledInputBase
              placeholder="Enter the user name"
              inputProps={{ "aria-label": "search" }}
              name="userName"
              onChange={(e) => {
                // console.log("e", e.target.value);
                handleChange(e);
              }}
              value={data.userName}
            />
          </Box>
          <Box sx={{ marginBottom: "15px" }}>
            <SelectOrg
              placeholder="select the organization"
              list={orgRows}
              handleOrg={handleChange}
            />
          </Box>
          <Box sx={{}}>
            <SelectGrp
              placeholder="select the department"
              list={groupRows}
              handleGrp={handleChange}
            />
          </Box>
          <Button
            variant="contained"
            color="success"
            type="submit"
            onClick={submitData}
          >
            SUBMIT
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
