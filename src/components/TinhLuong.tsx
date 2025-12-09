import React, { useEffect, useState } from "react";
import "./TinhLuong.css";
import { danhSachNhanVien } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

interface DongLuong {
  id: string;
  ten: string;
  month: string;
  luongCoBan: number;
  tongGioLam: number;
  gioTangCa: number;
  tongLuong: number;
  status: "pending" | "approved" | "paid";
}

const TinhLuong: React.FC = () => {
  const [duLieuLuong, setDuLieuLuong] = useState<DongLuong[]>([]);
  const [thang, setThang] = useState("2025-01");
  const [dangTai, setDangTai] = useState(false);

  const taiBangLuongTheoThang = () => {
    setDangTai(true);

    setTimeout(() => {
      const rows: DongLuong[] = danhSachNhanVien.map((nv) => {
        const tongGio = nv.tongGioLam ?? 40;
        const gioOT = tongGio > 40 ? tongGio - 40 : 0;

        const luongOT = (nv.luongCoBan / 40) * gioOT * 1.5;
        const tongLuong = nv.luongCoBan + luongOT;

        return {
          id: nv.id,
          ten: nv.ten,
          month: thang,
          luongCoBan: nv.luongCoBan,
          tongGioLam: tongGio,
          gioTangCa: gioOT,
          tongLuong,
          status: "pending",
        };
      });

      setDuLieuLuong(rows);
      setDangTai(false);
    }, 400);
  };

  const duyetTatCa = () => {
    setDuLieuLuong((prev) =>
      prev.map((dong) => ({ ...dong, status: "approved" }))
    );
  };

  const danhDauDaTra = () => {
    setDuLieuLuong((prev) =>
      prev.map((dong) => ({ ...dong, status: "paid" }))
    );
  };

  const duyetMotNguoi = (id: string) => {
    setDuLieuLuong((prev) =>
      prev.map((dong) =>
        dong.id === id ? { ...dong, status: "approved" } : dong
      )
    );
  };

  const danhDauDaTraMotNguoi = (id: string) => {
    setDuLieuLuong((prev) =>
      prev.map((dong) =>
        dong.id === id ? { ...dong, status: "paid" } : dong
      )
    );
  };

  useEffect(() => {
    taiBangLuongTheoThang();
  }, [thang]);

  const hienTrangThai = (tt: DongLuong["status"]) => {
    if (tt === "pending") return "Đang chờ";
    if (tt === "approved") return "Đã duyệt";
    return "Đã trả";
  };

  return (
    <div>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="content">

          <div className="payroll-container">
            <h1 className="title">Tính lương nhân viên</h1>

            <div className="controls">
              <div>
                <label>Chọn tháng:</label>
                <input
                  type="month"
                  value={thang}
                  onChange={(e) => setThang(e.target.value)}
                />
              </div>
            </div>

            {dangTai ? (
              <p>Đang tải...</p>
            ) : (
              <table className="payroll-table">
                <thead>
                  <tr>
                    <th>Nhân viên</th>
                    <th>Tổng giờ</th>
                    <th>Giờ OT</th>
                    <th>Lương cơ bản</th>
                    <th>Tổng lương</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {duLieuLuong.map((dong) => (
                    <tr key={dong.id}>
                      <td>{dong.ten}</td>
                      <td>{dong.tongGioLam}</td>
                      <td>{dong.gioTangCa}</td>
                      <td>{dong.luongCoBan.toLocaleString()}đ</td>
                      <td>{dong.tongLuong.toLocaleString()}đ</td>
                      <td>{hienTrangThai(dong.status)}</td>
                      <td>
                        {dong.status !== "approved" && (
                          <button
                            className="btn-small"
                            onClick={() => duyetMotNguoi(dong.id)}
                          >
                            Duyệt
                          </button>
                        )}

                        {dong.status !== "paid" && (
                          <button
                            className="btn-small primary"
                            onClick={() => danhDauDaTraMotNguoi(dong.id)}
                          >
                            Đã trả
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="batch-actions">
              <button className="btn" onClick={duyetTatCa}>
                Duyệt tất cả
              </button>

              <button className="btn primary" onClick={danhDauDaTra}>
                Đánh dấu đã trả lương
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TinhLuong;
