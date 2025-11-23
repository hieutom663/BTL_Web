import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { danhSachNhanVien } from "./components/TaskData";
import Login from "./components/Login";
import Trangchu from "./components/Trangchu";
import { useState } from "react";
import MyDepartment from "./components/MyDepartment";
import DepartmentManager from "./components/DepartmentManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/department" element={<MyDepartment />}></Route>
        <Route path="/departments" element={<DepartmentManager />}></Route>
        <Route
          path="/"
          element={<Trangchu danhSachNhanVien={danhSachNhanVien} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
