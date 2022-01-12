import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch } from "react-redux";

function CreateCompanyDialog(props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const createCompany = () => {
    const payload = {
      name,
      address,
      type,
    };
    dispatch({ type: "CREATE_COMPANIES_REQUEST", payload });
  };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.toggle}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create New Company</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => setAddress(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="type"
            label="Type"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => setType(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              createCompany();
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

export default CreateCompanyDialog;
