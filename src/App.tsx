import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import { danhSachNhanVien } from "./components/TaskData";
import Login from "./components/Login";
import Trangchu from "./components/Trangchu";
import BoPhanCuaToi from "./components/BoPhanCuaToi";
import QuanLyPhongBan from "./components/QuanLyPhongBan";
import ChiTietPhongBan from "./components/ChiTietPhongBan"; 
=======
import "./App.css";
import DangNhap from "./components/DangNhap";
import Trangchu from "./components/TrangChu";
import DanhSachPhongBan from "./components/DanhSachPhongBan";
import ThongTinCaNhan from "./components/ThongTinCaNhan";
import BangChamCong from "./components/BangChamCong";
import ChiTietPhongBan from "./components/ChiTietPhongBan";
import PhongBan from "./components/PhongBan";
import DanhSachNhanVien from "./components/DanhSachNhanVien";
>>>>>>> hieu

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/login" element={<Login />}></Route>
        <Route path="/department" element={<BoPhanCuaToi />}></Route>
        <Route path="/departments" element={<QuanLyPhongBan />}></Route>
        
        {/* 2. KHAI BÁO ROUTE CHO TRANG CHI TIẾT PHÒNG BAN */}
        <Route path="/departments/:code" element={<ChiTietPhongBan />}></Route>
        
        <Route
          path="/"
          element={<Trangchu danhSachNhanVien={danhSachNhanVien} />}
        ></Route>
=======
        <Route path="/login" element={<DangNhap />}></Route>
        <Route path="/employeelist" element={<DanhSachNhanVien />}></Route>
        <Route path="/profile" element={<ThongTinCaNhan />}></Route>
        <Route path="/departments" element={<DanhSachPhongBan />}></Route>
        {<Route path="/department" element={<PhongBan />}></Route>}
        <Route path="/departments/:id" element={<ChiTietPhongBan />}></Route>
        <Route path="/timesheet/" element={<BangChamCong />}></Route>
        <Route path="/" element={<Trangchu />}></Route>
>>>>>>> hieu
      </Routes>
    </BrowserRouter>
  );
}

export default App;