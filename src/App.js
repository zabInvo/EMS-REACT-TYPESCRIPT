import "./App.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

import Login from "./components/admin/login";
import AdminLayout from "./components/admin/adminLayout";
import AdminDashboard from "./components/admin/adminDashboard";
import Companies from "./components/admin/companies";
import Employees from "./components/admin/employees";
import SalaryTable from "./components/admin/salary";
import AttendanceTable from "./components/admin/attendance";
import AdminSetting from "./components/admin/setting";

import EmployeeLogin from "./components/employee/login";
import EmployeeLayout from "./components/employee/employeeLayout";
import EmployeeDashboard from "./components/employee/dashboard";
import EmployeeSetting from "./components/employee/setting";
import EmployeeAttendanceTable from "./components/employee/attendance";
import { Routes, Route, Navigate } from "react-router-dom";

import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const vertical = "top";
  const horizontal = "right";
  const open = useSelector((state) => state.snackbarReducer.status);
  const message = useSelector((state) => state.snackbarReducer.message);
  const error = useSelector((state) => state.snackbarReducer.error);
  const type = useSelector((state) => state.snackbarReducer.type);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  function Transition(props) {
    return <Slide {...props} direction="left" />;
  }

  const closeSnackbar = () => {
    const snackPayload = {
      status: false,
      type: type,
      message: "",
      error: error,
    };
    dispatch({ type: "CLEAR_SNACKBAR_REQUEST", snackPayload });
  };

  function RequireAdminAuth({ children, redirectTo }) {
    let isAuthenticated = localStorage.getItem("adminToken");
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  function RequireEmployeeAuth({ children, redirectTo }) {
    let isAuthenticated = localStorage.getItem("employeeToken");
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  return (
    <>
      <Routes>
        {/* EMPLOYEE ROUTES */}
        <Route path="/" element={<EmployeeLogin />} />
        <Route
          path="/"
          element={
            <RequireEmployeeAuth redirectTo="/">
              <EmployeeLayout />
            </RequireEmployeeAuth>
          }
        >
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="attendance" element={<EmployeeAttendanceTable />} />
          <Route path="setting" element={<EmployeeSetting />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <RequireAdminAuth redirectTo="/admin/login">
              <AdminLayout />
            </RequireAdminAuth>
          }
        >
          <Route index element={<AdminLayout />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="company" element={<Companies />} />
          <Route path="employees" element={<Employees />} />
          <Route path="salary" element={<SalaryTable />} />
          <Route path="attendance" element={<AttendanceTable />} />
          <Route path="setting" element={<AdminSetting />} />
        </Route>
      </Routes>

      {/* GLOBAL SNACKBAR */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        TransitionComponent={Transition}
      >
        <Alert onClose={closeSnackbar} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
