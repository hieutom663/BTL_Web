import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Trangchu from "./components/Trangchu";
//import MyDepartment from "./components/MyDepartment";
import DepartmentManager from "./components/QuanLyPhongBan";
import PositionList from "./components/PositonList";
import ThongTinCaNhan from "./components/ThongTinCaNhan";
import BangChamCong from "./components/BangChamCong";

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
        <Route path="/profile" element={<ThongTinCaNhan />}></Route>
        <Route
          path="/departments"
          element={<DepartmentManager danhSachPhongBan={danhSachPhongBan} />}
        ></Route>
        <Route path="/positions" element={<PositionList />}></Route>
        <Route
          path="/timesheet/"
          element={<BangChamCong BangThongTinChamCong={BangThongTinChamCong} />}
        ></Route>
        <Route
          path="/"
          element={
            <Trangchu
              danhSachNhanVien={danhSachNhanVien}
              danhSachPhongBan={danhSachPhongBan}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
