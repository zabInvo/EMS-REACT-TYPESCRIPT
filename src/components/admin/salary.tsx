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
import IconButton from "@mui/material/IconButton";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Grid from "@mui/material/Grid";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UpdateSalaryDialog from "./updateSalaryDialog";
import CreateSalaryDialog from "./createSalaryDialog";

import { useAppSelector } from "../../redux/reduxHook";
import { EmployeeObject } from "../../redux/reducers/admin/salaryReducer";

const _ = require("lodash");

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

const SalaryTable: React.FC<EmployeeObject> = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCreateSalaryModal, setShowCreateSalaryModal] = useState(false);
  const [salaries, setSalaries] = useState<Array<EmployeeObject> | []>([]);
  const [sorting, setSorting] = useState("desc");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeObject>();
  const dispatch = useDispatch();
  const data = useAppSelector((state) =>
    state.salaryReducer.salaries ? state.salaryReducer.salaries : []
  );
  const currentCompany = useAppSelector((state) =>
    state.companyReducer.currentCompany
      ? state.companyReducer.currentCompany
      : null
  );
  useEffect(() => {
    dispatch({ type: "FETCH_SALARIES_REQUEST", currentCompany });
  }, []);

  useEffect(() => {
    setSalaries(data);
  }, [data]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleCreateSalaryModal = () => {
    setShowCreateSalaryModal(!showCreateSalaryModal);
  };

  const setEmployee = (item: EmployeeObject) => {
    setSelectedEmployee(item);
  };

  const sort = (column: string) => {
    if (column === "name") {
      if (sorting === "desc") {
        let sorting = _.orderBy(salaries, ["name"], ["asc"]);
        setSalaries(sorting);
        setSorting("asc");
      } else {
        let sorting = _.orderBy(salaries, ["name"], ["desc"]);
        setSalaries(sorting);
        setSorting("desc");
      }
    } else {
      if (sorting === "desc") {
        let sorting = _.orderBy(salaries, ["Salary.amount"], ["asc"]);
        setSalaries(sorting);
        setSorting("asc");
      } else {
        let sorting = _.orderBy(salaries, ["Salary.amount"], ["desc"]);
        setSalaries(sorting);
        setSorting("desc");
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mt: 3 }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            onClick={() => {
              toggleCreateSalaryModal();
            }}
          >
            Assign Salary
          </Button>
        </div>
      </Grid>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                Employee Name
                <IconButton
                  onClick={() => {
                    sort("name");
                  }}
                  sx={{ color: "white", mt: -1 }}
                >
                  <ImportExportIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">
                Salary
                <IconButton
                  onClick={() => {
                    sort("salary");
                  }}
                  sx={{ color: "white", mt: -1 }}
                >
                  <ImportExportIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salaries.map((item, index: number | null) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {item.name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.Salary ? item.Salary.amount : "N/A"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  <Button
                    color="warning"
                    size="small"
                    onClick={() => {
                      toggleModal();
                      setEmployee(item);
                    }}
                  >
                    Update
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UpdateSalaryDialog
        isOpen={showModal}
        toggle={toggleModal}
        data={selectedEmployee}
      />
      <CreateSalaryDialog
        isOpen={showCreateSalaryModal}
        toggle={toggleCreateSalaryModal}
      />
    </Grid>
  );
}

export default SalaryTable;
