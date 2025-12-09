import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DangNhap from "./components/DangNhap";
import Trangchu from "./components/TrangChu";
import DanhSachPhongBan from "./components/DanhSachPhongBan";
import ThongTinCaNhan from "./components/ThongTinCaNhan";
import BangChamCong from "./components/BangChamCong";
import ChiTietPhongBan from "./components/ChiTietPhongBan";
import PhongBan from "./components/PhongBan";
import DanhSachNhanVien from "./components/DanhSachNhanVien";
import BangLuongNhanVien from "./components/BangLuongNhanVien";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<DangNhap />}></Route>
        <Route path="/employeelist" element={<DanhSachNhanVien />}></Route>
        <Route path="/profile" element={<ThongTinCaNhan />}></Route>
        <Route path="/departments" element={<DanhSachPhongBan />}></Route>
        {<Route path="/department" element={<PhongBan />}></Route>}
        <Route path="/departments/:id" element={<ChiTietPhongBan />}></Route>
        <Route path="/timesheet/" element={<BangChamCong />}></Route>
        <Route path="/" element={<Trangchu />}></Route>
        <Route path="/salarysheet" element={<BangLuongNhanVien />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
