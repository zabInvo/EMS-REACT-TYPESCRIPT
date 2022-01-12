import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blue["900"],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function EmployeeAttendanceTable() {
  const [showModal, setShowModal] = useState(false);
  const [showCreateSalaryModal, setShowCreateSalaryModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const dispatch = useDispatch();
  const attendance = useSelector((state) =>
    state.employeeAttendanceReducer.attendance
      ? state.employeeAttendanceReducer.attendance
      : []
  );
  useEffect(() => {
    dispatch({ type: "FETCH_USER_ATTENDANCE_REQUEST" });
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleCreateSalaryModal = () => {
    setShowCreateSalaryModal(!showCreateSalaryModal);
  };

  const setEmployee = (item) => {
    setSelectedEmployee(item);
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mt: 3 }}></Grid>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {item.date ? item.date.substr(0, 10) : "N/A"}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ color: item.status == "Present" ? "green" : "red" }}
                >
                  {item.status}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default EmployeeAttendanceTable;
