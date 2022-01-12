import { combineReducers } from "redux";
import loginReducer from "./admin/loginReducer";
import companyReducer from "./admin/companyReducer";
import employeesReducers from "./admin/employeesReducers";
import salaryReducer from "./admin/salaryReducer";
import attendanceReducer from "./admin/attendanceReducer";
import employeeLoginReducer from "./employee/loginReducer";
import dashboardReducer from "./employee/dashboardReducer";
import employeeAttendanceReducer from "./employee/attendanceReducer";
import adminDashboardReducer from "./admin/dashboardReducer";
import snackbarReducer from "./admin/snackbarReducer";

const reducer = combineReducers({
  adminlogin: loginReducer,
  companyReducer: companyReducer,
  employeesReducers: employeesReducers,
  salaryReducer: salaryReducer,
  attendanceReducer: attendanceReducer,
  employeeLoginReducer: employeeLoginReducer,
  employeeDashboardReducer: dashboardReducer,
  employeeAttendanceReducer: employeeAttendanceReducer,
  adminDashboardReducer: adminDashboardReducer,
  snackbarReducer: snackbarReducer,
});

export default reducer;
