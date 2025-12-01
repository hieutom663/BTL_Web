import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Trangchu from "./components/TrangChu";
import QuanLyPhongBan from "./components/QuanLyPhongBan";
import ThongTinCaNhan from "./components/ThongTinCaNhan";
import BangChamCong from "./components/BangChamCong";
import ChiTietPhongBan from "./components/ChiTietPhongBan";
import PhongBan from "./components/PhongBan";
import DanhSachNhanVien from "./components/DanhSachNhanVien";

function App() {
  const [danhSachNhanVien, setDanhSachNhanVien] = useState([]);
  const [danhSachPhongBan, setDanhSachPhongBan] = useState([]);
  const [BangThongTinChamCong, setBangThongTinChamCong] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/danhsachnhanvien")
      .then((res) => setDanhSachNhanVien(res.data))
      .catch((err) => console.log("Lỗi", err));

    axios
      .get("http://localhost:3000/danhsachphongban")
      .then((res) => setDanhSachPhongBan(res.data))
      .catch((err) => console.log("Lỗi", err));

    axios
      .get("http://localhost:3000/bangchamcong")
      .then((res) => setBangThongTinChamCong(res.data))
      .catch((err) => console.log("Lỗi", err));
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/employeelist"
          element={<DanhSachNhanVien danhSachNhanVien={danhSachNhanVien} />}
        ></Route>
        <Route path="/profile" element={<ThongTinCaNhan />}></Route>
        <Route
          path="/departments"
          element={<QuanLyPhongBan danhSachPhongBan={danhSachPhongBan} />}
        ></Route>
        <Route
          path="/department"
          element={<PhongBan danhSachNhanVien={danhSachNhanVien} />}
        ></Route>
        <Route
          path="/departments/:id"
          element={
            <ChiTietPhongBan
              danhSachNhanVien={danhSachNhanVien}
              danhSachPhongBan={danhSachPhongBan}
            />
          }
        ></Route>
        <Route
          path="/timesheet/"
          element={<BangChamCong BangThongTinChamCong={BangThongTinChamCong} />}
        ></Route>
        <Route path="/" element={<Trangchu />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
