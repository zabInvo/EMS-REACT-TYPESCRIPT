import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

function AdminCurrentCompanyDialog(props) {
  const dispatch = useDispatch();

  const setCurrentCompany = (id) => {
    const currentCompanyId = id;
    dispatch({ type: "SET_CURRENT_COMPANIES_REQUEST", currentCompanyId });
    dispatch({ type: "FETCH_DASHBOARD_STATS_REQUEST", currentCompanyId });
  };

  const companies = useSelector((state) =>
    state.companyReducer.companies ? state.companyReducer.companies : []
  );

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.toggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please Select Company First."}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", justifyContent: "Center" }}>
          {companies.map((item, index) => (
            <Card
              key={index}
              sx={{ maxWidth: 260, m: 2, cursor: "pointer" }}
              elevation={3}
              onClick={() => {
                setCurrentCompany(item.id);
                props.toggle();
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ display: "flex", justifyContent: "Center", mt: 2 }}
                >
                  {item.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </DialogContent>
        <DialogActions sx={{ mt: -2 }}>
          <Button onClick={props.toggle}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminCurrentCompanyDialog;
