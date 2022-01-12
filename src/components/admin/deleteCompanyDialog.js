import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function DeleteCompanyDialog(props) {
  const [companyData, setCompanyData] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setCompanyData(props.data);
  }, [props.isOpen]);

  const deleteCompnay = (id) => {
    const payload = {
      id,
    };
    dispatch({ type: "DELETE_COMPANIES_REQUEST", payload });
  };
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.toggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You want to delete this company ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteCompnay(props.data.id);
              props.toggle();
            }}
          >
            Delete
          </Button>
          <Button onClick={props.toggle} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteCompanyDialog;
