import Logo from "../../applogo.png";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import { blue } from "@mui/material/colors";
import Paper from "@mui/material/Paper";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const AuthUser = useSelector((state) =>
    state.adminlogin.login ? state.adminlogin.login : false
  );
  const dispatch = useDispatch();
  const router = useNavigate();
  function loginUser() {
    setLoading(true);
    const payload = {
      email,
      password,
    };
    try {
      dispatch({ type: "ADMIN_LOGIN_REQUEST", data: payload });
      setLoading(false);
    } catch (error) {
      console.log("this is error", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("this is auth state", AuthUser);
    if (AuthUser === true) {
      router("/admin/dashboard");
    }
  }, [AuthUser]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper elevation={10} sx={{ p: 2, mt: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ mt: 3, color: blue["A400"] }}
            >
              Employee Management System
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img className="App-logo" src={Logo} alt="logo" />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sx={{ p: 1, m: 1, mt: 3 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                sx={{ color: blue["A400"] }}
              >
                LOGIN.
              </Typography>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                sx={{ m: 1, width: "35ch" }}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                id="password"
                sx={{ m: 1, mt: 2, width: "35ch" }}
                label="Password"
                variant="outlined"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LoadingButton
                onClick={loginUser}
                endIcon={<LoginIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Login
              </LoadingButton>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default AdminLogin;
