import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";

function CreateSalaryDialog(props) {
  const [salary, setSalary] = useState("");
  const [value, setValue] = useState("");
  const employees = useSelector((state) =>
    state.employeesReducers.employees ? state.employeesReducers.employees : []
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setSalary("");
  }, [props.isOpen]);

  const createSalary = () => {
    const payload = {
      userId: value.id,
      salary,
    };
    dispatch({ type: "CREATE_SALARY_REQUEST", payload });
  };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.toggle}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Assign Salary</DialogTitle>
        <DialogContent>
          <Autocomplete
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            id="controllable-states-demo"
            options={employees}
            sx={{ mt: 2 }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={({ target }) => setValue(target.value)}
                label="Employees"
              />
            )}
          />
          <TextField
            autoFocus
            margin="dense"
            id="salary"
            label="Salary"
            type="number"
            value={salary}
            sx={{ mt: 3 }}
            fullWidth
            variant="standard"
            onChange={(event) => setSalary(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              createSalary();
              props.toggle();
            }}
          >
            Create
          </Button>
          <Button onClick={props.toggle}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateSalaryDialog;
