import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { danhSachNhanVien } from "./components/TaskData";
import Login from "./components/Login";
import Trangchu from "./components/Trangchu";
import BoPhanCuaToi from "./components/BoPhanCuaToi";
import QuanLyPhongBan from "./components/QuanLyPhongBan";
import ChiTietPhongBan from "./components/ChiTietPhongBan"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/department" element={<BoPhanCuaToi />}></Route>
        <Route path="/departments" element={<QuanLyPhongBan />}></Route>
        
        {/* 2. KHAI BÁO ROUTE CHO TRANG CHI TIẾT PHÒNG BAN */}
        <Route path="/departments/:code" element={<ChiTietPhongBan />}></Route>
        
        <Route
          path="/"
          element={<Trangchu danhSachNhanVien={danhSachNhanVien} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;