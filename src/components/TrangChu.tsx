import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import TheNhanVien from "./TheNhanVien";
import { PhongBan, NhanVien } from "./TaskData";

const TrangChu = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex " }}>
        <Sidebar />
        Đây là trang chủ
      </div>
      ;
    </div>
  );
};
export default TrangChu;
