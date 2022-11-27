import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { handleSearchBy } from "./actions/actionTypes";
export default function BasicSelect() {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    dispatch(handleSearchBy(filter));
  }, [filter]);
  const path = useSelector((state) => state.reducer.search);
  // console.log(path);
  const object = {
    users: ["userName", "orgName", "categoryName"],
    organizations: ["orgName"],
    groups: ["categoryName"],
  };
  return (
    <Box sx={{ minWidth: 120, padding: "0" }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Search</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Search
          "
          onChange={handleChange}
        >
          {path
            ? object[path].map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })
            : null}
        </Select>
      </FormControl>
    </Box>
  );
}
