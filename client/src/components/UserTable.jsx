import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";

const columns = [
  { id: "userID", label: "ID", minWidth: 170, align: "center" },
  { id: "name", label: "Username", minWidth: 100, align: "center" },
  {
    id: "orgID",
    label: "Organizations",
    minWidth: 170,
    align: "center",
  },
  {
    id: "groupID",
    label: "Group",
    minWidth: 170,
    align: "center",
  },
];

function createData(userID, name, orgID, groupID) {
  return { userID, name, orgID, groupID };
}

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const data = useSelector((state) => state.reducer.filteredData.users);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rows = data.map((user) => {
    return createData(
      user.userID,
      user.userName,
      user.orgName,
      user.categoryName
    );
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "75%",
        overflow: "hidden",
        boxShadow:
          "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#62BA45",
                    fontWeight: "bold",
                    color: "white",
                    fontSize: "1rem",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
