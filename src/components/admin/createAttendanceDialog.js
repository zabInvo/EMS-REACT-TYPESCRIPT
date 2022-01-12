import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";

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

function CreateAttendanceDialog(props) {
  const [scroll, setScroll] = useState("paper");
  const [checked, setChecked] = useState([]);
  const dispatch = useDispatch();
  const createAttendace = (index, user) => {
    setChecked((oldArray) => [...oldArray, index]);
    const payload = {
      userId: user,
      status: "Present",
      date: moment(new Date()).format("YYYY-MM-DD"),
    };
    dispatch({ type: "CREATE_ATTENDANCE_REQUEST", payload });
  };

  const employees = useSelector((state) =>
    state.employeesReducers.employees ? state.employeesReducers.employees : []
  );

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.toggle}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="scroll-dialog-title">Create Attendance</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <TableContainer component={Paper} sx={{ mt: 5 }}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Employee Name</StyledTableCell>
                  <StyledTableCell>Present</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      <Checkbox
                        checked={checked.includes(index)}
                        onChange={() => createAttendace(index, item.id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.toggle}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateAttendanceDialog;
