import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, FC } from "react";

import AdminCurrentCompanyDialog from "./adminCompanyDialog";

import  RootReducer  from "./interfaces";

const AdminDashboard:FC = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(true);
  const companies = useSelector((state:RootReducer)  =>
    state.adminDashboardReducer.companies
      ? state.adminDashboardReducer.companies
      : 0
  );
  const admin = useSelector((state:RootReducer) =>
    state.adminDashboardReducer.admins ? state.adminDashboardReducer.admins : 0
  );
  const employees = useSelector((state:RootReducer) =>
    state.adminDashboardReducer.employees
      ? state.adminDashboardReducer.employees
      : 0
  );
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_COMPANIES_REQUEST" });
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{ maxWidth: 275, m: 2 }}>
            <Card elevation={5}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Total Companies
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Active
                </Typography>
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: blue["A400"],
                  }}
                >
                  {companies}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => router("/admin/company")}>
                  More Details
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{ maxWidth: 275, m: 2 }}>
            <Card elevation={5}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Total Employees
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Active
                </Typography>
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: blue["A400"],
                  }}
                >
                  {employees}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => router("/admin/employees")}>
                  More Details
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{ maxWidth: 275, m: 2 }}>
            <Card elevation={5}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Total Admins
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Active
                </Typography>
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: blue["A400"],
                  }}
                >
                  {admin}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">More Details</Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        <AdminCurrentCompanyDialog isOpen={showModal} toggle={toggleModal} />
      </Grid>
    </div>
  );
};

export default AdminDashboard;
