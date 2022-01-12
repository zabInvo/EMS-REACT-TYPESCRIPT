interface adminInterface {
  employees: Number;
  admins: Number;
  companies: Number;
}

interface loginInterface {
  token: string | null;
  login: boolean ;
}
interface companyInterface {
  companies: [];
  currentCompany: number | null;
}
interface employeesInterface {
  employees: [];
}
interface salaryInterface {
  salaries: [];
}
interface attendanceObject {
  status: string | null;
  date: string | null;
}

interface attendance {
  name: string;
  email: string;
  Attendances: Array<attendanceObject> | null | [];
}

interface Employees {
  Employees: Array<attendance> | null | [];
}

interface attendanceInterface {
  attendance : Array<Employees> | []
}

interface employeeLoginInterface {
  token: string | null;
  login: boolean;
}
interface dashboardInterface {
  companies: [];
  salary: string;
}
interface employeeAttendanceInterface {
  attendance: [];
}
interface snackbarInterface {
  status: boolean;
  type: string | null;
  message: string | null;
  error: boolean;
}

interface RootReducer {
  adminlogin: loginInterface;
  companyReducer: companyInterface;
  employeesReducers: employeesInterface;
  salaryReducer: salaryInterface;
  attendanceReducer: attendanceInterface;
  employeeLoginReducer: employeeLoginInterface;
  employeeDashboardReducer: dashboardInterface;
  adminDashboardReducer: adminInterface;
  employeeAttendanceReducer: employeeAttendanceInterface;
  snackbarReducer: snackbarInterface;
}

export default RootReducer;
