import React, { useState } from "react";
import { NhanVien, danhSachNhanVien } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./PositionList.css";
import { Link } from "react-router-dom";

export default function PositionList() {
  const allPositions = Array.from(
    new Set(danhSachNhanVien.map((emp) => emp.chucVu))
  );

  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  const togglePosition = (pos: string) => {
    if (selectedPositions.includes(pos)) {
      setSelectedPositions(selectedPositions.filter((p) => p !== pos));
    } else {
      setSelectedPositions([...selectedPositions, pos]);
    }
  };

  const filteredEmployees = selectedPositions.length
    ? danhSachNhanVien.filter((emp) =>
        selectedPositions.includes(emp.chucVu)
      )
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
              {allPositions.map((pos) => (
                <div
                  key={pos}
                  className={`position-item ${
                    selectedPositions.includes(pos) ? "selected" : ""
                  }`}
                  onClick={() => togglePosition(pos)}
                >
                  {pos}
                </div>
              ))}
            </div>
            <div className="employee-display">
              {selectedPositions.length > 0 ? (
                <>
                  <h2>
                    Nhân viên chức vụ:{" "}
                    {selectedPositions.join(", ")}
                  </h2>
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
                        {filteredEmployees.map((emp) => (
                          <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.ten}</td>
                            <td>{emp.tenPhong}</td>
                            <td>{emp.chucVu}</td>
                            <td>{emp.luongCoBan.toLocaleString()}₫</td>
                            <td>{emp.ngayBatDau.toLocaleDateString()}</td>
                            <td>{emp.gioiTinh}</td>
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
