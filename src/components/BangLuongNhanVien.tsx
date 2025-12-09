import React, { useEffect, useState } from "react";
import axios from "axios";
//import "./TinhLuong.css";
import { DongLuong, maNv, role } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function BangLuongNhanVien() {
  const [bangLuongThang, setBangLuongThang] = useState<DongLuong[]>([]);
  const [thang, setThang] = useState(new Date().getMonth() + 1);
  const [nam, setNam] = useState(new Date().getFullYear());
  const duLieuNhanVien = bangLuongThang.filter(
    (e) => e.maNhanVien === maNv && e.nam === nam
  );
  const duLieuAdmin = bangLuongThang.filter((e) => e.thang === thang);
  const tinhLuong = (nv: DongLuong) => {
    const donGiaGio = nv.luongCoBan / 171;
    return Number(nv.luongCoBan) + Number(donGiaGio * nv.tongGioTangCa * 1.5);
  };
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
            <h2 className="title">Bảng lương</h2>

            <div className="controls">
              {role === "admin" ? (
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
              ) : (
                <></>
              )}
            </div>
            <hr />

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
                {(role === "user" ? duLieuNhanVien : duLieuTamThoi).map(
                  (dong) => (
                    <tr key={dong.maBangLuong}>
                      <td>{dong.maNhanVien}</td>
                      <td>{dong.tongGioLam}</td>
                      <td>{dong.tongGioTangCa}</td>
                      <td>{Math.round(dong.luongCoBan)} VND</td>
                      <td>{Math.round(tinhLuong(dong))} VND</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            {[...Array(Math.ceil(duLieuAdmin.length / 20))].map((e, i) => {
              const currentPage = i + 1;
              const isActive = currentPage === page;
              return (
                <button
                  key={currentPage}
                  className={`page-btn ${isActive ? "active" : ""}`}
                  onClick={() => setPage(currentPage)}
                  aria-current={isActive ? "page" : undefined}
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
