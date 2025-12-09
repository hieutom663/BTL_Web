import React, { useEffect, useState } from "react";
import axios from "axios";
import { DongLuong, maNv, role, tinhLuong } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./BangChamCong.css";

function BangLuongNhanVien() {
  const [bangLuongThang, setBangLuongThang] = useState<DongLuong[]>([]);
  const [thang, setThang] = useState(new Date().getMonth() + 1);
  const [nam, setNam] = useState(new Date().getFullYear());

  const duLieuNhanVien = bangLuongThang.filter(
    (e) => e.maNhanVien === maNv && e.nam === nam
  );

  const duLieuAdmin = bangLuongThang.filter(
    (e) => e.thang === thang && e.nam === nam
  );

  const [page, setPage] = useState(1);
  const duLieuTrongMotTrang = 23;
  const viTriBatDau = (page - 1) * duLieuTrongMotTrang;

  const duLieuTamThoi = duLieuAdmin.slice(
    viTriBatDau,
    viTriBatDau + duLieuTrongMotTrang
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000/bangluongthang")
      .then((res) => setBangLuongThang(res.data))
      .catch((err) => console.log("Lỗi", err));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="bcc-admin-container">
          <h2 className="bcc-title">Bảng lương</h2>
          <hr />

          {role === "admin" && (
            <div className="bcc-filter">
              <label>Tháng:</label>
              <select
                value={thang}
                onChange={(e) => setThang(Number(e.target.value))}
              >
                {[...Array(12)].map((_, t) => (
                  <option key={t}>{t + 1}</option>
                ))}
              </select>

              <label>Năm:</label>
              <select
                value={nam}
                onChange={(e) => setNam(Number(e.target.value))}
              >
                <option>{nam}</option>
              </select>
            </div>
          )}

          <hr />

          <table className="bcc-table" border={1} cellPadding={10}>
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
              {(role === "user" ? duLieuNhanVien : duLieuTamThoi).map(
                (dong) => (
                  <tr key={dong.maBangLuong}>
                    <td>{dong.maNhanVien}</td>
                    <td>{dong.tongGioLam}</td>
                    <td>{dong.tongGioTangCa}</td>
                    <td>{Math.round(dong.luongCoBan)} VND</td>
                    <td>{tinhLuong(dong)} VND</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <div className="bcc-pagination">
            {[
              ...Array(Math.ceil(duLieuAdmin.length / duLieuTrongMotTrang)),
            ].map((_, i) => {
              const currentPage = i + 1;
              const isActive = currentPage === page;

              return (
                <button
                  key={currentPage}
                  className={`page-btn ${isActive ? "active" : ""}`}
                  onClick={() => setPage(currentPage)}
                >
                  {currentPage}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BangLuongNhanVien;
