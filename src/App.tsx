import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { danhSachNhanVien } from "./TaskData";
import Login from "./Login";
import Trangchu from "./Trangchu";
import MyDepartment from "./MyDepartment";
import DepartmentManager from "./DepartmentManager";
import Employee from "./EmployeeList";
import PositionList from "./PositionList";
import TinhLuong from "./TinhLuong";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/department" element={<MyDepartment />}></Route>
        <Route path="/departments" element={<DepartmentManager />}></Route>
        <Route
          path="/"
          element={<Trangchu danhSachNhanVien={danhSachNhanVien} />}
        ></Route>
        <Route path="/employees" element={<Employee />}></Route>
        <Route path="/positions" element={<PositionList />}></Route>
        <Route path="/payroll-salary" element={<TinhLuong />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
