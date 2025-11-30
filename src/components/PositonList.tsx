import React, { useState } from "react";
import { NhanVien, danhSachNhanVien } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./PositionList.css";
import { Link } from "react-router-dom";

export default function DanhSachChucVu() {
  const tatCaChucVu = Array.from(
    new Set(danhSachNhanVien.map((nv) => nv.chucVu))
  );

  const [chucVuDaChon, setChucVuDaChon] = useState<string[]>([]);

  const chonChucVu = (cv: string) => {
    if (chucVuDaChon.includes(cv)) {
      setChucVuDaChon(chucVuDaChon.filter((c) => c !== cv));
    } else {
      setChucVuDaChon([...chucVuDaChon, cv]);
    }
  };

  const nhanVienLoc = chucVuDaChon.length
    ? danhSachNhanVien.filter((nv) => chucVuDaChon.includes(nv.chucVu))
    : [];

  return (
    <div>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="position-content">
          <h1>Danh sách chức vụ</h1>

          <div className="position-container">

            <div className="position-list">
              {tatCaChucVu.map((cv) => (
                <div
                  key={cv}
                  className={`position-item ${
                    chucVuDaChon.includes(cv) ? "selected" : ""
                  }`}
                  onClick={() => chonChucVu(cv)}
                >
                  {cv}
                </div>
              ))}
            </div>

            <div className="employee-display">
              {chucVuDaChon.length > 0 ? (
                <>
                  <h2>Nhân viên chức vụ: {chucVuDaChon.join(", ")}</h2>

                  <div className="table-container">
                    <table className="employee-table">
                      <thead>
                        <tr className="table-header">
                          <th>Mã NV</th>
                          <th>Họ Tên</th>
                          <th>Phòng ban</th>
                          <th>Chức vụ</th>
                          <th>Lương</th>
                          <th>Ngày bắt đầu</th>
                          <th>Giới tính</th>
                        </tr>
                      </thead>

                      <tbody>
                        {nhanVienLoc.map((nv) => (
                          <tr key={nv.id}>
                            <td>{nv.id}</td>
                            <td>{nv.ten}</td>
                            <td>{nv.tenPhong}</td>
                            <td>{nv.chucVu}</td>
                            <td>{nv.luongCoBan.toLocaleString()}₫</td>
                            <td>{nv.ngayBatDau.toLocaleDateString()}</td>
                            <td>{nv.gioiTinh}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <p>Chọn ít nhất một chức vụ bên trái để xem nhân viên</p>
              )}
            </div>
          </div>

          <div className="back-link">
            <Link to="/">Quay về trang chủ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
