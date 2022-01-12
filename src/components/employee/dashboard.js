import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function EmployeeDashboard() {
  const dispatch = useDispatch();
  const salary = useSelector((state) =>
    state.employeeDashboardReducer.salary
      ? state.employeeDashboardReducer.salary.amount
      : "N/A"
  );
  const companies = useSelector((state) =>
    state.employeeDashboardReducer.companies
      ? state.employeeDashboardReducer.companies
      : []
  );

  useEffect(() => {
    dispatch({ type: "FETCH_USER_SALARY_REQUEST" });
    dispatch({ type: "FETCH_USER_COMPANIES_REQUEST" });
  }, []);
  const renderList = companies.map((item, index) => {
    return (
      <Grid key={index} item xs={12} md={6} lg={4}>
        <Box sx={{ maxWidth: 275, m: 2 }}>
          <Card elevation={5}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.address}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.type}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    );
  });

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="div">
            Current Companies
          </Typography>
          <Divider variant="middle" />
        </Grid>

        {renderList}
      </Grid>
      <Grid container sx={{ marginTop: 5 }}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="div">
            Current Salary
          </Typography>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{ maxWidth: 275, m: 2 }}>
            <Card elevation={5}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Total Salary
                </Typography>
                PKR
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "green",
                  }}
                >
                  {salary}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default EmployeeDashboard;
