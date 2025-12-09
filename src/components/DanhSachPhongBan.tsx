import axios from "axios";
import React, { useState, useEffect } from "react";
import { PhongBan } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import SuaThongTinPhong from "./SuaThongTinPhong";
import QuanLyPhongBan from "./QuanLyPhongBan";
import "./danhSachPhongBan.css";

const DanhSachPhongBan = () => {
  const [danhSachPhongBan, setDanhSachPhongBan] = useState<PhongBan[]>([]);
  const [flag, setFlag] = useState(false);
  const [formSua, setFormSua] = useState(false);
  const [formData, setFormData] = useState<PhongBan>({
    maPhong: "",
    tenPhong: "",
    namThanhLap: new Date().getFullYear(),
    trangThai: "Hoạt động",
  });
  useEffect(() => {
    axios
      .get("http://localhost:3000/danhsachphongban")
      .then((res) => setDanhSachPhongBan(res.data))
      .catch((err) => console.log("Lỗi", err));
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex " }}>
        <Sidebar />
        {!flag ? (
          <QuanLyPhongBan
            danhSachPhongBan={danhSachPhongBan}
            setDanhSachPhongBan={setDanhSachPhongBan}
            setFlag={setFlag}
            setFormData={setFormData}
            setFormSua={setFormSua}
          />
        ) : (
          <SuaThongTinPhong
            formData={formData}
            setFormData={setFormData}
            formSua={formSua}
            setFormSua={setFormSua}
            setFlag={setFlag}
          />
        )}
      </div>
    </div>
  );
};

export default DanhSachPhongBan;
