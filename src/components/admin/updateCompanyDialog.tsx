import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CompanyObject } from "../../redux/reducers/admin/companyReducer";

interface CreateCompanyProps {
  data: CompanyObject;
  isOpen: boolean;
  toggle(): void;
}

const UpdateCompanyDialog: React.FC<CreateCompanyProps> = (props) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [type, setType] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    setName(props.data?.name);
    setAddress(props.data?.address);
    setType(props.data?.type);
  }, [props.isOpen]);

  const updateCompany = (id: number) => {
    const payload = {
      id,
      name,
      address,
      type,
    };
    dispatch({ type: "UPDATE_COMPANIES_REQUEST", payload });
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
            value={name}
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
            value={address}
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
            value={type}
            fullWidth
            variant="standard"
            onChange={(event) => setType(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              updateCompany(props.data.id);
              props.toggle();
            }}
          >
            Update
          </Button>
          <Button onClick={props.toggle}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateCompanyDialog;
