import React, { useEffect, useState } from "react";
import "./TinhLuong.css";
import { danhSachNhanVien } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DongLuong {
  id: string;
  ten: string;
  thang: string;
  luongCoBan: number;
  tongGioLam: number;
  gioTangCa: number;
  tongLuong: number;
  trangThai: "dangCho" | "daDuyet" | "daTra";
}

function TinhLuong() {
  const [duLieuLuong, setDuLieuLuong] = useState<DongLuong[]>([]);
  const [thangChon, setThangChon] = useState("2025-01");
  const [dangTai, setDangTai] = useState(false);

  const vaiTro = localStorage.getItem("role") || "user";
  const tenDangNhap = localStorage.getItem("tenDangNhap") || "";

  const taiBangLuongTheoThang = () => {
    setDangTai(true);

    setTimeout(() => {
      const danhSach: DongLuong[] = danhSachNhanVien
        .filter((nv) => vaiTro === "admin" || nv.id === tenDangNhap)
        .map((nv) => {
          const tongGio = nv.tongGioLam ?? 40;
          const gioOT = tongGio > 40 ? tongGio - 40 : 0;
          const luongOT = (nv.luongCoBan / 40) * gioOT * 1.5;
          const tongLuong = nv.luongCoBan + luongOT;

          return {
            id: nv.id,
            ten: nv.ten,
            thang: thangChon,
            luongCoBan: nv.luongCoBan,
            tongGioLam: tongGio,
            gioTangCa: gioOT,
            tongLuong,
            trangThai: "dangCho",
          };
        });

      setDuLieuLuong(danhSach);
      setDangTai(false);
    }, 400);
  };

  const duyetTatCa = () => {
    setDuLieuLuong((prev) =>
      prev.map((dong) => ({ ...dong, trangThai: "daDuyet" }))
    );
  };

  const danhDauDaTra = () => {
    setDuLieuLuong((prev) =>
      prev.map((dong) => ({ ...dong, trangThai: "daTra" }))
    );
  };

  const duyetMotNguoi = (id: string) => {
    setDuLieuLuong((prev) =>
      prev.map((dong) =>
        dong.id === id ? { ...dong, trangThai: "daDuyet" } : dong
      )
    );
  };

  const danhDauDaTraMotNguoi = (id: string) => {
    setDuLieuLuong((prev) =>
      prev.map((dong) =>
        dong.id === id ? { ...dong, trangThai: "daTra" } : dong
      )
    );
  };

  useEffect(() => {
    taiBangLuongTheoThang();
  }, [thangChon]);

  const hienThiTrangThai = (tt: DongLuong["trangThai"]) => {
    if (tt === "dangCho") return "Đang chờ";
    if (tt === "daDuyet") return "Đã duyệt";
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
                  value={thangChon}
                  onChange={(e) => setThangChon(e.target.value)}
                  className="month-input"
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
                      <td>{hienThiTrangThai(dong.trangThai)}</td>
                      <td>
                        {vaiTro === "admin" && dong.trangThai !== "daDuyet" && (
                          <button
                            className="btn-small"
                            onClick={() => duyetMotNguoi(dong.id)}
                          >
                            Duyệt
                          </button>
                        )}

                        {vaiTro === "admin" && dong.trangThai !== "daTra" && (
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

            {vaiTro === "admin" && (
              <div className="batch-actions">
                <button className="btn" onClick={duyetTatCa}>
                  Duyệt tất cả
                </button>

                <button className="btn primary" onClick={danhDauDaTra}>
                  Đánh dấu đã trả lương
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TinhLuong;
