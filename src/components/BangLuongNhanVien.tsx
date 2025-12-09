import React, { useEffect, useState } from "react";
import axios from "axios";
//import "./TinhLuong.css";
import { DongLuong, maNv, NhanVien, role } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function BangLuongNhanVien() {
  const [bangLuongThang, setBangLuongThang] = useState<DongLuong[]>([]);
  const [thang, setThang] = useState(new Date().getMonth() + 1);
  const [nam, setNam] = useState(new Date().getFullYear());
  const duLieuNhanVien = bangLuongThang.filter(
    (e) => e.maNhanVien === maNv && e.thang === thang
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000/bangluongthang")
      .then((res) => {
        setBangLuongThang(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Lỗi", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <div className="content">
          <div className="payroll-container">
            <h2 className="title">Tính lương nhân viên</h2>

            <div className="controls">
              <div>
                <label>Tháng:</label>
                <select
                  value={thang}
                  onChange={(e) => setThang(Number(e.target.value))}
                >
                  {[...Array(12)].map((e, t) => (
                    <option>{t + 1}</option>
                  ))}
                </select>

                <label>Năm:</label>
                <select
                  value={nam}
                  onChange={(e) => setNam(Number(e.target.value))}
                >
                  {[nam].map((n) => (
                    <option>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <table className="payroll-table" border={1} cellPadding={10}>
              <thead>
                <tr>
                  <th>Nhân viên</th>
                  <th>Tổng giờ</th>
                  <th>Giờ tăng ca</th>
                  <th>Lương cơ bản</th>
                  <th>Tổng lương</th>
                </tr>
              </thead>

              <tbody>
                {duLieuNhanVien.map((dong) => (
                  <tr key={dong.maBangLuong}>
                    <td>{dong.maNhanVien}</td>
                    <td>{dong.tongGioLam}</td>
                    <td>{dong.tongGioTangCa}</td>
                    <td>{dong.luongCoBan}đ</td>
                    <td>{dong.tongLuongNhan}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BangLuongNhanVien;
