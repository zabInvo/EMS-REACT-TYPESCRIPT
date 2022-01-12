import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function UpdateSalaryDialog(props) {
  const [salary, setSalary] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setSalary(props.data && props.data.Salary ? props.data.Salary.amount : "");
  }, [props.isOpen]);

  const updateSalary = (userId) => {
    const payload = {
      userId,
      salary
    };
    dispatch({ type: "UPDATE_SALARY_REQUEST", payload });
  };
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.toggle}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Upadate Salary</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="salary"
            label="Salary"
            value={salary}
            fullWidth
            variant="standard"
            onChange={(event) => setSalary(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button  onClick={() => {
              updateSalary(props.data.id);
              props.toggle();
            }}>Update</Button>
          <Button onClick={props.toggle}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateSalaryDialog;
