import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { blue } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import dummyUser from "../../dummyUser.png";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function EmployeeSetting() {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  function changePassword() {
    setLoading(true);
    const payload = {
      oldPassword,
      newPassword,
    };
    try {
      dispatch({ type: "EMPLOYEE_UPDATE_PASSWORD_REQUEST", payload });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("this is error", error);
    }
  }
  useEffect(() => {}, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper elevation={10} sx={{ p: 2, mt: 2 }}>
        <Grid container>
          <Grid item xs={12} sx={{ p: 1, m: 1, mt: 3 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                sx={{ color: blue["A400"] }}
              >
                Update Profile
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              {" "}
              <Avatar alt="" src={dummyUser} sx={{ width: 120, height: 120 }} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <IconButton color="primary">
                <CloudUploadIcon color="primary" fontSize="large" />
              </IconButton>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                id="oldPassword"
                label="Old Password"
                variant="outlined"
                type="password"
                sx={{ m: 1, width: "35ch" }}
                onChange={(event) => setOldPassword(event.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                id="newPassword"
                sx={{ m: 1, mt: 2, width: "35ch" }}
                label="New Password"
                variant="outlined"
                type="password"
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LoadingButton
                onClick={changePassword}
                loading={loading}
                variant="contained"
                sx={{ mt: 2 }}
              >
                Update Password
              </LoadingButton>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default EmployeeSetting;
